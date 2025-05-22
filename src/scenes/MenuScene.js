import PacMan from '../objects/PacMan.js';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
        this.pills = [];
        this.pacman = null;
        this.logoFixed = false;
        this.menuButtons = [];
        this.resizeHandler = null;
    }

    create() {
        this.resizeMenu();

        // Eventos dos botões
        this.menuButtons[0].on('pointerdown', () => this.scene.start('GameScene'));
        this.menuButtons[1].on('pointerdown', () => this.scene.start('ConfigScene'));
        this.menuButtons[2].on('pointerdown', () => this.scene.start('ScoreScene'));
        this.menuButtons[3].on('pointerdown', () => {
            window.close();
            setTimeout(() => {
                if (!window.closed) {
                    alert('Não foi possível fechar a janela automaticamente. Feche manualmente.');
                }
            }, 300);
        });

        // Inicia a animação do Pacman comendo as pastilhas
        this.time.addEvent({
            delay: 80,
            repeat: this.pills.length - 1,
            callback: this.eatPill,
            callbackScope: this
        });

        // Adiciona listener para resize
        this.resizeHandler = () => this.resizeMenu();
        this.scale.on('resize', this.resizeHandler, this);
    }

    resizeMenu() {
        // Remove elementos antigos se existirem
        if (this.pills && this.pills.length) {
            this.pills.forEach(pill => pill.destroy());
        }
        if (this.pacman) {
            this.pacman.destroy();
        }
        if (this.menuButtons && this.menuButtons.length) {
            this.menuButtons.forEach(btn => {
                if (btn.bg) btn.bg.destroy();
                btn.destroy();
            });
        }

        // Responsividade: calcula tamanhos baseados na tela
        const screenW = this.cameras.main.width;
        const screenH = this.cameras.main.height;

        // Tamanho das pastilhas do logo proporcional à largura da tela, com limites ajustados
        const pillSize = Math.max(
            12, // Aumentado o mínimo de 10 para 12
            Math.min(
                64, // Aumentado o máximo de 32 para 64 para telas grandes
                Math.floor(screenW * 0.025), // Aumentado de 0.018 para 0.025 (2.5% da largura)
                Math.floor(screenH * 0.05)  // Aumentado de 0.04 para 0.05 (5% da altura)
            )
        );

        // Ajusta a margem superior proporcionalmente ao novo tamanho
        const startY = Math.max(
            pillSize * 2, // Margem mínima baseada no tamanho da pastilha
            Math.floor(screenH * 0.08)
        );

        // Centraliza o logo horizontalmente
        const logoWidth = 6 * 5 + 5 * 2; // 6 letras * 5 colunas + 5 espaços de 2 colunas
        const startX = this.cameras.main.centerX - (logoWidth / 2) * pillSize;
        

        // Letras do logo
        const letters = {
            P: [
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0]
            ],
            A: [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            C: [
                [0,1,1,1,1],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [0,1,1,1,1]
            ],
            M: [
                [1,0,0,0,1],
                [1,1,0,1,1],
                [1,0,1,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            N: [
                [1,0,0,0,1],
                [1,1,0,0,1],
                [1,0,1,0,1],
                [1,0,0,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ]
        };

        // Monta o padrão do logo "PACMAN"
        const word = ['P', 'A', 'C', 'M', 'A', 'N'];
        let logoPattern = [];
        let offsetX = 0;
        word.forEach((letter, idx) => {
            const grid = letters[letter];
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[y].length; x++) {
                    if (grid[y][x]) {
                        logoPattern.push({
                            x: offsetX + x,
                            y: y
                        });
                    }
                }
            }
            offsetX += 7; // 5 colunas da letra + 2 de espaço
        });

        // Cria as pastilhas do logo
        this.pills = logoPattern.map((pos, idx) => {
            return this.add.circle(
                startX + pos.x * pillSize,
                startY + pos.y * pillSize,
                pillSize / 2,
                0xffff00
            ).setAlpha(1);
        });

        // Cria o Pacman na posição da primeira pastilha
        this.pacman = this.add.image(
            this.pills[0].x,
            this.pills[0].y,
            'pacman_4'
        ).setDisplaySize(pillSize * 1.2, pillSize * 1.2);

        this.currentPill = 0;
        this.logoFixed = false;

        // Responsividade: fontes e espaçamento dos botões proporcionais à tela, com limites
        const buttonFontMain = Math.max(22, Math.min(48, Math.floor(screenH * 0.06)));
        const buttonFont = Math.max(16, Math.min(40, Math.floor(screenH * 0.05)));
        const buttonSpacing = Math.max(40, Math.min(90, Math.floor(screenH * 0.11)));
        const buttonCount = 4;
        const totalButtonsHeight = (buttonCount - 1) * buttonSpacing;
        // Centraliza verticalmente o bloco de botões, mas deixa espaço para o logo
        const firstButtonY = Math.max(
            startY + pillSize * 8,
            this.cameras.main.centerY - totalButtonsHeight / 2
        );

        // Textos dos botões
        const buttonLabels = [
            { text: 'Iniciar Jogo', fontSize: buttonFontMain },
            { text: 'Configurações', fontSize: buttonFont },
            { text: 'Scores', fontSize: buttonFont },
            { text: 'Sair', fontSize: buttonFont }
        ];

        this.menuButtons = [];

        buttonLabels.forEach((btn, i) => {
            // Cria o texto do botão
            const textObj = this.add.text(
                this.cameras.main.centerX,
                firstButtonY + buttonSpacing * i,
                btn.text,
                { fontSize: `${btn.fontSize}px`, fill: '#fff' }
            ).setOrigin(0.5).setInteractive().setAlpha(0);

            // Adiciona sombra ao texto
            textObj.setShadow(2, 2, "#000", 4, false, true);

            // Cria um retângulo translúcido atrás do texto
            const paddingX = btn.fontSize * 0.7;
            const paddingY = btn.fontSize * 0.4;
            const bg = this.add.rectangle(
                textObj.x,
                textObj.y,
                textObj.width + paddingX,
                textObj.height + paddingY,
                0x000000,
                0.55 // Aumentado de 0.45 para 0.55
            ).setOrigin(0.5).setAlpha(0).setStrokeStyle(2, 0xffff00, 0.7); // Aumentado de 0.5 para 0.7

            // Garante que o texto fique acima do retângulo
            textObj.setDepth(1);

            // Adiciona efeitos de hover com transição suave
            textObj.on('pointerover', () => {
                this.tweens.add({
                    targets: [textObj],
                    scale: 1.1,
                    duration: 200,
                    ease: 'Power2'
                });
                
                this.tweens.add({
                    targets: [bg],
                    alpha: 0.8,
                    duration: 200,
                    ease: 'Power2',
                    onComplete: () => {
                        bg.setStrokeStyle(3, 0xffff00, 0.9);
                    }
                });
            });

            textObj.on('pointerout', () => {
                this.tweens.add({
                    targets: [textObj],
                    scale: 1.0,
                    duration: 200,
                    ease: 'Power2'
                });
                
                this.tweens.add({
                    targets: [bg],
                    alpha: textObj.alpha,
                    duration: 200,
                    ease: 'Power2',
                    onComplete: () => {
                        bg.setStrokeStyle(2, 0xffff00, 0.7);
                    }
                });
            });

            // Salva referência do fundo no texto para destruir depois
            textObj.bg = bg;

            // Adiciona ambos à lista de botões
            this.menuButtons.push(textObj);
        });
    }

    eatPill() {
        if (this.currentPill < this.pills.length) {
            // "Come" a pastilha atual
            this.pills[this.currentPill].setAlpha(0);
            this.currentPill++;
            if (this.currentPill < this.pills.length) {
                // Move o Pacman para a próxima pastilha
                this.pacman.x = this.pills[this.currentPill].x;
                this.pacman.y = this.pills[this.currentPill].y;
            }
        }
        if (this.currentPill === this.pills.length && !this.logoFixed) {
            // Respawn do logo fixo
            this.logoFixed = true;
            this.time.delayedCall(400, () => {
                this.pills.forEach(pill => pill.setAlpha(1));
                this.pacman.setVisible(false);
                // Exibe os botões do menu com animações
                this.menuButtons.forEach((btn, index) => {
                    // Delay para cada botão
                    const delay = index * 200;

                    // Sistema de partículas para cada botão
                    const particles = this.add.particles(btn.x, btn.y, 'particle', {
                        lifespan: 1000,
                        speed: { min: 50, max: 100 },
                        scale: { start: 0.2, end: 0 },
                        quantity: 1,
                        frequency: 50,
                        alpha: { start: 1, end: 0 },
                        tint: 0xffff00,
                        emitting: false
                    });

                    // Animação de entrada com bounce e glow
                    this.time.delayedCall(delay, () => {
                        // Inicia as partículas
                        particles.start();

                        // Bounce e fade do fundo e texto
                        this.tweens.add({
                            targets: [btn, btn.bg],
                            alpha: { from: 0, to: 0.55 },
                            scaleX: { from: 0.8, to: 1 },
                            scaleY: { from: 0.8, to: 1 },
                            ease: 'Bounce.easeOut',
                            duration: 800,
                            onComplete: () => {
                                btn.setAlpha(1); // Garante que o texto fique visível
                            }
                        });

                        // Glow inicial
                        btn.bg.setStrokeStyle(4, 0xffff00, 1);
                        this.tweens.add({
                            targets: btn.bg,
                            strokeAlpha: 0.7,
                            strokeWidth: 2,
                            duration: 1000,
                            ease: 'Sine.easeOut'
                        });

                        // Para as partículas após a animação
                        this.time.delayedCall(1000, () => {
                            particles.stop();
                            this.time.delayedCall(1000, () => {
                                particles.destroy();
                            });
                        });
                    });
                });
            });
        }
    }
}
