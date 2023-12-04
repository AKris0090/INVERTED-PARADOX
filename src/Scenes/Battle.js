class Battle extends Phaser.Scene {
    // Requires a character and enemy type to be passed in via start data
    constructor() {
        super("battle");
    }

    create(){
        this.enemy = new Enemy(this.enemyType)
        console.log("fighting!")
        console.log(this.enemy)
    }

    init(data){
        this.character = data.char
        this.enemyType = data.enemy
    }

    update(){}
}