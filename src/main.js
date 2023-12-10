// Created by Arjun Krishnan and Moore Macauley
// Sound effects made with https://sfxr.me/
// GRASS TEXTURE PACK FOR BATTLE SCENE: https://opengameart.org/content/grass-texture-pack
// For our components, we use:
// Physics, for the movement of the character in the overworld
// Tilemap, for creating the map in the overworld
// Timers, for the tracking of when random encounters should happen in the overworld
// Cameras, for the effects used to transition between the overworld and the battle scene
// Animations, for making the character walk in the overworld, the rain effect over THE AWESOME STORE, and probably somewhere else we've forgotten 

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
    scene: [Load, Menu, Battle, Overworld, Instructions, Ending, Credits]
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