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

    create() {

        var outEvent = new Phaser.Events.EventEmitter();
        var inEvent = new Phaser.Events.EventEmitter();

        outEvent.on('Out', this.outHandler, this);
        inEvent.on('In', this.inHandler, this);
        
        this.team1[0] = this.add.sprite(100, 200, 'player');
        this.team1[1] = this.add.sprite(200, 200, 'player');
        this.team1[2] = this.add.sprite(300, 200, 'player');
        this.team2[0] = this.add.sprite(500, 200, 'player2');
        this.team2[1] = this.add.sprite(600, 200, 'player2');
        this.team2[2] = this.add.sprite(700, 200, 'player2');

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
    }

    outHandler(idx) {
        if (idx >= 3)
            this.team2[idx - 3].alpha = 0;
        else
            this.team1[idx].alpha = 0;
    }

    inHandler(idx) {
        if (idx >= 3)
            this.team2[idx - 3].alpha = 1;
        else
            this.team1[idx].alpha = 1;
    }

    update() {

    }
}

export default RopeFightScene;