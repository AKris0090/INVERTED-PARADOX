// Used for keeping track of the player's stats between battle scenes and the overworld
// In hindsight, Enemy probably should be a child class of Character, with the constructor deciding which type of enemy
// the new enemy will be, but it's not really worth refactoring it now
// Too small syntax differences that would have to be changed everywhere

class Character {
    // Makes a new chacacter. Default level one values provided for experience (exp), attack power (ap)
    // defense (def), hit points (hp), and level (lvl). If a large amount of experience is passed in, 
    // the character will be automatically leveled up the appropriate number of times
    // Additionally, tracks the current x, y value in the overworld so that the character can be returned
    // to the correct place after a battle is finished
    constructor(exp = 0, x = 100, y = 100, ap = 50, def = 25, maxHP = 500, lvl = 1){
        this.x = x
        this.y = y
        this.ap = ap
        this.def = def
        this.normalDef = def
        this.maxHP = maxHP
        this.hp = maxHP
        this.lvl = lvl

        // Constant that determines what factor the defence action increaces defense by
        this.DEF_BUFF = 2

        // Constants for level increment amounts
        // RNG values represent ranges, min represents minium
        // so, AP_RNG = 10 and AP_MIN = 2 means on level up, ap will increace by ~2-12
        this.AP_RNG = 50;
        this.DEF_RNG = 30
        this.HP_RNG = 100

        this.AP_MIN = 10
        this.DEF_MIN = 10
        this.HP_MIN = 50

        // Checks if the character needs to be leveled, and does so if need be
        this.exp = 0
        this.increaseExp(exp)
    }

    // Increaces exp, then checks if the character needs leveled. Returns true if they did, false if otherwise
    increaseExp(xp){
        this.exp += xp
        return this.levelCheck()
    }

    healToFull(){
        this.hp = this.maxHP
    }

    dealDamage(damage){
        this.hp -= damage
    }

    isDead(){
        if (this.hp <= 0){
            return true
        }
        return false
    }

    // If the character has more then 100 exp, levels them up and increaces ap, def, and hp by random amounts
    // before checking if they need to be leveled up again. Return true if the character was leveled up
    levelCheck(){
        if (this.exp >= 100){
            this.exp -= 100
            this.lvl++;
            this.ap += Math.floor(Math.random()*this.AP_RNG+this.AP_MIN)
            this.def += Math.floor(Math.random()*this.DEF_RNG+this.DEF_MIN)
            this.maxHP += Math.floor(Math.random()*this.HP_RNG+this.HP_MIN)
            this.levelCheck()
            return true
        }
        return false
    }

    revertDef(){
        this.def = this.normalDef
    }

    defAction(){
        this.def *= this.DEF_BUFF
    }
}