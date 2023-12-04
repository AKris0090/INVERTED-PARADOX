class Battle extends Phaser.Scene {
    constructor() {
        super("battle");
    }

    create(){
        console.log("fighting!")
        this.test = new Character(1000)
        console.log(this.test)
    }

    update(){}
}