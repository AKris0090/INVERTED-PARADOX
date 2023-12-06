class Overworld extends Phaser.Scene {
    constructor() {
        super("overworld");
    }

    create(){
        console.log("Overworlding!")

        // velocity constant
        this.VEL = 750

        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('gumball_tileset', 'tilesetImage')

        map.createLayer('0', tileset)

        const collision1 = map.createLayer('COL 0', tileset)
        const collision2 = map.createLayer('COL1', tileset)
        const collision3 = map.createLayer('COL2', tileset)

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
        map.createLayer('20', tileset)
    }

    init(data){
        this.character = data.char
        console.log(this.character)
    }

    update(){
        // slime movement
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