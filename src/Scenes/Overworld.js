// Requires a character to be passed in via start data
class Overworld extends Phaser.Scene {
    constructor() {
        super("overworld");
    }

    create(){
        console.log("Overworlding!")
    }

    init(data){
        this.character = data.char
        console.log(this.character)
    }

    update(){}
}