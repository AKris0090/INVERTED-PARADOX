// Hero prefab
class EverythingStore extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, 0); // call Sprite parent class
        scene.add.existing(this);         // add Hero to existing scene
        scene.physics.add.existing(this);   // add physics body to scene
    }
}