// Arjun Krishnan and Moore Macauley
// 11/29/2023

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // Add background image
        this.add.image(0, 0, 'bkgrnd').setOrigin(0, 0);

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
    }

    // just need to play the animation and check for keyboard input to start the game
    update() {
        // number keys for starting a random encounter
        if(Phaser.Input.Keyboard.JustDown(this.one)){
            this.scene.start('battle')
        }
        // space for starting into the overworld
        if(this.cursors.space.isDown){
            this.scene.start('overworld')
        }
    }
}