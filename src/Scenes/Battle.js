class Battle extends Phaser.Scene {
    // Requires a character and enemy type to be passed in via start data
    constructor() {
        super("battle");
    }

    create(){
        this.enemy = new Enemy(this.enemyType)
        character.healToFull()
        console.log("fighting!")
        console.log(this.enemy)
        console.log(character)

        // Create a blue rectangle taking up the bottom 1/SCREEN_PORTION of the screen as a textbox, and a green rectangle taking up the rest
        // TODO: Implement the actual art assets once they're made
        this.SCREEN_PORTION = 3
        this.add.rectangle(0, h - h/this.SCREEN_PORTION, w, h/this.SCREEN_PORTION, 0x0096FF).setOrigin(0, 0)
        this.add.rectangle(0, 0, w, h - h/this.SCREEN_PORTION, 0x4F7942).setOrigin(0, 0)

        // Style the text that will be used in the menu
        this.menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#ffffff',
            align: 'left',
            wordWrap:{
                width: w,
                useAdvancedWrap: true
            },
            // Lone numbers, whoops
            padding: {
                x:15,
                y:30
            },
            shadow:{
                offsetX:1,
                offsetY:1,
                blur: 1,
                fill:true
            }
        }

        // Create the text that will be used 
        this.menuText = this.add.text(0, h - h/this.SCREEN_PORTION, "Attack", this.menuConfig).setOrigin(0, 0)

        // Style the text that will be used for health
        this.healthConfig = {
            fontFamily: 'Courier',
            fontSize: '32px',
            color: '#880808',
            align: 'left',
            // Lone numbers, whoops
            padding: {
                x:30,
                y:30
            },
        }

        // Creates text that will be used for health
        // TODO: Replace these with proper health bars
        this.playerHealth = this.add.text(0, h/2, character.hp, this.healthConfig).setOrigin(0, 0)
        this.enemyHealth = this.add.text(0, h/2, this.enemy.stats.hp, this.healthConfig).setOrigin(0, 0)
        this.enemyHealth.setX(w - this.enemyHealth.width - this.healthConfig.padding.x * 2)

        // Create the hero and enemy sprite
        this.playerSprite = this.physics.add.sprite(w/4, h/4, 'hero')
        this.enemySprite = this.physics.add.sprite(w - w/4, h/4, 'enemy')

        // Create the sounds (default config probably fine)
        this.hit = this.sound.add('hit', {
            volume:.5
        })
        this.menuMove = this.sound.add('menuMove', {
            volume:.5
        })
        this.run = this.sound.add('run', {
            volume:.5
        })
        this.shield = this.sound.add('shield', {
            volume:.5
        })

        this.keys = this.input.keyboard.createCursorKeys()

        // Create the FMS for tracking menu usage
        this.menu = new BattleStateMachine(this)
    }

    init(data){
        this.enemyType = data.enemy
    }

    // Calculates attack damage based on ap of attacker and def of defender
    attackDamage(ap, def){
        // Damage ranges from ap/2 to 3ap/2
        let damage = Math.floor(Math.random()*ap + ap/2)
        // then reduce damage by the defense
        damage -= def
        // if damage is negative, deal 0 damage instead, b/c healing a character if their def is too high (while funny) makes no sense
        if (damage < 0){
            return 0
        }
        return damage
    }

    update(){
        // All that needs to be done is the battlefsm be stepped
        this.battleFSM.step()
    }
}