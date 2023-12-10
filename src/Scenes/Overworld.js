class Overworld extends Phaser.Scene {
    constructor() {
        super("overworld");
    }

    startBossBattle(){
        if(this.canMove == true){
            this.canMove = false
            this.music.stop()
            this.battleStart.play()
            this.cameras.main.fadeOut(2000, 255, 255, 255, (cam, complete)=>{
                if(complete == 1){
                    this.battleStart.stop()
                    this.scene.start('battle', {enemy: 'boss'})
                }
            })
        }
    }

    create(){
        console.log("Overworlding!")
        
        // Used for when transitioning into a battle, so the player can't move during that transition
        this.canMove = true

        // play the music
        this.music = this.sound.add('overworldMusic', {
            volume: 0.25,
            loop:true
        })
        this.music.play()

        // create battle start sound effect
        this.battleStart = this.sound.add('battleStart', {
            volume: 0.5
        })

        // velocity constant
        this.VEL = 500

        // Create Tilemap and Tileset
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('gumball_tileset', 'tilesetImage')

        // Create base layer
        map.createLayer('0', tileset)

        // Create collision layers
        const collision1 = map.createLayer('COL 0', tileset)
        const collision2 = map.createLayer('COL1', tileset)
        const collision3 = map.createLayer('COL2', tileset)

        // Create all other peripheral layers
        map.createLayer('4', tileset)
        map.createLayer('6', tileset)
        map.createLayer('7', tileset)
        map.createLayer('8', tileset)
        map.createLayer('9', tileset)
        map.createLayer('10', tileset)
        map.createLayer('12', tileset)
        map.createLayer('13', tileset)
        map.createLayer('14', tileset)
        map.createLayer('15', tileset)
        map.createLayer('16', tileset)
        map.createLayer('17', tileset)
        map.createLayer('18', tileset)
        map.createLayer('19', tileset)

        // Add everythingstore prefab to scene and play anim
        this.eStore = new EverythingStore(this, 415, 250, 'everythingStore')
        this.eStore.anims.play('rain')
        this.eStore.body.setSize(350, 160).setOffset(38, 334)
        this.eStore.body.setImmovable(true)

        // Set world bounds before spawning in
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        // Add player
        this.player = this.physics.add.sprite(character.x, character.y, 'gumball', 2)
        this.player.body.setSize(25, 25, true).setOffset(25, 75)
        this.player.body.setCollideWorldBounds(true)

        // create final overlap layer
        this.topLayer = map.createLayer('20', tileset)
        this.topLayer.setDepth(3)

        // collisions based on property in tilemap
        collision1.setCollisionByProperty({
            collides: true
        })

        collision2.setCollisionByProperty({
            collides: true
        })

        collision3.setCollisionByProperty({
            collides: true
        })

        // Add colliders between player and collision layers
        this.physics.add.collider(this.player, collision1)
        this.physics.add.collider(this.player, collision2)
        this.physics.add.collider(this.player, collision3)

        // input
        this.cursors = this.input.keyboard.createCursorKeys()
        this.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        

        // camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true)

        this.battleTimer = this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                character.x = this.player.x;
                character.y = this.player.y;
                this.canMove = false
                this.music.stop()
                this.battleStart.play()
                this.cameras.main.fadeOut(750, 255, 255, 255, (cam, complete)=>{
                    if(complete == 1){
                        this.battleStart.stop()
                        this.scene.start('battle', {char: character, enemy: 'random'})
                    }
                })
            },
            paused: true
        });
    }

    update(){
        // character movement (TEMP)
        this.direction = new Phaser.Math.Vector2(0)
        if(this.canMove){
            if(this.cursors.left.isDown) {
                this.direction.x += -1
                playerDir = 'left'
            }
            if(this.cursors.right.isDown) {
                this.direction.x += 1
                playerDir = 'right'
            }

            if(this.cursors.up.isDown) {
                this.direction.y += -1
                playerDir = 'up'
            }
            if(this.cursors.down.isDown) {
                this.direction.y += 1
                playerDir = 'down'
            }
        }

        this.direction.normalize()
        this.player.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)

        // Player anim play
        let playerMovement
        this.direction.length() ? playerMovement = 'walk' : playerMovement = 'idle';
        this.player.play(playerMovement + '-' + playerDir, true);

        // Pause timer
        this.direction.length() ? this.battleTimer.paused = false : this.battleTimer.paused = true

        // Ortho check for in front/behind estore
        if(this.player.body.y < this.eStore.body.y) {
            this.eStore.setDepth(2)
            this.player.setDepth(1)
        }
        if(this.player.body.y > this.eStore.body.y) {
            this.eStore.setDepth(1)
            this.player.setDepth(2)
        }

        this.physics.world.overlap(this.eStore, this.player, this.startBossBattle, null, this)

        // manual activation of a random encounter
        if(Phaser.Input.Keyboard.JustDown(this.one)){
            this.scene.start('battle', {enemy: 'random'})
        }

        // manual activation of a boss
        if(Phaser.Input.Keyboard.JustDown(this.two)){
            this.scene.start('battle', {enemy: 'boss'})
        }
    }
}