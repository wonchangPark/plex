import { Scene } from 'phaser';
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



    create() {

        var outEvent = new Phaser.Events.EventEmitter();
        var inEvent = new Phaser.Events.EventEmitter();
        var goLeftEvent = new Phaser.Events.EventEmitter();
        var goRightEvent = new Phaser.Events.EventEmitter();

        this.LeftGround = this.physics.add.image(300, 300, 'ground')
        this.RightGround = this.physics.add.image(1300, 300, 'ground')

        this.add.image(800, 260, 'background');
        this.grounds = this.physics.add.staticGroup();




        this.LeftGround.setImmovable(true);
        this.LeftGround.body.allowGravity = false;

        this.RightGround.setImmovable(true);
        this.RightGround.body.allowGravity = false;

        this.RightDesk = this.add.image(800, 260, 'DeskRight');
        this.LeftDesk = this.add.image(800, 260, 'DeskLeft');


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


        this.anims.create({
            key: 'SlimeMove',
            frames: [
                { key: 'Slime1' },
                { key: 'Slime2' },
                { key: 'Slime3' },
                { key: 'Slime4' },
                { key: 'Slime5' },
                { key: 'Slime6' },
                { key: 'Slime7' },
                { key: 'Slime8', duration: 50 }
            ],
            frameRate: 12,
            repeat: -1
        });

        this.team1[0] = this.physics.add.sprite(100, 200, 'Slime').setScale(1.5).play('SlimeMove');

        //this.team1[0] = this.physics.add.sprite(100, 200, 'player');    //adding sprites with physics
        this.team1[1] = this.physics.add.sprite(300, 200, 'Slime').setScale(1.5).play('SlimeMove');
        this.team1[2] = this.physics.add.sprite(500, 200, 'Slime').setScale(1.5).play('SlimeMove');
        //this.team2[0] = this.physics.add.sprite(500, 200, 'player3');

        this.anims.create({
            key: 'move',
            frames: [
                { key: 'test1' },
                { key: 'test2' },
                { key: 'test3', duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.team2[0] = this.physics.add.sprite(1000, 200, 'test1').play('move');
        this.team2[1] = this.physics.add.sprite(1200, 200, 'test1').play('move');
        this.team2[2] = this.physics.add.sprite(1400, 200, 'test1').play('move');


        this.rope = this.add.sprite(800, 200, 'rope');

        this.team2[0].flipX = true;
        this.team2[1].flipX = true;
        this.team2[2].flipX = true;

        this.team1[0].flipX = false;
        this.team1[1].flipX = false;
        this.team1[2].flipX = false;

        this.team1[0].alpha = 1; //0 is overall transparent
        /*this.textures.once('addtexture', function () {
            this.add.sprite(300, 100, 'player');
            this.add.sprite(100, 200, 'player');
            this.add.sprite(100, 300, 'player2');
        }, this);*/

        this.physics.add.collider(this.team1, this.LeftGround);
        this.physics.add.collider(this.team2, this.RightGround);

        this.grounds.refresh(); //refresh to sync elements of groups

        for (var i = 0 ; i < this.team1.length ; i++)
            this.physics.add.collider(this.team1[i], this.grounds);
        for (var j = 0 ; j < this.team1.length ; j++)
            this.physics.add.collider(this.team2[j], this.grounds);
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

    }

}

export default RopeFightScene;
