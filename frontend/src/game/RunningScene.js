import { Scene } from 'phaser';
import Phaser from 'phaser';
//import RoomView from '../views/RoomView.vue';
//import testPlayer from require('../assets/test_player.png');


class RunningScene extends Scene {
    constructor() {
        super({key : "RunningScene"});
    }

    team1 = [];
    team2 = [];
    rope = [];
    goRightStart = [];
    nowPosition = [];
    grounds = undefined;



    create() {

        var outEvent = new Phaser.Events.EventEmitter();
        var inEvent = new Phaser.Events.EventEmitter();
        var goLeftEvent = new Phaser.Events.EventEmitter();
        var goRightEvent = new Phaser.Events.EventEmitter();

        this.WidthScale = this.sys.game.canvas.width / 1600;
        this.HeightScale = this.sys.game.canvas.height / 512;

        this.add.image(800, 256, 'RunningRoom');
        this.grounds = this.physics.add.staticGroup();




        this.LeftGround.setImmovable(true);
        this.LeftGround.body.allowGravity = false;

        this.RightGround.setImmovable(true);
        this.RightGround.body.allowGravity = false;



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


       // this.rope = this.add.sprite(800, 200, 'rope');


        this.team1[0] = this.add.sprite(50, 175, 'slime1_1').setScale(0.4).play('slime1Move');

        //this.team1[0] = this.physics.add.sprite(100, 200, 'player');    //adding sprites with physics
        this.team1[1] = this.add.sprite(50, 235, 'Slime3_1').setScale(0.8).play('Slime3Move');
        this.team1[2] = this.add.sprite(50, 290, 'Sushi_1').setScale(0.4).play('SushiMove');
        //this.team2[0] = this.physics.add.sprite(500, 200, 'player3');

        this.team1[3] = this.add.sprite(50, 340, 'gummybear_1').setScale(0.4).play('gummybearMove');
        this.team1[4] = this.add.sprite(50, 400, 'pudding_1').setScale(0.4).play('puddingMove');
        this.team1[5] = this.add.sprite(50, 450, 'test1').setScale(0.8).play('move');



        this.team1[0].alpha = 1; //0 is overall transparent
        /*this.textures.once('addtexture', function () {
            this.add.sprite(300, 100, 'player');
            this.add.sprite(100, 200, 'player');
            this.add.sprite(100, 300, 'player2');
        }, this);*/

        // this.physics.add.collider(this.team1, this.LeftGround);
        // this.physics.add.collider(this.team2, this.RightGround);

        this.grounds.refresh(); //refresh to sync elements of groups

        // for (var i = 0 ; i < this.team1.length ; i++)
        //     this.physics.add.collider(this.team1[i], this.grounds);
        // for (var j = 0 ; j < this.team1.length ; j++)
        //     this.physics.add.collider(this.team2[j], this.grounds);
        for (var i=0; i<6; i++){
            this.goRightStart[i] = false;
            this.nowPosition[i] = this.team1[i].x;
        }
    }


    GoRight(idx){
        this.goRightStart[idx] = true;
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

    goLeftHandler() {
        /*for (var i = 0 ; i < this.team1.length ; i++) //version of non-physics sprite
            this.team1[i].x -= 10;
        for (var j = 0 ; j < this.team2.length ; j++)
            this.team2[j].x -= 10;
        for (var k = 0 ; k < this.rope.length ; k++)
            this.rope[k].x -= 10;*/
        for (var i = 0 ; i < this.team1.length ; i++)   //move players to left
            this.team1[i].setX(this.team1[i].x - 10);
        for (var j = 0 ; j < this.team2.length ; j++)
            this.team2[j].setX(this.team2[j].x - 10);
        this.rope.x -= 10;
    }
    

    goRightHandler() {
        /*for (var i = 0 ; i < this.team1.length ; i++) //version of non-physics sprite
            this.team1[i].x += 10;
        for (var j = 0 ; j < this.team2.length ; j++)
            this.team2[j].x += 10;
        for (var k = 0 ; k < this.rope.length ; k++)
            this.rope[k].x += 10;*/
        for (var i = 0 ; i < this.team1.length ; i++)   //move players to right
            this.team1[i].setX(this.team1[i].x + 10);
        for (var j = 0 ; j < this.team2.length ; j++)
            this.team2[j].setX(this.team2[j].x + 10);
        this.rope.x += 10;
    }
    LeftWin(){

        this.RightGround.setX(2500);
        this.RightDesk.setX(2500);
    }
    RightWin(){

        this.LeftGround.setX(2500);
        this.LeftDesk.setX(2500);

    }

    update() {

        for (var i=0; i<6; i++){
            if (this.goRightStart[i]){
                this.team1[i].setX(this.team1[i].x + 5);
            }
            if (this.team1[i].x >= this.nowPosition[i] + 50){
                this.goRightStart[i] = false;
                this.nowPosition[i] = this.team1[i].x;
            }
        }
    }

}

export default RunningScene;
