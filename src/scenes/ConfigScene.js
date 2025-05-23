import BootScene from './BootScene.js';
import PacMan from '../objects/PacMan.js';

export default class ConfigScene extends Phaser.Scene {
    constructor() {
        super('ConfigScene');
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const logoY = 120;

        // --- LOGO PACMAN COM PONTOS (sem animação) ---
        // Matriz de pontos para desenhar cada letra do logo PACMAN
        const letters = [
            // P
            [
                [1,1,1,1],
                [1,0,0,1],
                [1,1,1,1],
                [1,0,0,0],
                [1,0,0,0]
            ],
            // A
            [
                [0,1,1,0],
                [1,0,0,1],
                [1,1,1,1],
                [1,0,0,1],
                [1,0,0,1]
            ],
            // C
            [
                [0,1,1,1],
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
                [0,1,1,1]
            ],
            // M
            [
                [1,0,0,1],
                [1,1,1,1],
                [1,0,0,1],
                [1,0,0,1],
                [1,0,0,1]
            ],
            // A
            [
                [0,1,1,0],
                [1,0,0,1],
                [1,1,1,1],
                [1,0,0,1],
                [1,0,0,1]
            ],
            // N
            [
                [1,0,0,1],
                [1,1,0,1],
                [1,0,1,1],
                [1,0,0,1],
                [1,0,0,1]
            ]
        ];
        const dotSize = 18;
        const dotSpacing = 8;
        const letterSpacing = 28;
        let logoWidth = letters.length * (4 * (dotSize + dotSpacing)) + (letters.length - 1) * letterSpacing;
        let startX = centerX - logoWidth / 2 + dotSize / 2;

        // Desenha o logo PACMAN com pontos amarelos
        for (let l = 0; l < letters.length; l++) {
            let letter = letters[l];
            for (let row = 0; row < letter.length; row++) {
                for (let col = 0; col < letter[row].length; col++) {
                    if (letter[row][col]) {
                        this.add.circle(
                            startX + col * (dotSize + dotSpacing),
                            logoY + row * (dotSize + dotSpacing),
                            dotSize / 2,
                            0xffff00
                        );
                    }
                }
            }
            startX += 4 * (dotSize + dotSpacing) + letterSpacing;
        }

        // --- MENU DE CONFIGURAÇÕES ---
        let menuY = logoY + 5 * (dotSize + dotSpacing) + 40;
        const menuItems = [];

        // Volume (botão expansível)
        // const volumeButton = this.add.text(centerX, menuY, 'Volume', {
        //     fontFamily: 'monospace',
        //     fontSize: '28px',
        //     color: '#fff',
        //     backgroundColor: '#222',
        //     padding: { left: 24, right: 24, top: 8, bottom: 8 },
        //     align: 'center'
        // }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Volume (apenas slider com porcentagem ao lado)
        const sliderY = menuY;
        let volumeValue = localStorage.getItem('volume') || 50;

        // Cria o slider de volume centralizado
        let volumeSlider = this.add.dom(centerX - 40, sliderY, 'input', 'width:180px; height:18px; border-radius:8px; background:#222;', '').setOrigin(0.5);
        volumeSlider.node.type = 'range';
        volumeSlider.node.min = 0;
        volumeSlider.node.max = 100;
        volumeSlider.node.value = volumeValue;

        // Cria o texto da porcentagem ao lado direito do slider
        let volumePercentText = this.add.text(centerX + 70, sliderY, volumeValue + '%', {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#fff',
            align: 'left'
        }).setOrigin(0, 0.5);

        // Atualiza o valor ao arrastar o slider
        volumeSlider.node.oninput = () => {
            localStorage.setItem('volume', volumeSlider.node.value);
            if (this.sound) {
                this.sound.volume = volumeSlider.node.value / 100;
            }
            volumePercentText.setText(volumeSlider.node.value + '%');
        };
        
        // Alterna a visibilidade do slider ao clicar no botão
        // let sliderVisible = false;
        // volumeButton.on('pointerdown', () => {
        //     sliderVisible = !sliderVisible;
        //     volumeSlider.setVisible(sliderVisible);
        // });

        // Dificuldade
        menuItems.push(this.add.text(centerX, menuY + 80, 'Dificuldade', {
            fontFamily: 'monospace',
            fontSize: '28px',
            color: '#fff',
            backgroundColor: '#222',
            padding: { left: 24, right: 24, top: 8, bottom: 8 },
            align: 'center'
        }).setOrigin(0.5));

        let diffSlider = this.add.dom(centerX, menuY + 120, 'input', 'width:220px; height:18px; border-radius:8px; background:#222;').setOrigin(0.5);
        diffSlider.node.type = 'range';
        diffSlider.node.min = 1;
        diffSlider.node.max = 3;
        diffSlider.node.value = localStorage.getItem('difficulty') || 1;
        diffSlider.node.oninput = () => localStorage.setItem('difficulty', diffSlider.node.value);

        // Controles
        menuItems.push(this.add.text(centerX, menuY + 160, 'Controles', {
            fontFamily: 'monospace',
            fontSize: '28px',
            color: '#fff',
            backgroundColor: '#222',
            padding: { left: 24, right: 24, top: 8, bottom: 8 },
            align: 'center'
        }).setOrigin(0.5));

        let controlSelect = this.add.dom(centerX, menuY + 200, 'select', 'width:220px; height:32px; border-radius:8px; background:#222; color:#fff; font-size:20px;').setOrigin(0.5);
        ['Teclado', 'Touch', 'Gamepad'].forEach(opt => {
            let option = document.createElement('option');
            option.value = opt.toLowerCase();
            option.text = opt;
            controlSelect.node.appendChild(option);
        });
        controlSelect.node.value = localStorage.getItem('controls') || 'teclado';
        controlSelect.node.onchange = () => localStorage.setItem('controls', controlSelect.node.value);

        // Botão Voltar estilizado igual ao menu principal
        const backButton = this.add.text(centerX, menuY + 270, 'Voltar', {
            fontFamily: 'monospace',
            fontSize: '28px',
            color: '#fff',
            backgroundColor: '#222',
            padding: { left: 48, right: 48, top: 12, bottom: 12 },
            align: 'center',
            stroke: '#ffff00',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        backButton.on('pointerover', () => backButton.setStyle({ backgroundColor: '#ffff00', color: '#222' }));
        backButton.on('pointerout', () => backButton.setStyle({ backgroundColor: '#222', color: '#fff' }));
        backButton.on('pointerdown', () => this.scene.start('MenuScene'));
    }
}