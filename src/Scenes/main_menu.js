class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load images
        this.load.image('bkgrnd', './assets/SPLASHES/menubkg.png');
        this.load.image('button', './assets/SPLASHES/menu_button.png');
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
    }

    // just need to play the animation and check for keyboard input to start the game
    update() {
    }
}