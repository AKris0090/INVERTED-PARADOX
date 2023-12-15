class Battle extends Phaser.Scene {
    // Requires a character and enemy type to be passed in via start data
    constructor() {
        super("battle");
    }

    create(){
        this.enemy = new Enemy(this.enemyType)

        // Create the background image
        this.add.image(0, 0, 'battleBackground').setOrigin(0, 0)

        // Create the hero and enemy sprite
        this.playerSprite = this.physics.add.sprite(w*.33, h*.41, 'gumBattle', 0)
        this.enemySprite = this.physics.add.sprite(w - w*.37, h*.325, this.enemy.stats.spriteName, 0)

        character.healToFull()

        // play the music
        this.music = this.sound.add('battleMusic', {
            volume: 0.15,
            loop:true
        })
        this.music.play()

        // Create the UI image
        this.UI = this.add.sprite(0, 0, 'BattleUI').setOrigin(0, 0)
        this.UI.play('defendChoice')

        // Style the text that will be used in the menu
        this.menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#ffffff',
            align: 'left',
            wordWrap:{
                width: 0.55*w,
                useAdvancedWrap: true
            },
            shadow:{
                offsetX:1,
                offsetY:1,
                blur: 1,
                fill:true
            }
        }

        // Create the text that will be used 
        this.menuText = this.add.text(0.05*w, 0.71*h, "A " + this.enemy.chosenEnemy + " approaches!", this.menuConfig).setOrigin(0, 0)

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
        // The player's health bar starts at pixel 259 assuming a width of 1200, which is 0.215833333 across the canvas
        // 356 of 600 for height, so 0.593333333
        this.playerHealthBar = this.add.sprite(0.215833333*w, 0.593333333*h, 'healthBar').setOrigin(0,0)
        // 834 of 1200 for enemy width, so 0.695. Same height as the player's bar
        this.enemyHealthBar = this.add.sprite(0.695*w, 0.593333333*h, 'healthBar').setOrigin(0,0)
        // Hopefully this scales properly. I have my doubts it will, but we do our best

        // Construct the names of the enemy's animations
        // All enemy idle animations are called enemyNameIdle, so put that together here b/c i don't want to think about it later
        this.enemyAttackName = this.enemy.chosenEnemy + 'Attack'
        this.enemyIdleName = this.enemy.chosenEnemy + 'Idle'

        // Play the enemy's idle animation
        this.enemySprite.anims.play(this.enemyIdleName)

        // GUMBALL ATTACK ANIMATION -----------------------------------------------------------------------------
        //this.playerSprite.anims.play('gumAttack')

        // GUMBALL IDLE ANIMATION -----------------------------------------------------------------------------
        this.playerSprite.anims.play('gumIdle')

        // Damage tween
        this.gumballDmg = this.tweens.add({
            targets: this.playerSprite,
            delay: 700,
            key: 'dmg',
            duration: 75,
            tint: 0xFF3A3A,
            yoyo: true,
            repeat: 2,
            ease: 'Stepped',
            paused: true,
            persist: true
        })

        this.enemyDmg = this.tweens.add({
            targets: this.enemySprite,
            delay: 500,
            key: 'dmg',
            duration: 75,
            tint: 0xFF3A3A,
            yoyo: true,
            repeat: 2,
            ease: 'Stepped',
            paused: true,
            persist: true
        })

        // Defend tween
        this.gumballShield = this.tweens.add({
            targets: this.playerSprite,
            key: 'dmg',
            duration: 75,
            tint: 0x0029FF,
            yoyo: true,
            repeat: 2,
            ease: 'Stepped',
            paused: true,
            persist: true
        })

        // PLAY DAMAGE WITH THIS: -----------------------------------------------------------------------------
        //this.gumballDmg.play()
        //this.enemyDmg.play()

        // PLAY SHIELD WITH THIS: -----------------------------------------------------------------------------
        //this.gumballShield.play()

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
        // step battlefsm
        this.battleFSM.step()
        // upon completion of any of gumball or an enemy's animations, return them to their idle animation
        this.playerSprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=>{
            this.playerSprite.anims.play('gumIdle')
        }, this)
        this.enemySprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=>{
            this.enemySprite.anims.play(this.enemyIdleName)
        }, this)
    }
}