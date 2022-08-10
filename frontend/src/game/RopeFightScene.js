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


    //this.$refs.game-container.clientHeight
    //spriteScale = Game.world.width / 1600;


    WidthScale = 1;
    HeightScale = 1;

    leftTime = 10;
    timerText;
    timer;

    create() {


        var outEvent = new Phaser.Events.EventEmitter();
        var inEvent = new Phaser.Events.EventEmitter();
        var goLeftEvent = new Phaser.Events.EventEmitter();
        var goRightEvent = new Phaser.Events.EventEmitter();

        this.timer = this.time.addEvent({delay: 1000, callback: this.onTimerEvent, callbackScope: this, loop: true});
        

        // this.LeftGround = this.physics.add.image(300, 300, 'ground')
        // this.RightGround = this.physics.add.image(1300, 300, 'ground')


        this.WidthScale = this.sys.game.canvas.width / 1600;
        this.HeightScale = this.sys.game.canvas.height / 512;

        this.add.image(800*this.WidthScale , 256*this.WidthScale, 'background').setScale(this.WidthScale);
        
        // this.grounds = this.physics.add.staticGroup();




        // this.LeftGround.setImmovable(true);
        // this.LeftGround.body.allowGravity = false;

        // this.RightGround.setImmovable(true);
        // this.RightGround.body.allowGravity = false;

        this.RightDesk = this.add.image(800*this.WidthScale, 260*this.WidthScale, 'DeskRight').setScale(this.WidthScale);
        this.LeftDesk = this.add.image(800*this.WidthScale, 260*this.WidthScale, 'DeskLeft').setScale(this.WidthScale);

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

        this.timerText = this.add.text(725*this.WidthScale, 50*this.WidthScale, "10", { fontFamily: 'DungGeunMo', align: 'center' }).setColor('#660000').setScale(5*this.WidthScale);

    //    this.LeftGround = this.grounds.create(300, 305, 'ground');
    //    this.RightGround = this.grounds.create(1300, 305, 'ground');


        outEvent.on('Out', this.outHandler, this);
        inEvent.on('In', this.inHandler, this); 
        goLeftEvent.on('Left', this.goLeftHandler, this);
        goRightEvent.on('Right', this.goRightHandler, this);
        
        /*this.team1[0] = this.add.sprite(100, 200, 'player');  //version of non-physics sprites
        this.team1[1] = this.add.sprite(200, 200, 'player');
        this.team1[2] = this.add.sprite(300, 200, 'player');
        this.team2[0] = this.add.sprite(500, 200, 'player2');
        this.team2[1] = this.add.sprite(600, 200, 'player2');
        this.team2[2] = this.add.sprite(700, 200, 'player2');
        this.rope[0] = this.add.sprite(400, 200, 'rope');
        this.rope[1] = this.add.sprite(144, 200, 'rope');
        this.rope[2] = this.add.sprite(656, 200, 'rope');*/


        this.rope = this.physics.add.sprite(800*this.WidthScale, 200*this.WidthScale, 'rope').setScale(this.WidthScale);
        this.rope.setImmovable(true);
        this.rope.body.allowGravity = false;

        this.ropePosition = this.rope.x;

        this.team1[0] = this.physics.add.sprite(150*this.WidthScale, 200*this.WidthScale, 'slime1_1').setScale(this.WidthScale).play('slime1Move');

        //this.team1[0] = this.physics.add.sprite(100, 200, 'player');    //adding sprites with physics
        this.team1[1] = this.physics.add.sprite(300*this.WidthScale, 200*this.WidthScale, 'stone').setScale(this.WidthScale).play('stoneMove');
        this.team1[2] = this.physics.add.sprite(450*this.WidthScale, 200*this.WidthScale, 'Sushi_1').setScale(this.WidthScale).play('SushiMove');
        //this.team2[0] = this.physics.add.sprite(500, 200, 'player3');

        this.team2[0] = this.physics.add.sprite(1050*this.WidthScale, 200*this.WidthScale, 'gummybear_1').setScale(this.WidthScale).play('gummybearMove');
        this.team2[1] = this.physics.add.sprite(1200*this.WidthScale, 200*this.WidthScale, 'pudding_1').setScale(this.WidthScale).play('puddingMove');
        this.team2[2] = this.physics.add.sprite(1350*this.WidthScale, 200*this.WidthScale, 'whale').setScale(this.WidthScale).play('whaleMove');

        this.shakePosition1_0 = this.plugins.get('rexshakepositionplugin').add(this.team1[0], {
            duration: 10000,
            // magnitude: 50,
            mode: 'effect'
        });1
        this.shakePosition1_1 = this.plugins.get('rexshakepositionplugin').add(this.team1[1], {
            duration: 10000,
            // magnitude: 50,
            mode: 'effect'
        });
        this.shakePosition1_2 = this.plugins.get('rexshakepositionplugin').add(this.team1[2], {
            duration: 10000,
            // magnitude: 50,
            mode: 'effect'
        });
        this.shakePosition2_0 = this.plugins.get('rexshakepositionplugin').add(this.team2[0], {
            duration: 10000,
            // magnitude: 50,
            mode: 'effect'
        });
        this.shakePosition2_1 = this.plugins.get('rexshakepositionplugin').add(this.team2[1], {
            duration: 10000,
            // magnitude: 50,
            mode: 'effect'
        });
        this.shakePosition2_2 = this.plugins.get('rexshakepositionplugin').add(this.team2[2], {
            duration: 10000,
            // magnitude: 50,
            mode: 'effect'
        });

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

        //this.team1[0].alpha = 1; //0 is overall transparent
        /*this.textures.once('addtexture', function () {
            this.add.sprite(300, 100, 'player');
            this.add.sprite(100, 200, 'player');
            this.add.sprite(100, 300, 'player2');
        }, this);*/

        // this.physics.add.collider(this.team1, this.LeftGround);
        // this.physics.add.collider(this.team2, this.RightGround);

        // this.grounds.refresh(); //refresh to sync elements of groups

        // for (var i = 0 ; i < this.team1.length ; i++)
        //     this.physics.add.collider(this.team1[i], this.grounds);
        // for (var j = 0 ; j < this.team1.length ; j++)
        //     this.physics.add.collider(this.team2[j], this.grounds);
        this.rope.setImmovable(true);
        this.rope.body.allowGravity = false;

    
        // for (var i = 0 ; i < this.team1.length ; i++)
        //     this.physics.add.collider(this.team1[i], this.grounds);
        // for (var j = 0 ; j < this.team1.length ; j++)
        //     this.physics.add.collider(this.team2[j], this.grounds);
            
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
        /*for (var i = 0 ; i < this.team1.length ; i++) //version of non-physics sprite
            this.team1[i].x -= 10;
        for (var j = 0 ; j < this.team2.length ; j++)
            this.team2[j].x -= 10;
        for (var k = 0 ; k < this.rope.length ; k++)
            this.rope[k].x -= 10;*/
        // for (var i = 0 ; i < this.team1.length ; i++)   //move players to left
        //     this.team1[i].setX(this.team1[i].x - 10);
        // for (var j = 0 ; j < this.team2.length ; j++)
        //     this.team2[j].setX(this.team2[j].x - 10);
        // this.rope.x -= 10;
        // this.shakePosition1.shake();
        // this.shakePosition.shake();

        for (var i = 0 ; i < this.team1.length ; i++)   //move players to left
            this.team1[i].setVelocityX(-20);
        for (var j = 0 ; j < this.team2.length ; j++)
            this.team2[j].setVelocityX(-20);
        this.rope.setVelocityX(-20);


        if (idx == 1){
            this.shakePosition2_0.shake();
            this.shakePosition2_1.shake();
            this.shakePosition2_2.shake();
            this.shakeRightGround.shake();
            this.team2Shake = true;
        } else{
            if (this.team2Shake){
                this.shakePosition2_0.stop();
                this.shakePosition2_1.stop();
                this.shakePosition2_2.stop();
                this.shakeRightGround.stop();
                this.shakePosition1_0.stop();
                this.shakePosition1_1.stop();
                this.shakePosition1_2.stop();
                this.shakeLeftGround.stop();
                this.team2Shake = false;
            }
        }



    }

    goRightHandler(idx2) {
        /*for (var i = 0 ; i < this.team1.length ; i++) //version of non-physics sprite
            this.team1[i].x += 10;
        for (var j = 0 ; j < this.team2.length ; j++)
            this.team2[j].x += 10;
        for (var k = 0 ; k < this.rope.length ; k++)
            this.rope[k].x += 10;*/
        // for (var i = 0 ; i < this.team1.length ; i++)   //move players to right
        //     this.team1[i].setX(this.team1[i].x + 10);
        // for (var j = 0 ; j < this.team2.length ; j++)
        //     this.team2[j].setX(this.team2[j].x + 10);
        // this.rope.x += 10;

        for (var i = 0 ; i < this.team1.length ; i++)   //move players to right
        this.team1[i].setVelocityX(20);
        for (var j = 0 ; j < this.team2.length ; j++)
            this.team2[j].setVelocityX(20);
        this.rope.setVelocityX(20);


        if (idx2 == 1){
            this.shakePosition1_0.shake();
            this.shakePosition1_1.shake();
            this.shakePosition1_2.shake();
            this.shakeLeftGround.shake();
            this.team1Shake = true;
        }else{
            if (this.team1Shake){
                this.shakePosition2_0.stop();
                this.shakePosition2_1.stop();
                this.shakePosition2_2.stop();
                this.shakeRightGround.stop();
                this.shakePosition1_0.stop();
                this.shakePosition1_1.stop();
                this.shakePosition1_2.stop();
                this.shakeLeftGround.stop();
                this.team1Shake = false;

            }
        }
    }
    LeftWin(){
        this.shakeRightGround.stop();
        // this.RightGround.setX(2500);
        this.RightDesk.setX(6000);
        this.timer.remove(false);

        for (var i=0; i<3; i++)
            this.team2[i].body.allowGravity = true;
    }
    RightWin(){
        this.shakeLeftGround.stop();
        // this.LeftGround.setX(2500);
        this.LeftDesk.setX(6000);
        this.timer.remove(false);

        for (var i=0; i<3; i++)
            this.team1[i].body.allowGravity = true;

    }

    update() {

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
        
        if (this.leftTime >= 0)
            this.timerText.setText(this.leftTime);
        else
            this.timerText.setText("연장전!");
    }

    onTimerEvent() {
        this.leftTime--;
        //console.log(this.leftTime);
    }

}

export default RopeFightScene;
