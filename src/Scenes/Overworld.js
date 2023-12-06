// Requires a character to be passed in via start data
class Overworld extends Phaser.Scene {
    constructor() {
        super("overworld");
    }

    create(){
        console.log("Overworlding!")

        // velocity constant
        this.VEL = 750

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

        // Fetch character spawn from tilemap data
        const slimeSpawn = map.findObject('Spawns', obj => obj.name === 'PlayerSpawn')
        // Set world bounds before spawning in
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        // Add character
        this.slime = this.physics.add.sprite(slimeSpawn.x, slimeSpawn.y, '')
        this.slime.body.setCollideWorldBounds(true)

        // create final overlap layer
        map.createLayer('20', tileset)

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
        this.physics.add.collider(this.slime, collision1)
        this.physics.add.collider(this.slime, collision2)
        this.physics.add.collider(this.slime, collision3)

        // input
        this.cursors = this.input.keyboard.createCursorKeys()

        // camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)

        // Add everythingstore prefab to scene and play anim
        this.eStore = new EverythingStore(this, 415, 250, 'everythingStore')
        this.eStore.anims.play('rain')
        this.eStore.body.setSize(350, 160)
        this.eStore.body.setOffset(38, 334)
        this.eStore.body.setImmovable(true)

        this.physics.add.collider(this.slime, this.eStore)
    }

    init(data){
        this.character = data.char
        this.character.healToFull()
        console.log(this.character)
    }

    update(){
        // slime movement (TEMP)
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}