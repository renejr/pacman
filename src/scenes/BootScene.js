import PacMan from '../objects/PacMan.js';

const ghosts = [
    { name: 'Blinky', width: 48, height: 62 },
    { name: 'Pinky', width: 50, height: 62 },
    { name: 'Inky', width: 48, height: 60 },
    { name: 'Clyde', width: 48, height: 60 },
    { name: 'MdX', width: 48, height: 60 }
];

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Carregar sprites dos fantasmas
        ghosts.forEach(ghost => {
            for (let i = 0; i <= 7; i++) {
                this.load.image(`${ghost.name}_${i}`, `../assets/sprites/pacman/${ghost.name}/${i}.png`);
            }
        });
        // Carregar os frames do Pacman
        for (let i = 0; i <= 7; i++) {
            this.load.image(`pacman_${i}`, `../assets/sprites/pacman/Pacman/${i}.png`);
        }
    }

    create() {
        ghosts.forEach(ghost => {
            this.anims.create({
                key: `${ghost.name}_left`,
                frames: [
                    { key: `${ghost.name}_0` },
                    { key: `${ghost.name}_1` }
                ],
                frameRate: 8,
                repeat: -1
            });
            this.anims.create({
                key: `${ghost.name}_down`,
                frames: [
                    { key: `${ghost.name}_2` },
                    { key: `${ghost.name}_3` }
                ],
                frameRate: 8,
                repeat: -1
            });
            this.anims.create({
                key: `${ghost.name}_right`,
                frames: [
                    { key: `${ghost.name}_4` },
                    { key: `${ghost.name}_5` }
                ],
                frameRate: 8,
                repeat: -1
            });
            this.anims.create({
                key: `${ghost.name}_up`,
                frames: [
                    { key: `${ghost.name}_6` },
                    { key: `${ghost.name}_7` }
                ],
                frameRate: 8,
                repeat: -1
            });
        });
        this.anims.create({
            key: 'left',
            frames: [
                { key: 'pacman_0' },
                { key: 'pacman_1' }
            ],
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: [
                { key: 'pacman_2' },
                { key: 'pacman_3' }
            ],
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: [
                { key: 'pacman_4' },
                { key: 'pacman_5' }
            ],
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: [
                { key: 'pacman_6' },
                { key: 'pacman_7' }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.scene.start('MenuScene');
    }
}