import BootScene from './BootScene.js';
import PacMan from '../objects/PacMan.js';

export default class ScoreScene extends Phaser.Scene {
    constructor() {
        super('ScoreScene');
    }

    create() {
        this.add.text(this.cameras.main.centerX, 100, 'Scores', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Mock de scores do localStorage
        let scores = JSON.parse(localStorage.getItem('scores') || '[]');
        if (scores.length === 0) {
            this.add.text(this.cameras.main.centerX, 180, 'Nenhum score registrado.', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        } else {
            scores.slice(0, 10).forEach((score, idx) => {
                this.add.text(this.cameras.main.centerX, 160 + idx * 30, `${idx + 1}. ${score.name}: ${score.value}`, { fontSize: '22px', fill: '#fff' }).setOrigin(0.5);
            });
        }

        const backButton = this.add.text(this.cameras.main.centerX, 400, 'Voltar', { fontSize: '28px', fill: '#fff' }).setOrigin(0.5).setInteractive();
        backButton.on('pointerdown', () => this.scene.start('MenuScene'));
    }
}

