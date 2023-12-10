class Ending extends Phaser.Scene{
    constructor(){
        super('ending')
    }
    create(){
        this.add.image(0, 0, 'blankBackground').setOrigin(0, 0);
        this.cursors = this.input.keyboard.createCursorKeys()

        // play the music
        this.music = this.sound.add('menuMusic', {
            volume: 0.15,
            loop:true
        })
        this.music.play()

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
        // TODO: actually have a proper paragraph written out, and make it pretty
        this.menuText = this.add.text(0.03*w, 0.05*h, `Victory!
        With this victory, Gumball is returned to the normal world, safe and happy.

        Press space to continue
        `, this.menuConfig).setOrigin(0, 0)
    }
    update(){
        // space for looking at the credits
        if(this.cursors.space.isDown){
            this.music.stop()
            this.scene.start('credits')
        }
        
    }
}