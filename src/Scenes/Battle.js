class Battle extends Phaser.Scene {
    constructor() {
        super("battle");
    }

    create(){
        console.log("fighting!")
    }

    init(data){
        this.character = data.char
        console.log(this.character)
    }

    update(){}
}