let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    pixelArt: true,
    scene: [ ]
}

let game = new Phaser.Game(config);

// constants and globals
