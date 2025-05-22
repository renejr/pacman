//import Phaser from 'phaser';

export default class PacMan extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'pacman_0');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5);
        this.direction = 'right';
        this.play('right');
    }

    move(direction) {
        this.direction = direction;
        this.play(direction, true);
        // Aqui você pode adicionar lógica de movimento real (velocidade, colisão, etc)
    }
}