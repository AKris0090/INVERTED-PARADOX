class Instructions extends Phaser.Scene{
    constructor(){
        super('instructions')
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
        
        // Style the text that will be used in the instructions
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
        // TODO: make it more pretty than text on a white background
        this.menuText = this.add.text(0.03*w, 0.05*h, `Gumball has been sucked into a video game!
        He got the game from THE AWESOME STORE, a place known for selling dangerous items such as this.
        Defeat enemies and defenceless townsfolk until you think you're powerful to face what lurks in THE AWESOME STORE!

        Control Gumball with the arrow keys in the overworld. Every so often, a random encounter will occur.
        When in a battle, use the up and down arrow keys to select an action, then space to select an action and see what the enemy does.
        Defeating enemies grants experiance points, and eventually levels. Do not be afraid to run, some enemies will be too powerful to begin with.
        Walk into THE AWESOME STORE on the west side of town when you think you are ready. But there is no going back once you decide.

        Press space to continue
        `, this.menuConfig).setOrigin(0, 0)
    }
    update(){
        // space for starting into the overworld
        if(this.cursors.space.isDown){
            this.music.stop()
            this.scene.start('overworld')
        }
        
    }
}