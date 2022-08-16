import { Scene } from 'phaser';
import Phaser from 'phaser';
//import RoomView from '../views/RoomView.vue';
//import testPlayer from require('../assets/test_player.png');


class RunningScene extends Scene {
    constructor() {
        super({key : "runningScene"});
    }

    team1 = [];
    team2 = [];
    rope = [];
    goRightStart = [];
    nowPosition = [0, 0, 0, 0, 0];
    nextPosition = [0, 0, 0, 0, 0, 0];
    teamName1 = []
    teamNameMove1 = []
    
    players = 0;
    grounds = undefined;



    create() {

        var outEvent = new Phaser.Events.EventEmitter();
        var inEvent = new Phaser.Events.EventEmitter();
        var goLeftEvent = new Phaser.Events.EventEmitter();
        var goRightEvent = new Phaser.Events.EventEmitter();



        this.WidthScale = this.sys.game.canvas.width / 1600;
        this.HeightScale = this.sys.game.canvas.height / 512;

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


        for (var i=0; i<6; i++){
            this.nowPosition[i] = (15 + (10*i))*this.WidthScale
        }

        for (var i=0; i<6; i++){
            this.nextPosition[i] = 0;
        }
        // no gravity
        for (var i = 0 ; i < 6 ; i++){
            this.team1[i].setImmovable(true)
            this.team1[i].body.allowGravity = false;
            this.nextPosition[i];
        }
    }


    GoRight(name){
        let idx = 0;
        for (var i=0; i<6; i++){
            if (this.teamName1[i] == name){
                idx = i;
            }
        }
        this.nextPosition[idx] += 145 * this.WidthScale;
        this.team1[idx].setVelocityX(200 * this.WidthScale);
    }



    Winner(name){

        for (var i=0; i<6; i++){
            this.nextPosition[i] = 0;
        }

    }

    setName(name){
        for (var i=0; i<6; i++){
            this.teamName1[i] = name[i];
        }
        this.players = name.length;
    }
    update() {

        for (var i=0; i<6; i++){
            this.teamNameMove1[i].setX(this.team1[i].x - 35*this.WidthScale);
            if (i >= this.players){
                this.team1[i].setX(8000);
            }
        }
        for (var i=0; i<6; i++){
            
            if (this.team1[i].x >= this.nowPosition[i] + this.nextPosition[i]){
                this.team1[i].setVelocityX(0);
            }
        }
    }

}

export default RunningScene;
