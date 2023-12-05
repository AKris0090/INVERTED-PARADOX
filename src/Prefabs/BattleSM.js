class BattleStateMachine{
    constructor(scene){
        this.scene = scene

        scene.menuFSM = new StateMachine('attack', {
            attack: new AttackChoice(),
            run: new RunChoice(),
            defense: new DefenseChoice()
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