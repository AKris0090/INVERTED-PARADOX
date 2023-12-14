// Created by Arjun Krishnan and Moore Macauley
// Sound effects made with https://sfxr.me/
// GRASS TEXTURE PACK FOR BATTLE SCENE: https://opengameart.org/content/grass-texture-pack
// For our components, we use:
// Physics, for the movement of the character in the overworld
// Tilemap, for creating the map in the overworld
// Timers, for the tracking of when random encounters should happen in the overworld
// Cameras, for the effects used to transition between the overworld and the battle scene
// Animations, for making the character walk in the overworld, the rain effect over THE AWESOME STORE, and probably somewhere else we've forgotten 

// About balancing, for the grader
// A townsfolk should be easily beatable at level 1
// The squirrels can usualy be beaten around level 3
// The plants become beatable around level 5 or 6
// Then the boss can usually be beaten around level 10
// This is based on my own testing, stat increases are random, so you may get lucky or not
// But this seems to be on average

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
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