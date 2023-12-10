/*
The BattleStateMahine will be used for keeping track of the battles
state machine visual representation

<-> AttackChoice <-> DefenceChoice <-> RunChoice <->  
        |                  |               |
    AttackAction      DefenceAction    RunFailed OR RunSucessful
        \                  |               /              |
                      EnemyAction                     Overworld
                           |
                      EnemyDamage
                           |
                      AttackChoice

Before all transitions, the current player and enemy's health will be checked
If the player is dead, transition to PlayerDead state, EnemyDead state if the enemy is dead
*/

let goingBack

class BattleStateMachine{
    constructor(scene){
        this.scene = scene
        scene.battleFSM = new StateMachine('attack', {
            attack: new AttackChoice(),
            run: new RunChoice(),
            defense: new DefenseChoice(),
            defenseAction: new DefenseAction(),
            attackAction: new AttackAction(),
            enemyAction: new EnemyAction(),
            runSucessful: new RunSucessful(),
            runFailed: new RunFailed(),
            enemyDead: new EnemyDead(),
            playerDead: new PlayerDead(),
            levelUp: new LevelUp(),
        }, [scene])
        // This will be used to track the option selected by the player last
        // This is so when it is the player's turn, the last selected option will be the one currently pointed at
        scene.lastPlayerChoice = 'attack'
        goingBack = false
    }

}

// Tests if the battle should end, due to either player or enemy death
// Returns true if it should, false otherwise
function endCheck(scene, absoluteState){
    if(scene.enemy.isDead()){
        absoluteState.stateMachine.transition('enemyDead')
        return true
    }
    if(character.isDead()){
        absoluteState.stateMachine.transition('playerDead')
        return true
    }
    return false
}

// Sends the player back to the overworld
// Going back bool is to stop the fade out from being triggered multiple times
function backToOverworld(scene){
    console.log(goingBack)
    if (goingBack == false){
        goingBack = true
        console.log("activating fade")
        scene.cameras.main.fadeOut(500, 255, 255, 255, (cam, complete)=>{
            if(complete == 1){
                scene.scene.start('overworld')
            }
        }, scene)
    }
}

// Provide the player the option to attack
class AttackChoice extends State{
    enter(scene){
        scene.UI.play('attackChoice')
        scene.menuMove.play()
        scene.menuText.text = 'The ' + scene.enemy.chosenEnemy + ' looks at you menacingly'
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(up)){
            this.stateMachine.transition('run')
        }
        if(Phaser.Input.Keyboard.JustDown(down)){
            this.stateMachine.transition('defense')
        }
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('attackAction')
            scene.lastPlayerChoice = 'attack'
        }
    }
}

// Attack the enemy, and deal the appropriate damage
class AttackAction extends State{
    enter(scene){
        this.damage = scene.attackDamage(character.ap, scene.enemy.stats.def)
        scene.enemy.dealDamage(this.damage)
        // Prevent health from becoming negative
        if(scene.enemy.stats.hp < 0){
            scene.enemy.stats.hp = 0
        }
        // reduces the 
        scene.enemyHealthBar.setCrop(0, 0, scene.enemyHealthBar.width * scene.enemy.stats.hp/scene.enemy.stats.maxHP, scene.enemyHealthBar.height)
        scene.menuText.text = 'You dealt ' + this.damage + ' damage to the ' + scene.enemy.chosenEnemy + '!'
        scene.hit.play()
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            if(endCheck(scene, this) != true){
                this.stateMachine.transition('enemyAction')       
            }     
        }
    }
}

// Proivde the option for the player to attack
class DefenseChoice extends State{
    enter(scene){
        scene.UI.play('defendChoice')
        scene.menuMove.play()
        scene.menuText.text = 'The ' + scene.enemy.chosenEnemy + ' looks at you menacingly'
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(up)){
            this.stateMachine.transition('attack')
        }
        if(Phaser.Input.Keyboard.JustDown(down)){
            this.stateMachine.transition('run')
        }
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('defenseAction')
            scene.lastPlayerChoice = 'defense'
        }
    }
}

// Increace the player's defense for a turn
class DefenseAction extends State{
    enter(scene){
        character.defAction()
        scene.menuText.text = 'Your defense is now ' + character.def + '!'
        scene.shield.play()
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('enemyAction')
        }
    }
}

// Gives the player the choice to run away
class RunChoice extends State{
    enter(scene){
        scene.UI.play('runChoice')
        scene.menuMove.play()
        scene.menuText.text = 'The ' + scene.enemy.chosenEnemy + ' looks at you menacingly'
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(up)){
            this.stateMachine.transition('defense')
        }
        if(Phaser.Input.Keyboard.JustDown(down)){
            this.stateMachine.transition('attack')
        }
        if(Phaser.Input.Keyboard.JustDown(space)){
            // add the characters ap to a random value between 0 and the enemy's ap
            // if that is greater than the enemy's ap, run away sucessfully
            // autofail if the enemy is the boss
            this.runValue = character.ap + Math.random()*scene.enemy.stats.ap
            if(this.runValue > scene.enemy.stats.ap && scene.enemy.chosenEnemy !== 'boss'){
                this.stateMachine.transition('runSucessful')
            }else{
                this.stateMachine.transition('runFailed')
            }
            scene.lastPlayerChoice = 'run'
        }
    }
}

// The player failed to run away
class RunFailed extends State{
    enter(scene){
        scene.menuText.text = 'You couldn\'t get away!'
        scene.run.play()
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('enemyAction')
        }
    }
}

// The player sucessfully ran away
class RunSucessful extends State{
    enter(scene){
        scene.menuText.text = 'You got away!'
        scene.run.play()
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            backToOverworld(scene)
        }
    }
}

// The enemy attacks
class EnemyAction extends State{
    enter(scene){
        this.damage = scene.attackDamage(scene.enemy.stats.ap, character.def)
        character.dealDamage(this.damage)
        // Prevent hp from going below 0
        if(character.hp < 0){
            character.hp = 0
        }
        scene.playerHealthBar.setCrop(0, 0, scene.playerHealthBar.width * character.hp/character.maxHP, scene.playerHealthBar.height)
        scene.menuText.text = 'The ' + scene.enemy.chosenEnemy + ' dealt ' + this.damage + ' damage to you!'
        // If the player chose to defend, revert thier defense to the normal values
        character.revertDef()
        scene.hit.play()
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            // Checks if the player died, and end the battle if they did
            if(endCheck(scene, this) != true){
                this.stateMachine.transition(scene.lastPlayerChoice)       
            }    
        }
    }
}

// The enemy reaches 0 hp
class EnemyDead extends State{
    enter(scene){
        scene.menuText.text = 'You have defeated the ' + scene.enemy.chosenEnemy + '! You gain ' + scene.enemy.stats.exp + ' experience points!'
        scene.menuMove.play()
    }
    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            if(scene.enemy.chosenEnemy === 'boss'){
                scene.scene.start('ending')
            }else if(character.increaseExp(scene.enemy.stats.exp)){
                this.stateMachine.transition('levelUp')
            }else{
                backToOverworld(scene)
            }
        }
    }
}

// The player leveled up
class LevelUp{
    enter(scene){
        scene.menuText.text = `You reached level ` + character.lvl + `!
        Max health is now ` + character.maxHP + `.
        Attack Power is now ` + character.ap + `.
        Defense is now ` + character.def + `.`
        scene.menuMove.play()
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            backToOverworld(scene)
        }
    }
}

// The player reaches 0 hp
class PlayerDead extends State{
    enter(scene){
        scene.menuText.text = "You have perished. Press space to return to the main menu (or shift if you feel like CHEATING)."
        scene.menuMove.play()
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            scene.scene.start('menuScene')
        }
        if(Phaser.Input.Keyboard.JustDown(shift)){
            scene.scene.start('overworld')
        }
    }
}