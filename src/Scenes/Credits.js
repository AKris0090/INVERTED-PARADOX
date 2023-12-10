class Credits extends Phaser.Scene{
    constructor(){
        super('credits')
    }
    create(){
        this.add.image(0, 0, 'blankBackground').setOrigin(0, 0);
        this.cursors = this.input.keyboard.createCursorKeys()
        // Style the text that will be used in the ending
        this.menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#555555',
            align: 'left',
            wordWrap:{
                width: w - 0.03*w,
                useAdvancedWrap: true
            },
            shadow:{
                offsetX:1,
                offsetY:1,
                blur: 1,
                fill:true
            }
        }
        this.menuText = this.add.text(0.03*w, 0.05*h, `Coded by Moore Macauley and Arjun Krishnan
        Unmentioned art assets created by Arjun Krishnan
        Battle sound effects courtesy of https://sfxr.me/
        Grass texture in the battle's background comes from https://opengameart.org/content/grass-texture-pack
        Battle music comes from https://opengameart.org/content/chiptune-battle-music
        Overworld music comes from https://opengameart.org/content/jrpg-pack-1-exploration 

        Press space to continue
        `, this.menuConfig).setOrigin(0, 0)
    }
    update(){
        // space for returning to main menu
        if(this.cursors.space.isDown){
            this.scene.start('menuScene')
        }
        
    }
}