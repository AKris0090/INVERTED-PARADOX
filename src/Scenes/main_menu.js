// Arjun Krishnan and Moore Macauley
// 11/29/2023

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // Add background image
        this.add.image(0, 0, 'bkgrnd').setOrigin(0, 0);

        // play the music
        this.music = this.sound.add('menuMusic', {
            volume: 0.15,
            loop:true
        })
        this.music.play()

        // ALL OF THESE ARE TEXT CONFIGS
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            color: '#3F4857',
            align: 'right',
            fixedWidth: 0
        }

        var but = this.add.image(0, 0, 'button').setOrigin(0, 0);

        // flashing start indicator
        this.tweens.add({
            targets: but,
            duration: 1000,
            alpha: { from: 1, to: 0 },
            yoyo: true,
            loop: -1
        });

        // wire up keys
        this.cursors = this.input.keyboard.createCursorKeys()
        this.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        

        character = new Character()
        character.x = 1525.24242424242;
        character.y = 429.818181818182;
    }

    // just need to play the animation and check for keyboard input to start the game
    update() {
        // number keys for starting a random encounter (will probably add more than just one for different character levels)
        if(Phaser.Input.Keyboard.JustDown(this.one)){
            this.music.stop()
            this.scene.start('battle', {enemy: 'random'})
        }
        // manual activation of a boss
        if(Phaser.Input.Keyboard.JustDown(this.two)){
            this.music.stop()
            character.increaseExp(2000)
            this.scene.start('battle', {enemy: 'boss'})
        }
        // space for starting into the overworld
        if(this.cursors.space.isDown){
            this.music.stop()
            this.scene.start('instructions')
        }
        // c for credits 
        if(this.c.isDown){
            this.music.stop()
            this.scene.start('credits')
        }
    }
}