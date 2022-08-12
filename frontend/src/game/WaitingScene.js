import { Game, Scene } from 'phaser';
import Phaser from 'phaser';
//import RoomView from '../views/RoomView.vue';
//import testPlayer from require('../assets/test_player.png');


class WaitingScene extends Scene {
    constructor() {
        super({key : "waitingScene"});
    }

    team1 = [];
    team2 = [];
    rope = [];
    grounds = undefined;
    nowPosition1 = []
    nowPosition2 = []
    team1Shake = false;
    team2Shake = false;

    teamName1 = ["", "", ""];
    teamName2 = ["","",""];
    teamNameMove1 = []
    teamNameMove2 = []
    gameCategory = 0;


    //this.$refs.game-container.clientHeight
    //spriteScale = Game.world.width / 1600;


    WidthScale = 1;
    HeightScale = 1;

    create() {


        var outEvent = new Phaser.Events.EventEmitter();
        var inEvent = new Phaser.Events.EventEmitter();
        var goLeftEvent = new Phaser.Events.EventEmitter();
        var goRightEvent = new Phaser.Events.EventEmitter();


        this.WidthScale = this.sys.game.canvas.width / 1600;
        this.HeightScale = this.sys.game.canvas.height / 512;

        if (this.gameCategory == 0){
            this.add.image(800*this.WidthScale , 256*this.WidthScale, 'background').setScale(this.WidthScale);


            this.RightDesk = this.add.image(800*this.WidthScale, 260*this.WidthScale, 'DeskRight').setScale(this.WidthScale);
            this.LeftDesk = this.add.image(800*this.WidthScale, 260*this.WidthScale, 'DeskLeft').setScale(this.WidthScale);


            this.rope = this.physics.add.sprite(800*this.WidthScale, 200*this.WidthScale, 'rope').setScale(this.WidthScale);
            this.rope.setImmovable(true);
            this.rope.body.allowGravity = false;

            this.ropePosition = this.rope.x;

            this.team1[0] = this.physics.add.sprite(250*this.WidthScale, 200*this.WidthScale, 'slime1_1').setScale(this.WidthScale).play('slime1Move');
            this.team1[1] = this.physics.add.sprite(400*this.WidthScale, 200*this.WidthScale, 'stone').setScale(this.WidthScale).play('stoneMove');
            this.team1[2] = this.physics.add.sprite(550*this.WidthScale, 200*this.WidthScale, 'Sushi_1').setScale(this.WidthScale).play('SushiMove');

            this.team2[0] = this.physics.add.sprite(1050*this.WidthScale, 200*this.WidthScale, 'gummybear_1').setScale(this.WidthScale).play('gummybearMove');
            this.team2[1] = this.physics.add.sprite(1200*this.WidthScale, 200*this.WidthScale, 'pudding_1').setScale(this.WidthScale).play('puddingMove');
            this.team2[2] = this.physics.add.sprite(1350*this.WidthScale, 200*this.WidthScale, 'whale').setScale(this.WidthScale).play('whaleMove');


            this.teamNameMove1[0] = this.add.text(125*this.WidthScale, 275*this.WidthScale, this.teamName1[0], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
            this.teamNameMove1[1] = this.add.text(275*this.WidthScale, 275*this.WidthScale, this.teamName1[1], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
            this.teamNameMove1[2] = this.add.text(425*this.WidthScale, 275*this.WidthScale, this.teamName1[2], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);

            this.teamNameMove2[0] = this.add.text(1025*this.WidthScale, 275*this.WidthScale, this.teamName2[0], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
            this.teamNameMove2[1] = this.add.text(1175*this.WidthScale, 275*this.WidthScale, this.teamName2[1], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
            this.teamNameMove2[2] = this.add.text(1325*this.WidthScale, 275*this.WidthScale, this.teamName2[2], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);


            this.add.text(675*this.WidthScale, 256*this.WidthScale, "Press Start", { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setFontSize(50*this.WidthScale);



            for (var i=0; i<3; i++){
                this.nowPosition1[i] = this.team1[i].x;
                this.nowPosition2[i] = this.team2[i].x;
            }

            this.team2[0].flipX = true;
            this.team2[1].flipX = true;
            this.team2[2].flipX = false;

            this.team1[0].flipX = false;
            this.team1[1].flipX = false;
            this.team1[2].flipX = false;

            this.rope.setImmovable(true);
            this.rope.body.allowGravity = false;

                
            for (var i = 0 ; i < this.team1.length ; i++){
                this.team1[i].setImmovable(true)
                this.team1[i].body.allowGravity = false;
                this.team2[i].setImmovable(true)
                this.team2[i].body.allowGravity = false;
            }
        } else if (this.gameCategory == 1){
            
        this.add.image(800*this.WidthScale, 256*this.HeightScale, 'RunningRoom').setScale(this.WidthScale, this.HeightScale);

        this.team1[0] = this.physics.add.sprite(50*this.WidthScale, 175*this.HeightScale, 'slime1_1').setScale(0.4*this.WidthScale).play('slime1Move');

        this.team1[1] = this.physics.add.sprite(60*this.WidthScale, 235*this.HeightScale, 'stone').setScale(0.4*this.WidthScale).play('stoneMove');
        this.team1[2] = this.physics.add.sprite(70*this.WidthScale, 290*this.HeightScale, 'Sushi_1').setScale(0.4*this.WidthScale).play('SushiMove');

        this.team1[3] = this.physics.add.sprite(80*this.WidthScale, 340*this.HeightScale, 'gummybear_1').setScale(0.4*this.WidthScale).play('gummybearMove');
        this.team1[4] = this.physics.add.sprite(90*this.WidthScale, 400*this.HeightScale, 'pudding_1').setScale(0.4*this.WidthScale).play('puddingMove');
        this.team1[5] = this.physics.add.sprite(100*this.WidthScale, 450*this.HeightScale, 'whale').setScale(0.4*this.WidthScale).play('whaleMove');


        // team name for moving
        this.teamNameMove1[0] = this.add.text(15*this.WidthScale, 175*this.HeightScale, this.teamName1[0], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(0.7*this.WidthScale);
        this.teamNameMove1[1] = this.add.text(25*this.WidthScale, 235*this.HeightScale, this.teamName1[1], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(0.7*this.WidthScale);
        this.teamNameMove1[2] = this.add.text(35*this.WidthScale, 290*this.HeightScale, this.teamName1[2], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(0.7*this.WidthScale);
        this.teamNameMove1[3] = this.add.text(45*this.WidthScale, 340*this.HeightScale, this.teamName1[3], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(0.7*this.WidthScale);
        this.teamNameMove1[4] = this.add.text(55*this.WidthScale, 400*this.HeightScale, this.teamName1[4], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(0.7*this.WidthScale);
        this.teamNameMove1[5] = this.add.text(65*this.WidthScale, 450*this.HeightScale, this.teamName1[5], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(0.7*this.WidthScale);
        

        this.team1[5].flipX = true;

        this.add.text(675*this.WidthScale, 256*this.WidthScale, "Press Start", { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setFontSize(50*this.WidthScale);

        // no gravity
        for (var i = 0 ; i < 6 ; i++){
            this.team1[i].setImmovable(true)
            this.team1[i].body.allowGravity = false;
        }

        }

    }

    update() {
    }

}

export default WaitingScene;
