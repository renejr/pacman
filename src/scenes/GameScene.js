
import PacMan from '../objects/PacMan.js';
import Ghost from '../objects/Ghost.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.pacman = new PacMan(this, this.cameras.main.centerX, this.cameras.main.centerY);

        // Instanciando fantasmas com dimensões específicas
        this.blinky = new Ghost(this, 200, 200, 'Blinky', 48, 62);
        this.pinky = new Ghost(this, 260, 200, 'Pinky', 50, 62);
        this.inky = new Ghost(this, 320, 200, 'Inky', 48, 60);
        this.clyde = new Ghost(this, 380, 200, 'Clyde', 48, 60);
        this.mdx = new Ghost(this, 440, 200, 'MdX', 48, 60);

        this.cursors = this.input.keyboard.createCursorKeys();

        // Pontuação
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });

        // Pílulas simples para exemplo
        this.pills = this.physics.add.group();
        for (let i = 0; i < 10; i++) {
            let pill = this.pills.create(100 + i * 60, 400, null);
            pill.setCircle(8).setFillStyle(0xffff00, 1);
            pill.body.setAllowGravity(false);
        }

        // Colisão PacMan x Pílulas
        this.physics.add.overlap(this.pacman, this.pills, (pac, pill) => {
            pill.destroy();
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
        });

        // Limitar PacMan às bordas
        this.pacman.body.setCollideWorldBounds(true);
    }
    update() {
        const speed = 200;
        this.pacman.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.pacman.body.setVelocityX(-speed);
            this.pacman.move('left');
        } else if (this.cursors.right.isDown) {
            this.pacman.body.setVelocityX(speed);
            this.pacman.move('right');
        } else if (this.cursors.up.isDown) {
            this.pacman.body.setVelocityY(-speed);
            this.pacman.move('up');
        } else if (this.cursors.down.isDown) {
            this.pacman.body.setVelocityY(speed);
            this.pacman.move('down');
        }

        // Movimento simples do Blinky
        this.blinky.move('right');
    }
}