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
    scene: [Menu, Battle, Overworld]
}

let game = new Phaser.Game(config);

// constants and globals
