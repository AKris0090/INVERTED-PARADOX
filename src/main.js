// Created by Arjun Krishnan and Moore Macauley
// For our components, we use:
// Physics, for the movement of the character in the overworld
// Tilemap, for creating the map in the overworld
// Timers, for the tracking of when random encounters should happen in the overworld
// Cameras, for the effects used to transition between the overworld and the battle scene
// Animations, for making the character walk in the overworld, the rain effect over THE AWESOME STORE, the battle scene

// About balancing, for the grader
// A townsfolk should be easily beatable at level 1
// The squirrels can usualy be beaten around level 3
// The plants become beatable around level 5 or 6
// Then the boss can usually be beaten around level 10
// This is based on my own testing, stat increases are random, so you may get lucky or not
// But this seems to be on average
// You can press 1 to strat a random encounter on the overworld, and 2 to fight the boss
// This will cause multiple music tracks to loop over each other, and the gumball may not end the random enounter where he started it
// This is due to this feature being lazily implemented for testing purposes only, but we've left it in just in case you want to make your playthrough
// a bit quicker and a lot louder
// On a similar note, you can press shift on the game over textbox in battle to return you to the overworld instead of the title screen.

let config = {
    parent:"phaser-game",
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