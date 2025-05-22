//import Phaser from 'phaser';

export default class Ghost extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name, width, height) {
        super(scene, x, y, `${name}_0`);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5);
        this.setDisplaySize(width, height);
        this.name = name;
        this.direction = 'left';
        this.play(`${name}_left`);
    }

    move(direction) {
        this.direction = direction;
        this.play(`${this.name}_${direction}`, true);
        // Aqui você pode adicionar lógica de movimento real
    }
}