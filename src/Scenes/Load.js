class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // load graphics assets
        this.load.image('bkgrnd', './assets/SPLASHES/menubkg.png');
        this.load.image('button', './assets/SPLASHES/menu_button.png');
        // load audio assets
    }

    create() {
        // create the animations (when we have some)
        // go to Title scene
        this.scene.start('menuScene');
    }
}