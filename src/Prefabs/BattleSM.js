/*
The BattleStateMahine will be used for keeping track of the battles
state machine visual representation

<-> AttackChoice <-> DefenceChoice <-> RunChoice <->  
        |                  |               |
    AttackAction      DefenceAction    RunFailed OR transition back to overworld
        \                  |               /
                      EnemyAction
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
            attackAction: new AttackAction(),
            enemyAction: new EnemyAction()
        }, [scene, this])
    }
}

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
    }
}

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
    }
}

class EnemyAction extends State{
    enter(scene, menu){
        this.damage = scene.attackDamage(scene.enemy.stats.ap, scene.character.def)
        scene.character.dealDamage(this.damage)
        scene.playerHealth.text = scene.character.hp
        scene.menuText.text = 'The ' + scene.enemy.chosenEnemy + ' dealt ' + this.damage + ' damage to you!'
    }

    execute(scene, menu){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('attack')
        }
    }
}