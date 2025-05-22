import BootScene from './BootScene.js';
import PacMan from '../objects/PacMan.js';

export default class ConfigScene extends Phaser.Scene {
    constructor() {
        super('ConfigScene');
    }

    create() {
        this.add.text(this.cameras.main.centerX, 60, 'Configurações', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Volume
        this.add.text(this.cameras.main.centerX - 100, 120, 'Volume:', { fontSize: '24px', fill: '#fff' }).setOrigin(0, 0.5);
        let volumeSlider = this.add.dom(this.cameras.main.centerX + 60, 120, 'input', 'width:120px', '').setOrigin(0.5);
        volumeSlider.node.type = 'range';
        volumeSlider.node.min = 0;
        volumeSlider.node.max = 100;
        volumeSlider.node.value = localStorage.getItem('volume') || 50;
        volumeSlider.node.oninput = () => localStorage.setItem('volume', volumeSlider.node.value);

        // Dificuldade
        this.add.text(this.cameras.main.centerX - 100, 180, 'Dificuldade:', { fontSize: '24px', fill: '#fff' }).setOrigin(0, 0.5);
        let diffSlider = this.add.dom(this.cameras.main.centerX + 60, 180, 'input', 'width:120px', '').setOrigin(0.5);
        diffSlider.node.type = 'range';
        diffSlider.node.min = 1;
        diffSlider.node.max = 3;
        diffSlider.node.value = localStorage.getItem('difficulty') || 1;
        diffSlider.node.oninput = () => localStorage.setItem('difficulty', diffSlider.node.value);

        // Controles
        this.add.text(this.cameras.main.centerX - 100, 240, 'Controles:', { fontSize: '24px', fill: '#fff' }).setOrigin(0, 0.5);
        let controlSelect = this.add.dom(this.cameras.main.centerX + 60, 240, 'select').setOrigin(0.5);
        ['Teclado', 'Touch', 'Gamepad'].forEach(opt => {
            let option = document.createElement('option');
            option.value = opt.toLowerCase();
            option.text = opt;
            controlSelect.node.appendChild(option);
        });
        controlSelect.node.value = localStorage.getItem('controls') || 'teclado';
        controlSelect.node.onchange = () => localStorage.setItem('controls', controlSelect.node.value);

        // Botão Voltar
        const backButton = this.add.text(this.cameras.main.centerX, 400, 'Voltar', { fontSize: '28px', fill: '#fff' }).setOrigin(0.5).setInteractive();
        backButton.on('pointerdown', () => this.scene.start('MenuScene'));
    }
}