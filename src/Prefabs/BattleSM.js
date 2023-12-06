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
        }, [scene, this])
    }
}

// Provide the player the option to attack
class AttackChoice extends State{
    enter(scene, menu){
        // TODO: Change this to highlighting certain parts of text/an arrow pointing at the selection, not just changing the displayed text
        scene.menuText.text = 'Attack'
    }

    execute(scene, menu){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(left)){
            this.stateMachine.transition('run')
        }
        if(Phaser.Input.Keyboard.JustDown(right)){
            this.stateMachine.transition('defense')
        }
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('attackAction')
        }
    }
}

// Attack the enemy, and deal the appropriate damage
class AttackAction extends State{
    enter(scene, menu){
        this.damage = scene.attackDamage(scene.character.ap, scene.enemy.stats.def)
        console.log(scene.character.ap)
        console.log(scene.enemy.stats.def)
        console.log(this.damage)
        scene.enemy.dealDamage(this.damage)
        scene.enemyHealth.text = scene.enemy.stats.hp
        scene.menuText.text = 'You dealt ' + this.damage + ' damage to the ' + scene.enemy.chosenEnemy + '!'
    }

    execute(scene, menu){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('enemyAction')
        }
    }
}

// Proivde the option for the player to attack
class DefenseChoice extends State{
    enter(scene, menu){
        // TODO: Change this to highlighting certain parts of text/an arrow pointing at the selection, not just changing the displayed text
        scene.menuText.text = 'Defend'
    }

    execute(scene, menu){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(left)){
            this.stateMachine.transition('attack')
        }
        if(Phaser.Input.Keyboard.JustDown(right)){
            this.stateMachine.transition('run')
        }
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('defenseAction')
        }
    }
}

// Increace the player's defense for a turn
class DefenseAction extends State{
    enter(scene, menu){
        // TODO: Change this to highlighting certain parts of text/an arrow pointing at the selection, not just changing the displayed text
        scene.character.defAction()
        scene.menuText.text = 'Your defense is now ' + scene.character.def + '!'
    }

    execute(scene, menu){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('enemyAction')
        }
    }
}

// Gives the player the choice to run away
class RunChoice extends State{
    enter(scene, menu){
        // TODO: Change this to highlighting certain parts of text/an arrow pointing at the selection, not just changing the displayed text
        scene.menuText.text = 'Run'
    }

    execute(scene, menu){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(left)){
            this.stateMachine.transition('defense')
        }
        if(Phaser.Input.Keyboard.JustDown(right)){
            this.stateMachine.transition('attack')
        }
        if(Phaser.Input.Keyboard.JustDown(space)){
            // Subtract an amount between 0 and 49 from the player's ap
            // if that is greater than the enemy's ap, run away sucessfully
            // autofail if the enemy is the boss
            this.runValue = scene.character.ap - Math.random()*50
            console.log(this.runValue)
            console.log(scene.enemy.stats.ap)
            if(this.runValue > scene.enemy.stats.ap && scene.enemy.chosenEnemy !== 'boss'){
                this.stateMachine.transition('runSucessful')
            }else{
                this.stateMachine.transition('runFailed')
            }
        }
    }
}

// The player failed to run away
class RunFailed extends State{
    enter(scene, menu){
        scene.menuText.text = 'You couldn\'t get away!'
    }

    execute(scene, menu){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('enemyAction')
        }
    }
}

// The player sucessfully ran away
class RunSucessful extends State{
    enter(scene, menu){
        scene.menuText.text = 'You got away!'
    }

    execute(scene, menu){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            scene.scene.start('overworld', {char: scene.character})
        }
    }
}

// The enemy attacks
class EnemyAction extends State{
    enter(scene, menu){
        this.damage = scene.attackDamage(scene.enemy.stats.ap, scene.character.def)
        scene.character.dealDamage(this.damage)
        scene.playerHealth.text = scene.character.hp
        scene.menuText.text = 'The ' + scene.enemy.chosenEnemy + ' dealt ' + this.damage + ' damage to you!'
        // If the player chose to defend, revert thier defense to the normal values
        scene.character.revertDef()
    }

    execute(scene, menu){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('attack')
        }
    }
}