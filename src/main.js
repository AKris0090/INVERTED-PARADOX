// Sound effects made with https://sfxr.me/
// GRASS TEXTURE PACK FOR BATTLE SCENE: https://opengameart.org/content/grass-texture-pack

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
    scene: [Load, Menu, Battle, Overworld, Instructions]
}

let game = new Phaser.Game(config);

// constants and globals
let centerY = game.config.height/2
let centerX = game.config.width/2
let w = game.config.width
let h = game.config.height
let playerDir = 'left'
let paused = true;

let character