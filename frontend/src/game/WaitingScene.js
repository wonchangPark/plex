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
    team1Img = ["not", "not", "not"];
    team2Img = ["not", "not", "not"];
    teamNameMove1 = []
    teamNameMove2 = []
    gameCategory = 0;

    runningImg = ["not","not","not","not","not","not"]
    pos = [175, 235, 290, 340, 400, 450];

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

            // this.team1[0] = this.physics.add.sprite(250*this.WidthScale, 200*this.WidthScale, 'slime1_1').setScale(this.WidthScale).play('slime1Move');
            // this.team1[1] = this.physics.add.sprite(400*this.WidthScale, 200*this.WidthScale, 'stone').setScale(this.WidthScale).play('stoneMove');
            // this.team1[2] = this.physics.add.sprite(550*this.WidthScale, 200*this.WidthScale, 'Sushi_1').setScale(this.WidthScale).play('SushiMove');

            // this.team2[0] = this.physics.add.sprite(1050*this.WidthScale, 200*this.WidthScale, 'gummybear_1').setScale(this.WidthScale).play('gummybearMove');
            // this.team2[1] = this.physics.add.sprite(1200*this.WidthScale, 200*this.WidthScale, 'pudding_1').setScale(this.WidthScale).play('puddingMove');
            // this.team2[2] = this.physics.add.sprite(1350*this.WidthScale, 200*this.WidthScale, 'whale').setScale(this.WidthScale).play('whaleMove');

            for (var i=0; i<3; i++){
                if(this.team1Img[i] === "slime"){
                    this.team1[i] = this.physics.add.sprite((700 - (150 * (3-i)))*this.WidthScale, 200*this.WidthScale, 'slime1_1').setScale(this.WidthScale).play('slime1Move');
                } else if (this.team1Img[i] === "stone"){
                    this.team1[i] = this.physics.add.sprite((700 - (150 * (3-i)))*this.WidthScale, 200*this.WidthScale, 'stone').setScale(this.WidthScale).play('stoneMove');
                } else if (this.team1Img[i] === "sushi"){
                    this.team1[i] = this.physics.add.sprite((700 - (150 * (3-i)))*this.WidthScale, 200*this.WidthScale, 'Sushi_1').setScale(this.WidthScale).play('SushiMove');
                } else if (this.team1Img[i] === "gummybear"){
                    this.team1[i] = this.physics.add.sprite((700 - (150 * (3-i)))*this.WidthScale, 200*this.WidthScale, 'gummybear_1').setScale(this.WidthScale).play('gummybearMove');
                } else if (this.team1Img[i] === "pudding"){
                    this.team1[i] = this.physics.add.sprite((700 - (150 * (3-i)))*this.WidthScale, 200*this.WidthScale, 'pudding_1').setScale(this.WidthScale).play('puddingMove');
                } else  if (this.team1Img[i] === "whale"){
                    this.team1[i] = this.physics.add.sprite((700 - (150 * (3-i)))*this.WidthScale, 200*this.WidthScale, 'whale').setScale(this.WidthScale).play('whaleMove');
                    this.team1[i].flipX = true;
                } else{
                    this.team1[i] = this.physics.add.sprite((700 - (150 * (3-i)))*this.WidthScale, 200*this.WidthScale, 'whale').setScale(this.WidthScale).play('whaleMove');
                    this.team1[i].setX(8000);
                }
    
                if(this.team2Img[i] == "slime"){
                    this.team2[i] = this.physics.add.sprite((900 + (150 * (i+1)))*this.WidthScale, 200*this.WidthScale, 'slime1_1').setScale(this.WidthScale).play('slime1Move');
                    this.team2[i].flipX = true;
                } else if (this.team2Img[i] == "stone"){
                    this.team2[i] = this.physics.add.sprite((900 +  (150 * (i+1)))*this.WidthScale, 200*this.WidthScale, 'stone').setScale(this.WidthScale).play('stoneMove');
                    this.team2[i].flipX = true;
                } else if (this.team2Img[i] == "sushi"){
                    this.team2[i] = this.physics.add.sprite((900 +  (150 * (i+1)))*this.WidthScale, 200*this.WidthScale, 'Sushi_1').setScale(this.WidthScale).play('SushiMove');
                    this.team2[i].flipX = true;
                } else if (this.team2Img[i] == "gummybear"){
                    this.team2[i] = this.physics.add.sprite((900 +  (150 * (i+1)))*this.WidthScale, 200*this.WidthScale, 'gummybear_1').setScale(this.WidthScale).play('gummybearMove');
                    this.team2[i].flipX = true;
                } else if (this.team2Img[i] == "pudding"){
                    this.team2[i] = this.physics.add.sprite((900 +  (150 * (i+1)))*this.WidthScale, 200*this.WidthScale, 'pudding_1').setScale(this.WidthScale).play('puddingMove');
                    this.team2[i].flipX = true;
                } else if (this.team2Img[i] === "whale"){
                    this.team2[i] = this.physics.add.sprite((900 +  (150 * (i+1)))*this.WidthScale, 200*this.WidthScale, 'whale').setScale(this.WidthScale).play('whaleMove');
                    this.team2[i].flipX = false;
                } else{
                    this.team2[i] = this.physics.add.sprite((900 +  (150 * (i+1)))*this.WidthScale, 200*this.WidthScale, 'whale').setScale(this.WidthScale).play('whaleMove');
                    this.team2[i].setX(8000);
                }
            }

            this.add.image(800*this.WidthScale , 256*this.WidthScale, 'Room1600_2').setScale(this.WidthScale);

            this.teamNameMove1[0] = this.add.text(this.team1[0].x - 25*this.WidthScale, 275*this.WidthScale, this.teamName1[0], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
            this.teamNameMove1[1] = this.add.text(this.team1[1].x - 25*this.WidthScale, 275*this.WidthScale, this.teamName1[1], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
            this.teamNameMove1[2] = this.add.text(this.team1[2].x - 25*this.WidthScale, 275*this.WidthScale, this.teamName1[2], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
    
            this.teamNameMove2[0] = this.add.text(this.team2[0].x - 25*this.WidthScale, 275*this.WidthScale, this.teamName2[0], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
            this.teamNameMove2[1] = this.add.text(this.team2[1].x - 25*this.WidthScale, 275*this.WidthScale, this.teamName2[1], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
            this.teamNameMove2[2] = this.add.text(this.team2[2].x - 25*this.WidthScale, 275*this.WidthScale, this.teamName2[2], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
    
    

            this.add.text(675*this.WidthScale, 256*this.WidthScale, "Press Start", { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setFontSize(50*this.WidthScale);



            for (var i=0; i<3; i++){
                this.nowPosition1[i] = this.team1[i].x;
                this.nowPosition2[i] = this.team2[i].x;
            }

            // this.team2[0].flipX = true;
            // this.team2[1].flipX = true;
            // this.team2[2].flipX = false;

            // this.team1[0].flipX = false;
            // this.team1[1].flipX = false;
            // this.team1[2].flipX = false;

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

        // this.team1[0] = this.physics.add.sprite(50*this.WidthScale, 175*this.HeightScale, 'slime1_1').setScale(0.4*this.WidthScale).play('slime1Move');

        // this.team1[1] = this.physics.add.sprite(60*this.WidthScale, 235*this.HeightScale, 'stone').setScale(0.4*this.WidthScale).play('stoneMove');
        // this.team1[2] = this.physics.add.sprite(70*this.WidthScale, 290*this.HeightScale, 'Sushi_1').setScale(0.4*this.WidthScale).play('SushiMove');

        // this.team1[3] = this.physics.add.sprite(80*this.WidthScale, 340*this.HeightScale, 'gummybear_1').setScale(0.4*this.WidthScale).play('gummybearMove');
        // this.team1[4] = this.physics.add.sprite(90*this.WidthScale, 400*this.HeightScale, 'pudding_1').setScale(0.4*this.WidthScale).play('puddingMove');
        // this.team1[5] = this.physics.add.sprite(100*this.WidthScale, 450*this.HeightScale, 'whale').setScale(0.4*this.WidthScale).play('whaleMove');
        for (var i=0; i<6; i++){
            if(this.runningImg[i] === "slime"){
                this.team1[i] = this.physics.add.sprite(50 + (10*i)*this.WidthScale, this.pos[i]*this.HeightScale, 'slime1_1').setScale(0.4*this.WidthScale).play('slime1Move');
            } else if (this.runningImg[i] === "stone"){
                this.team1[i] = this.physics.add.sprite(50 + (10*i)*this.WidthScale, this.pos[i]*this.HeightScale, 'stone').setScale(0.4*this.WidthScale).play('stoneMove');
            } else if (this.runningImg[i] === "sushi"){
                this.team1[i] = this.physics.add.sprite(50 + (10*i)*this.WidthScale, this.pos[i]*this.HeightScale, 'Sushi_1').setScale(0.4*this.WidthScale).play('SushiMove');
            } else if (this.runningImg[i] === "gummybear"){
                this.team1[i] = this.physics.add.sprite(50 + (10*i)*this.WidthScale, this.pos[i]*this.HeightScale, 'gummybear_1').setScale(0.4*this.WidthScale).play('gummybearMove');
            } else if (this.runningImg[i] === "pudding"){
                this.team1[i] = this.physics.add.sprite(50 + (10*i)*this.WidthScale, this.pos[i]*this.HeightScale, 'pudding_1').setScale(0.4*this.WidthScale).play('puddingMove');
            } else  if (this.runningImg[i] === "whale"){
                this.team1[i] = this.physics.add.sprite(50 + (10*i)*this.WidthScale, this.pos[i]*this.HeightScale, 'whale').setScale(0.4*this.WidthScale).play('whaleMove');
                this.team1[i].flipX = true;
            } else{
                this.team1[i] = this.physics.add.sprite(50 + (10*i)*this.WidthScale, this.pos[i]*this.HeightScale, 'whale').setScale(0.4*this.WidthScale).play('whaleMove');
                this.team1[i].setX(8000);
            }
        }


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

    setTeamName(team1, team2){
        for (var i=0; i<3; i++){
            this.teamName1[i] = team1[i];
            this.teamName2[i] = team2[i];
        }
    }

    setImg(team1, team2, imgArr){
        for (var i=0; i<team1.length; i++){
            this.team1Img[i] = imgArr[team1[i]];
        }

        for (var i=0; i<team2.length; i++){
            this.team2Img[i] = imgArr[team2[i]]
        }
    }

    setName(name){
        for (var i=0; i<6; i++){
            this.teamName1[i] = name[i];
        }
        this.players = name.length;
    }

    setRunningImg(name, imgArr){
        for (var i=0; i<name.length; i++){
            this.runningImg[i] = imgArr[name[i]];
        }
    }
    changeCategory(idx){
        this.gameCategory = idx;
    }

    update() {
        // if (this.gameCategory == 0){
        //     // for (var i=0; i<3; i++){
        //     //     this.teamNameMove1[i].setX(this.team1[i].x - 25*this.WidthScale);
        //     //     this.teamNameMove2[i].setX(this.team2[i].x - 25*this.WidthScale);
        //     // }
        // }
        // else if (this.gameCategory == 1){
        //     for (var i=0; i<6; i++){
        //         //this.teamNameMove1[i].setX(this.team1[i].x - 35*this.WidthScale);
        //         if (i >= this.players){
        //             this.team1[i].setX(8000);
        //         }
        //     }
        // }
    }

}

export default WaitingScene;
