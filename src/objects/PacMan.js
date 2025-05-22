<<<<<<< HEAD
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
=======
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
>>>>>>> 1e21c76fe46671075ddc35e2c3ee3a3f7427f746
}