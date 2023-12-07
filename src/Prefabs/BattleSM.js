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
    }

}

// Tests if the bettle should end, due to either player or enemy death
function endCheck(scene, absoluteState){
    if(scene.enemy.isDead()){
        absoluteState.stateMachine.transition('enemyDead')
        return
    }
    if(character.isDead()){
        absoluteState.stateMachine.transition('playerDead')
        return
    }
}

// Provide the player the option to attack
class AttackChoice extends State{
    enter(scene){
        // TODO: Change this to highlighting certain parts of text/an arrow pointing at the selection, not just changing the displayed text
        scene.UI.play('attackChoice')
        scene.menuMove.play()
        scene.menuText.text = ''
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
        scene.enemyHealth.text = scene.enemy.stats.hp
        scene.enemyHealthBar.setScale(scene.enemy.stats.hp/scene.enemy.stats.maxHP, 1)
        console.log(scene.enemy.stats.hp/scene.enemy.stats.maxHP)
        console.log(scene.enemy.stats.hp)
        console.log(scene.enemy.stats.maxHP)
        scene.menuText.text = 'You dealt ' + this.damage + ' damage to the ' + scene.enemy.chosenEnemy + '!'
        scene.hit.play()
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('enemyAction')
            // Checks if the enemy died, and end the battle if it did
            endCheck(scene, this)
        }
    }
}

// Proivde the option for the player to attack
class DefenseChoice extends State{
    enter(scene){
        // TODO: Change this to highlighting certain parts of text/an arrow pointing at the selection, not just changing the displayed text
        scene.UI.play('defendChoice')
        scene.menuMove.play()
        scene.menuText.text = ''
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
        // TODO: Change this to highlighting certain parts of text/an arrow pointing at the selection, not just changing the displayed text
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
        // TODO: Change this to highlighting certain parts of text/an arrow pointing at the selection, not just changing the displayed text
        scene.UI.play('runChoice')
        scene.menuMove.play()
        scene.menuText.text = ''
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
            // Subtract an amount between 0 and 49 from the player's ap
            // if that is greater than the enemy's ap, run away sucessfully
            // autofail if the enemy is the boss
            this.runValue = character.ap - Math.random()*50
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
            // TODO: Add some sort of camera effect for transition back to overworld
            scene.scene.start('overworld', {char: character})
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
        scene.playerHealth.text = character.hp
        scene.playerHealthBar.setScale(character.hp/character.maxHP, 1)
        scene.menuText.text = 'The ' + scene.enemy.chosenEnemy + ' dealt ' + this.damage + ' damage to you!'
        // If the player chose to defend, revert thier defense to the normal values
        character.revertDef()
        scene.hit.play()
    }

    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition(scene.lastPlayerChoice)
            // Checks if the player died, and end the battle if they did
            endCheck(scene, this)
        }
    }
}

// The enemy reaches 0 hp
class EnemyDead extends State{
    enter(scene){
        scene.menuText.text = 'You have defeated the ' + scene.enemy.chosenEnemy + '! You gain ' + scene.enemy.stats.exp + ' experiance points!'
        scene.menuMove.play()
    }
    execute(scene){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            if(character.increaseExp(scene.enemy.stats.exp)){
                this.stateMachine.transition('levelUp')
            }else{
                // TODO: Add some sort of camera effect for transition back to overworld
                scene.scene.start('overworld')
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
            // TODO: Add some sort of camera effect for transition back to overworld
            scene.scene.start('overworld', {char: character})
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
            // TODO: Add some sort of camera effect for transition back to overworld
            scene.scene.start('menuScene')
        }
        if(Phaser.Input.Keyboard.JustDown(shift)){
            // TODO: Add some sort of camera effect for transition back to overworld
            scene.scene.start('overworld', {char: character})
        }
    }
}