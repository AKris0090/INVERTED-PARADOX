// In hindsight, Enemy probably should be a child class of Character, with the constructor deciding which type of enemy
// the new enemy will be, but it's not really worth refactoring it now
// Too small syntax differences that would have to be changed everywhere
class Enemy{
    // Creates a new enemy for the player to fight 
    // Type allows manual selection of the enemy to be fought
    constructor(type = 'random'){
        this.type = type
        this.stats = {}
        // Add objects to this object to create more standard enemies, selectable by random
        // all enemies must have (a)ttack (p)ower, (def)ence, (h)it (p)oints, and (exp)eriance
        // ap determines damage delt to player, def resists the players damage, hp is how much damage the enemy can take, 
        // and exp is the amount of exp the player gets for killing one
        this.standardEnemies = {
            townsfolk:{
                ap: 50,
                def: 10,
                hp: 200,
                maxHP:200,
                exp: 50,
                spriteName: 'townsfolk'
            },
            squirrel:{
                ap: 100,
                def: 20,
                hp: 500,
                maxHP:500,
                exp: 75,
                spriteName: 'squirrel'
            },
            'big plant':{
                ap: 150,
                def: 35,
                hp: 500,
                maxHP:500,
                exp: 150,
                spriteName: 'bigPlant'
            },
        }

        if (this.type === 'random'){
            // Select a random standard enemy for the player to fight
            this.possibleEnemies = Object.keys(this.standardEnemies)
            this.chosenEnemy = this.possibleEnemies[Math.floor(this.possibleEnemies.length * Math.random())]
            this.stats = this.standardEnemies[this.chosenEnemy]
        }
        else if(this.type == 'boss'){
            // roughly beatable at level 7
            this.stats = {
                ap:500,
                def: 50,
                hp: 1000,
                maxHP:1000,
                // player wins after this, so i gave them a funny amount of xp
                // Used to be more, but it caused a stack size error due to leveling up multiple times being recursive
                exp: 10000,
                spriteName: 'boss'
            }
            this.chosenEnemy = 'boss'
        }else{
            this.stats = this.standardEnemies[this.type]
        }
    }
    // Returns true if the enemy is dead
    isDead(){
        if (this.stats.hp <= 0){
            return true
        }else{
            return false
        }
    }

    // deal damage to the enemy
    dealDamage(damage){
        this.stats.hp -= damage
    }
}