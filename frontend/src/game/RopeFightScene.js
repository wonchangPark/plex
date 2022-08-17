import { Game, Scene } from 'phaser';
import Phaser from 'phaser';
//import RoomView from '../views/RoomView.vue';
//import testPlayer from require('../assets/test_player.png');


class RopeFightScene extends Scene {
    constructor() {
        super({key : "ropeFightScene"});
    }

    team1 = [];
    team2 = [];
    rope = [];
    grounds = undefined;
    nowPosition1 = []
    nowPosition2 = []
    team1Shake = false;
    team2Shake = false;
    timeOut = false;

    teamName1 = ["", "", ""];
    teamName2 = ["","",""];
    teamNameMove1 = []
    teamNameMove2 = []
    shakePosition1 = []
    shakePosition2 = []

    startRopePosition = 0;
    leftPosition = 0;
    RightPosition = 0;

    team1Img = ["not", "not", "not"];
    team2Img = ["not", "not", "not"];

    //this.$refs.game-container.clientHeight
    //spriteScale = Game.world.width / 1600;


    WidthScale = 1;
    HeightScale = 1;

    leftTime = 60;
    timerText;
    //timer;
    gameActive = false;
    create() {


        var outEvent = new Phaser.Events.EventEmitter();
        var inEvent = new Phaser.Events.EventEmitter();
        var goLeftEvent = new Phaser.Events.EventEmitter();
        var goRightEvent = new Phaser.Events.EventEmitter();

        //this.timer = this.time.addEvent({delay: 1000, callback: this.onTimerEvent, callbackScope: this, loop: true});
        

        // 화면 비율
        this.WidthScale = this.sys.game.canvas.width / 1600;
        this.HeightScale = this.sys.game.canvas.height / 512;


        // 배경, 땅
        this.add.image(800*this.WidthScale , 256*this.WidthScale, 'background').setScale(this.WidthScale);
        this.RightDesk = this.add.image(800*this.WidthScale, 260*this.WidthScale, 'DeskRight').setScale(this.WidthScale);
        this.LeftDesk = this.add.image(800*this.WidthScale, 260*this.WidthScale, 'DeskLeft').setScale(this.WidthScale);


        this.timerText = this.add.text(725*this.WidthScale, 50*this.WidthScale, "60", { fontFamily: 'DungGeunMo', align: 'center', stroke: '#000000', strokeThickness: 3 }).setColor('#660000').setScale(5*this.WidthScale);


        outEvent.on('Out', this.outHandler, this);
        inEvent.on('In', this.inHandler, this); 
        goLeftEvent.on('Left', this.goLeftHandler, this);
        goRightEvent.on('Right', this.goRightHandler, this);
        


        // rope
        this.rope = this.physics.add.sprite(800*this.WidthScale, 200*this.WidthScale, 'rope').setScale(this.WidthScale);
        this.rope.setImmovable(true);
        this.rope.body.allowGravity = false;
        this.ropePosition = this.rope.x;
        this.startRopePosition = this.rope.x;
        this.leftPosition = 0;
        this.RightPosition = 0;

        //adding sprites with physics
        // this.team1[0] = this.physics.add.sprite(250*this.WidthScale, 200*this.WidthScale, 'slime1_1').setScale(this.WidthScale).play('slime1Move');
        // this.team1[1] = this.physics.add.sprite(400*this.WidthScale, 200*this.WidthScale, 'stone').setScale(this.WidthScale).play('stoneMove');
        // this.team1[2] = this.physics.add.sprite(550*this.WidthScale, 200*this.WidthScale, 'Sushi_1').setScale(this.WidthScale).play('SushiMove');

        // this.team2[0] = this.physics.add.sprite(1050*this.WidthScale, 200*this.WidthScale, 'gummybear_1').setScale(this.WidthScale).play('gummybearMove');
        // this.team2[1] = this.physics.add.sprite(1200*this.WidthScale, 200*this.WidthScale, 'pudding_1').setScale(this.WidthScale).play('puddingMove');
        // this.team2[2] = this.physics.add.sprite(1350*this.WidthScale, 200*this.WidthScale, 'whale').setScale(this.WidthScale).play('whaleMove');

        // (700 - (150 * (3-i)))
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
            } else if (this.team2Img === "whale"){
                this.team2[i] = this.physics.add.sprite((900 +  (150 * (i+1)))*this.WidthScale, 200*this.WidthScale, 'whale').setScale(this.WidthScale).play('whaleMove');
                this.team2[i].flipX = false;
            } else{
                this.team2[i] = this.physics.add.sprite((900 +  (150 * (i+1)))*this.WidthScale, 200*this.WidthScale, 'whale').setScale(this.WidthScale).play('whaleMove');
                this.team2[i].setX(8000);
            }
        }


        // team name for moving
        this.teamNameMove1[0] = this.add.text(125*this.WidthScale, 275*this.WidthScale, this.teamName1[0], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
        this.teamNameMove1[1] = this.add.text(275*this.WidthScale, 275*this.WidthScale, this.teamName1[1], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
        this.teamNameMove1[2] = this.add.text(425*this.WidthScale, 275*this.WidthScale, this.teamName1[2], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);

        this.teamNameMove2[0] = this.add.text(1025*this.WidthScale, 275*this.WidthScale, this.teamName2[0], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
        this.teamNameMove2[1] = this.add.text(1175*this.WidthScale, 275*this.WidthScale, this.teamName2[1], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);
        this.teamNameMove2[2] = this.add.text(1325*this.WidthScale, 275*this.WidthScale, this.teamName2[2], { fontFamily: 'DungGeunMo' }).setColor('#FFFFFF').setScale(1.2*this.WidthScale);


        // shake desk and sprite
        this.shakeRightGround = this.plugins.get('rexshakepositionplugin').add(this.RightDesk, {
            duration: 10000,
            // magnitude: 50,
            mode: 'effect'
        });

        this.shakeLeftGround = this.plugins.get('rexshakepositionplugin').add(this.LeftDesk, {
            duration: 10000,
            // magnitude: 50,
            mode: 'effect'
        });


        for (var i=0; i<3; i++){
            this.shakePosition1[i] = this.plugins.get('rexshakepositionplugin').add(this.team1[i], {
                duration: 10000,
                // magnitude: 50,
                mode: 'effect'
            });
            this.shakePosition2[i] = this.plugins.get('rexshakepositionplugin').add(this.team2[i], {
                duration: 10000,
                // magnitude: 50,
                mode: 'effect'
            });
        }

        // for update
        for (var i=0; i<3; i++){
            this.nowPosition1[i] = this.team1[i].x;
            this.nowPosition2[i] = this.team2[i].x;
        }

        // this.team2[0].flipX = true;
        // this.team2[1].flipX = true;
        // this.team2[2].flipX = true;

        // this.team1[0].flipX = false;
        // this.team1[1].flipX = false;
        // this.team1[2].flipX = false;


        // no gravity
        this.rope.setImmovable(true);
        this.rope.body.allowGravity = false;
        for (var i = 0 ; i < this.team1.length ; i++){
            this.team1[i].setImmovable(true)
            this.team1[i].body.allowGravity = false;
            this.team2[i].setImmovable(true)
            this.team2[i].body.allowGravity = false;
        }
    }

    outHandler(idx) {   //delete sprite of disconnected player
        if (idx >= 3)
            this.team2[idx - 3].alpha = 0;
        else
            this.team1[idx].alpha = 0;
    }

    inHandler(idx) {    //add sprite of new player
        if (idx >= 3)
            this.team2[idx - 3].alpha = 1;
        else
            this.team1[idx].alpha = 1;
    }

    goLeftHandler(idx) {


        this.leftPosition = this.leftPosition + 15;
        if (this.RightPosition > 0){
            this.RightPosition = this.RightPosition - 15;
        }        

        for (var i = 0 ; i < this.team1.length ; i++){   //move players to left
            this.team1[i].setVelocityX(-20);
            this.team2[i].setVelocityX(-20);
        }
        this.rope.setVelocityX(-20);


        // shake and stop
        if (idx == 1){
            for (var i=0; i<3; i++){
                this.shakePosition2[i].shake();
            }
            this.shakeRightGround.shake();
            this.team2Shake = true;
        } else{
            if (this.team2Shake){
                for (var i=0; i<3; i++){
                    this.shakePosition2[i].stop();
                    this.shakePosition1[i].stop();
                }
                
                this.shakeRightGround.stop();
                this.shakeLeftGround.stop();
                this.team2Shake = false;
            }
        }



    }

    goRightHandler(idx2) {


        this.RightPosition = this.RightPosition + 15;
        if (this.leftPosition > 0){
            this.leftPosition = this.leftPosition - 15;
        }        


        for (var i = 0 ; i < this.team1.length ; i++){   //move players to left
            this.team1[i].setVelocityX(20);
            this.team2[i].setVelocityX(20);
        }
        this.rope.setVelocityX(20);


        if (idx2 == 1){
            
            for (var i=0; i<3; i++){
                this.shakePosition1[i].stop();
            }
            this.shakeLeftGround.shake();
            this.team1Shake = true;
        }else{
            if (this.team1Shake){
                for (var i=0; i<3; i++){
                    this.shakePosition2[i].stop();
                    this.shakePosition1[i].stop();
                }
                this.shakeRightGround.stop();
                this.shakeLeftGround.stop();
                this.team1Shake = false;

            }
        }
    }
    LeftWin(){

        // Desk remove
        this.shakeRightGround.stop();
        this.RightDesk.setX(6000);
        //this.timer.remove(false);

        // start gravity
        for (var i=0; i<3; i++){
            this.team2[i].body.allowGravity = true;
            this.teamNameMove2[i].setX(6000);
        }
    }
    RightWin(){
        this.shakeLeftGround.stop();
        this.LeftDesk.setX(6000);
        //this.timer.remove(false);

        for (var i=0; i<3; i++){
            this.team1[i].body.allowGravity = true;
            this.teamNameMove1[i].setX(6000);
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

    update() {

        
        for (var i=0; i<3; i++){
            this.teamNameMove1[i].setX(this.team1[i].x - 25*this.WidthScale);
            this.teamNameMove2[i].setX(this.team2[i].x - 25*this.WidthScale);
        }

        //로프 및 스프라이트가 10이상 움직였으면 stop
        if (this.rope.x >= this.ropePosition + 10 || this.rope.x <= this.ropePosition - 10){
            this.rope.setVelocityX(0);
            this.ropePosition = this.rope.x;
        }
        for (var i=0; i<3; i++){
            if (this.team1[i].x >= this.nowPosition1[i] + 10 || this.team1[i].x <= this.nowPosition1[i] - 10){
                this.team1[i].setVelocityX(0);
                this.nowPosition1[i] = this.team1[i].x;
            }
            if (this.team2[i].x >= this.nowPosition2[i] + 10 || this.team2[i].x <= this.nowPosition2[i] - 10){
                this.team2[i].setVelocityX(0);
                this.nowPosition2[i] = this.team2[i].x;
            }
        }

        // if (this.rope.x <= this.startRopePosition - this.leftPosition * this.WidthScale || this.rope.x >= this.startRopePosition + this.RightPosition * this.WidthScale){
        //     this.rope.setVelocityX(0);
        //     for (var i=0; i<3; i++){
        //         this.team1[i].setVelocityX(0);
        //         this.team2[i].setVelocityX(0);
        //     }
        // }

        
        /*if (this.leftTime >= 0)
            this.timerText.setText(this.leftTime);
        else {
            if (this.gameActive)
                this.timerText.setText("연장전!");
            else
                this.timerText.setText("");
        }*/

    }

    onTimerEvent() {
        this.leftTime--;
        if (this.leftTime >= 0)
            this.timerText.setText(this.leftTime);
        else {
            if (this.gameActive)
                this.timerText.setText("연장전!");
            else
                this.timerText.setText("");
        }
        //console.log(this.leftTime);
    }

}

export default RopeFightScene;
