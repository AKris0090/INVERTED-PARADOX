class MenuStateMachine{
    constructor(scene){
        this.scene = scene

        scene.menuFSM = new StateMachine('attack', {
            attack: new AttackState(),
            run: new RunState()
        }, [scene, this])
    }
}

class AttackState extends State{
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
            this.stateMachine.transition('run')
        }
    }
}

class RunState extends State{
    enter(scene, menu){
        // TODO: Change this to highlighting certain parts of text/an arrow pointing at the selection, not just changing the displayed text
        scene.menuText.text = 'Run'
    }

    execute(scene, menu){
        const { left, right, up, down, space, shift } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(left)){
            this.stateMachine.transition('attack')
        }
        if(Phaser.Input.Keyboard.JustDown(right)){
            this.stateMachine.transition('attack')
        }
    }
}