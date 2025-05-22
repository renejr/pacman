import BootScene from './BootScene.js';
import PacMan from '../objects/PacMan.js';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        this.add.text(this.cameras.main.centerX, 200, 'Fim de Jogo', { fontSize: '40px', fill: '#fff' }).setOrigin(0.5);
        const restartButton = this.add.text(this.cameras.main.centerX, 300, 'Reiniciar', { fontSize: '28px', fill: '#fff' }).setOrigin(0.5).setInteractive();
        const menuButton = this.add.text(this.cameras.main.centerX, 370, 'Menu', { fontSize: '28px', fill: '#fff' }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => this.scene.start('GameScene'));
        menuButton.on('pointerdown', () => this.scene.start('MenuScene'));
    }
}

