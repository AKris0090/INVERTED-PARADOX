class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // load graphics assets
        // for the main menu and instructions
        this.load.image('bkgrnd', './assets/SPLASHES/menubkg.png');
        this.load.image('button', './assets/SPLASHES/menu_button.png');
        this.load.image('blankBackground', './assets/SPLASHES/INSTRUCTIONS_CREDITS.png')

        // for battle
        this.load.image('hero', './assets/Sprites/hero.png')
        this.load.image('enemy', './assets/Sprites/enemy.png')
        this.load.spritesheet('squirrel', './assets/Prefabs_ANIM_Frames/SQUIRREL_BATTLE_CLIP.png', {
            frameWidth: 425,
            frameHeight: 325
        })
        this.load.spritesheet('townsfolk', './assets/Prefabs_ANIM_Frames/TOWNSFOLK_BATTLE_CLIP.png', {
            frameWidth: 425,
            frameHeight: 325
        })
        this.load.spritesheet('bigPlant', './assets/Prefabs_ANIM_Frames/PLANT_BATTLE_CLIP.png', {
            frameWidth: 425,
            frameHeight: 325
        })
        this.load.spritesheet('boss', './assets/Prefabs_ANIM_Frames/BOSS_BATTLE_CLIP.png', {
            frameWidth: 425,
            frameHeight: 325
        })
        this.load.spritesheet('BattleUI', `./assets/UI/BATTLE UI.png`,{
            frameWidth: 1200,
            frameHeight: 600
        })
        this.load.spritesheet('gumBattle', `./assets/Prefabs_ANIM_Frames/GUMBALL_BATTLE_CLIP.png`,{
            frameWidth: 175,
            frameHeight: 200
        })
        this.load.image('healthBar', './assets/UI/HEALTH BAR.png')
        this.load.image('battleBackground', './assets/SPLASHES/BATTLEBACKGROUND.png')
        this.load.image('bossBattleBackground', './assets/SPLASHES/BOSSBATTLEBACKGROUND.png')

        // for overworld
        this.load.image('tilesetImage', './assets/tilemaps/gumball_tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', './assets/tilemaps/Overworld.json')
        this.load.spritesheet('everythingStore', './assets/Prefabs_ANIM_Frames/EVERYTHINGSTORE.png', {
            frameWidth: 425,
            frameHeight: 500,
        })
        this.load.spritesheet('gumball', './assets/Prefabs_ANIM_Frames/Gumball.png', {
            frameWidth: 75,
            frameHeight: 100,
        })

        // load audio assets
        this.load.path = './assets/Sounds/'
        this.load.audio('hit', 'hit.wav')
        this.load.audio('menuMove', 'menuMove.wav')
        this.load.audio('run', 'run.wav')
        this.load.audio('shield', 'shield.wav')
        this.load.audio('battleStart', 'battleStart.ogg')

        // load music
        this.load.path = './assets/Music/'
        this.load.audio('battleMusic', 'battleMusic.wav')
        this.load.audio('overworldMusic', 'overworld.ogg')
        this.load.audio('menuMusic', 'titleTheme.wav')
        
    }

    create() {
        // create the animations
        this.anims.create({
            key: 'rain',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('everythingStore', {
                frames: [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4]
            })
        })

        // Animations for battleUI
        // Created this way so that the only code the needs changed is here if we decide to make the arrow blink in future
        this.anims.create({
            key:'attackChoice',
            frameRate:0,
            repeat: -1,
            frames:this.anims.generateFrameNames('BattleUI', {
                frames: [0]
            })
        })

        this.anims.create({
            key:'defendChoice',
            frameRate:0,
            repeat: -1,
            frames:this.anims.generateFrameNames('BattleUI', {
                frames: [1]
            })
        })

        this.anims.create({
            key:'runChoice',
            frameRate:0,
            repeat: -1,
            frames:this.anims.generateFrameNames('BattleUI', {
                frames: [2]
            })
        })

        // overworld character anims

        // Idle up
        this.anims.create({
            key: 'idle-up',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gumball', {
                start: 2,
                end: 2
            })
        })

        // Idle down
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gumball', {
                start: 3,
                end: 3
            })
        })

        // Idle left
        this.anims.create({
            key: 'idle-left',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gumball', {
                start: 2,
                end: 2
            })
        })

        // Idle right
        this.anims.create({
            key: 'idle-right',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gumball', {
                start: 3,
                end: 3
            })
        })

        // Walk up
        this.anims.create({
            key: 'walk-up',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gumball', {
                start: 4,
                end: 5
            })
        });

        // Walk down
        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gumball', {
                start: 1,
                end: 0
            })
        });

        // Walk left
        this.anims.create({
            key: 'walk-left',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gumball', {
                start: 1,
                end: 0
            })
        });

        // Walk right
        this.anims.create({
            key: 'walk-right',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gumball', {
                start: 4,
                end: 5
            })
        });



        // BATTLE ANIMS

        // Gumball IDLE
        this.anims.create({
            key: 'gumIdle',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gumBattle', {
                start: 0,
                end: 1
            })
        });

        // Gumball ATTACK
        this.anims.create({
            key: 'gumAttack',
            frameRate: 25,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('gumBattle', {
                frames: [6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11]
            })
        });

        // Enemies attack and idle
        // Townsfolk
        this.anims.create({
            key: 'townsfolkIdle',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('townsfolk', {
                start: 0,
                end: 1
            })
        });

        this.anims.create({
            key: 'townsfolkAttack',
            frameRate: 25,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('townsfolk', {
                frames: [7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13]
            })
        });

        // squirrel
        this.anims.create({
            key: 'squirrelIdle',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('squirrel', {
                start: 0,
                end: 1
            })
        });

        this.anims.create({
            key: 'squirrelAttack',
            frameRate: 25,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('squirrel', {
                frames: [5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9]
            })
        });

        // bigPlant
        this.anims.create({
            // Horrible key because 'big plant' is what is saved in enemy as the enemy's name to make it work in text boxes
            // So if I want to construct animation names out of that, then I have to use this key
            // it makes me physically ill
            key: 'big plantIdle',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bigPlant', {
                start: 0,
                end: 1
            })
        });

        this.anims.create({
            key: 'big plantAttack',
            frameRate: 25,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('bigPlant', {
                frames: [7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13]
            })
        });

        // boss
        this.anims.create({
            key: 'bossIdle',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('boss', {
                start: 0,
                end: 1
            })
        });

        this.anims.create({
            key: 'bossAttack',
            frameRate: 25,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('boss', {
                frames: [7, 8, 8, 9, 9, 10, 8, 8, 9, 9, 10, 8, 8, 9, 9, 10, 11, 11, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 13, 12, 12, 12, 13, 13, 12, 12, 13, 13, 12, 12, 13, 13]
            })
        });


        // go to Title scene
        this.scene.start('menuScene');
    }
}