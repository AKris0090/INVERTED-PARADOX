// Sound effects made with https://sfxr.me/

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    scale:{
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    pixelArt: true,
    scene: [Load, Menu, Battle, Overworld]
}

let game = new Phaser.Game(config);

// constants and globals
let centerY = game.config.height/2
let centerX = game.config.width/2
let w = game.config.width
let h = game.config.height