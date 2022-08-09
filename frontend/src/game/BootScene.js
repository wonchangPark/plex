import {Scene} from 'phaser';
import Player from '../assets/test_player.png';
import Player2 from '../assets/chick.png';
import Rope from '../assets/rope.png';
import Ground from '../assets/platform.png';

import T1 from '../assets/Test1.png'
import T2 from '../assets/Test2.png'
import T3 from '../assets/Test3.png'

import BackGround from '../assets/Room1600.png'
import RunningRoom from '../assets/RunningRoom.png'
import DeskRight from '../assets/DeskRight.png'
import DeskLeft from '../assets/DeskLeft.png'


import Slime3_1 from '../assets/Slime_3/1.png'
import Slime3_2 from '../assets/Slime_3/2.png'
import Slime3_3 from '../assets/Slime_3/3.png'
import Slime3_4 from '../assets/Slime_3/4.png'
import Slime3_5 from '../assets/Slime_3/5.png'
import Slime3_6 from '../assets/Slime_3/6.png'
import Slime3_7 from '../assets/Slime_3/7.png'
import Slime3_8 from '../assets/Slime_3/8.png'
import Slime3_9 from '../assets/Slime_3/9.png'
import Slime3_10 from '../assets/Slime_3/10.png'
import Slime3_11 from '../assets/Slime_3/11.png'
import Slime3_12 from '../assets/Slime_3/12.png'
import Slime3_13 from '../assets/Slime_3/13.png'
import Slime3_14 from '../assets/Slime_3/14.png'
import Slime3_15 from '../assets/Slime_3/15.png'
import Slime3_16 from '../assets/Slime_3/16.png'

import Sushi_1 from '../assets/sushi/sushi (1).png'
import Sushi_2 from '../assets/sushi/sushi (2).png'
import Sushi_3 from '../assets/sushi/sushi (3).png'
import Sushi_4 from '../assets/sushi/sushi (4).png'
import Sushi_5 from '../assets/sushi/sushi (5).png'
import Sushi_6 from '../assets/sushi/sushi (6).png'
import Sushi_7 from '../assets/sushi/sushi (7).png'
import Sushi_8 from '../assets/sushi/sushi (8).png'
import Sushi_9 from '../assets/sushi/sushi (9).png'
import Sushi_10 from '../assets/sushi/sushi (10).png'
import Sushi_11 from '../assets/sushi/sushi (11).png'
import Sushi_12 from '../assets/sushi/sushi (12).png'
import Sushi_13 from '../assets/sushi/sushi (13).png'
import Sushi_14 from '../assets/sushi/sushi (14).png'
import Sushi_15 from '../assets/sushi/sushi (15).png'
import Sushi_16 from '../assets/sushi/sushi (16).png'

import gummybear_1 from '../assets/gummybear/gummybear (1).png'
import gummybear_2 from '../assets/gummybear/gummybear (2).png'
import gummybear_3 from '../assets/gummybear/gummybear (3).png'
import gummybear_4 from '../assets/gummybear/gummybear (4).png'
import gummybear_5 from '../assets/gummybear/gummybear (5).png'
import gummybear_6 from '../assets/gummybear/gummybear (6).png'
import gummybear_7 from '../assets/gummybear/gummybear (7).png'
import gummybear_8 from '../assets/gummybear/gummybear (8).png'
import gummybear_9 from '../assets/gummybear/gummybear (9).png'
import gummybear_10 from '../assets/gummybear/gummybear (10).png'
import gummybear_11 from '../assets/gummybear/gummybear (11).png'
import gummybear_12 from '../assets/gummybear/gummybear (12).png'
import gummybear_13 from '../assets/gummybear/gummybear (13).png'
import gummybear_14 from '../assets/gummybear/gummybear (14).png'
import gummybear_15 from '../assets/gummybear/gummybear (15).png'
import gummybear_16 from '../assets/gummybear/gummybear (16).png'

import pudding_1 from '../assets/pudding/pudding (1).png'
import pudding_2 from '../assets/pudding/pudding (2).png'
import pudding_3 from '../assets/pudding/pudding (3).png'
import pudding_4 from '../assets/pudding/pudding (4).png'
import pudding_5 from '../assets/pudding/pudding (5).png'
import pudding_6 from '../assets/pudding/pudding (6).png'
import pudding_7 from '../assets/pudding/pudding (7).png'
import pudding_8 from '../assets/pudding/pudding (8).png'
import pudding_9 from '../assets/pudding/pudding (9).png'
import pudding_10 from '../assets/pudding/pudding (10).png'
import pudding_11 from '../assets/pudding/pudding (11).png'
import pudding_12 from '../assets/pudding/pudding (12).png'
import pudding_13 from '../assets/pudding/pudding (13).png'
import pudding_14 from '../assets/pudding/pudding (14).png'
import pudding_15 from '../assets/pudding/pudding (15).png'
import pudding_16 from '../assets/pudding/pudding (16).png'

import slime1_1 from '../assets/slime1/slime1 (1).png'
import slime1_2 from '../assets/slime1/slime1 (2).png'
import slime1_3 from '../assets/slime1/slime1 (3).png'
import slime1_4 from '../assets/slime1/slime1 (4).png'
import slime1_5 from '../assets/slime1/slime1 (5).png'
import slime1_6 from '../assets/slime1/slime1 (6).png'
import slime1_7 from '../assets/slime1/slime1 (7).png'
import slime1_8 from '../assets/slime1/slime1 (8).png'
import slime1_9 from '../assets/slime1/slime1 (9).png'
import slime1_10 from '../assets/slime1/slime1 (10).png'
import slime1_11 from '../assets/slime1/slime1 (11).png'
import slime1_12 from '../assets/slime1/slime1 (12).png'
import slime1_13 from '../assets/slime1/slime1 (13).png'
import slime1_14 from '../assets/slime1/slime1 (14).png'
import slime1_15 from '../assets/slime1/slime1 (15).png'
import slime1_16 from '../assets/slime1/slime1 (16).png'



class BootScene extends Scene {


    constructor() {
        super({key : "bootScene"});
    }

    preload() {

        this.load.plugin('rexshakepositionplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexshakepositionplugin.min.js', true);

        
        this.load.rexImageURI('player', Player);
        this.load.rexImageURI('player2', Player2);
        this.load.rexImageURI('rope', Rope);
        this.load.rexImageURI('ground', Ground);


        this.load.rexImageURI('background', BackGround)
        this.load.rexImageURI('RunningRoom', RunningRoom)
        this.load.rexImageURI('DeskRight', DeskRight)
        this.load.rexImageURI('DeskLeft', DeskLeft)


        //TestPlayer(병아리)
        this.load.rexImageURI('test1', T1);
        this.load.rexImageURI('test2', T2)
        this.load.rexImageURI('test3', T3)

        //Slime3
        this.load.rexImageURI('Slime3_1', Slime3_1)
        this.load.rexImageURI('Slime3_2', Slime3_2)
        this.load.rexImageURI('Slime3_3', Slime3_3)
        this.load.rexImageURI('Slime3_4', Slime3_4)
        this.load.rexImageURI('Slime3_5', Slime3_5)
        this.load.rexImageURI('Slime3_6', Slime3_6)
        this.load.rexImageURI('Slime3_7', Slime3_7)
        this.load.rexImageURI('Slime3_8', Slime3_8)
        this.load.rexImageURI('Slime3_9', Slime3_9)
        this.load.rexImageURI('Slime3_10', Slime3_10)
        this.load.rexImageURI('Slime3_11', Slime3_11)
        this.load.rexImageURI('Slime3_12', Slime3_12)
        this.load.rexImageURI('Slime3_13', Slime3_13)
        this.load.rexImageURI('Slime3_14', Slime3_14)
        this.load.rexImageURI('Slime3_15', Slime3_15)
        this.load.rexImageURI('Slime3_16', Slime3_16)

        //sushi
        this.load.rexImageURI('Sushi_1', Sushi_1)
        this.load.rexImageURI('Sushi_2', Sushi_2)
        this.load.rexImageURI('Sushi_3', Sushi_3)
        this.load.rexImageURI('Sushi_4', Sushi_4)
        this.load.rexImageURI('Sushi_5', Sushi_5)
        this.load.rexImageURI('Sushi_6', Sushi_6)
        this.load.rexImageURI('Sushi_7', Sushi_7)
        this.load.rexImageURI('Sushi_8', Sushi_8)
        this.load.rexImageURI('Sushi_9', Sushi_9)
        this.load.rexImageURI('Sushi_10', Sushi_10)
        this.load.rexImageURI('Sushi_11', Sushi_11)
        this.load.rexImageURI('Sushi_12', Sushi_12)
        this.load.rexImageURI('Sushi_13', Sushi_13)
        this.load.rexImageURI('Sushi_14', Sushi_14)
        this.load.rexImageURI('Sushi_15', Sushi_15)
        this.load.rexImageURI('Sushi_16', Sushi_16)

        //gummybear
        this.load.rexImageURI('gummybear_1', gummybear_1)
        this.load.rexImageURI('gummybear_2', gummybear_2)
        this.load.rexImageURI('gummybear_3', gummybear_3)
        this.load.rexImageURI('gummybear_4', gummybear_4)
        this.load.rexImageURI('gummybear_5', gummybear_5)
        this.load.rexImageURI('gummybear_6', gummybear_6)
        this.load.rexImageURI('gummybear_7', gummybear_7)
        this.load.rexImageURI('gummybear_8', gummybear_8)
        this.load.rexImageURI('gummybear_9', gummybear_9)
        this.load.rexImageURI('gummybear_10', gummybear_10)
        this.load.rexImageURI('gummybear_11', gummybear_11)
        this.load.rexImageURI('gummybear_12', gummybear_12)
        this.load.rexImageURI('gummybear_13', gummybear_13)
        this.load.rexImageURI('gummybear_14', gummybear_14)
        this.load.rexImageURI('gummybear_15', gummybear_15)
        this.load.rexImageURI('gummybear_16', gummybear_16)

        //pudding
        this.load.rexImageURI('pudding_1', pudding_1)
        this.load.rexImageURI('pudding_2', pudding_2)
        this.load.rexImageURI('pudding_3', pudding_3)
        this.load.rexImageURI('pudding_4', pudding_4)
        this.load.rexImageURI('pudding_5', pudding_5)
        this.load.rexImageURI('pudding_6', pudding_6)
        this.load.rexImageURI('pudding_7', pudding_7)
        this.load.rexImageURI('pudding_8', pudding_8)
        this.load.rexImageURI('pudding_9', pudding_9)
        this.load.rexImageURI('pudding_10', pudding_10)
        this.load.rexImageURI('pudding_11', pudding_11)
        this.load.rexImageURI('pudding_12', pudding_12)
        this.load.rexImageURI('pudding_13', pudding_13)
        this.load.rexImageURI('pudding_14', pudding_14)
        this.load.rexImageURI('pudding_15', pudding_15)
        this.load.rexImageURI('pudding_16', pudding_16)

        //Slime1
        this.load.rexImageURI('slime1_1', slime1_1)
        this.load.rexImageURI('slime1_2', slime1_2)
        this.load.rexImageURI('slime1_3', slime1_3)
        this.load.rexImageURI('slime1_4', slime1_4)
        this.load.rexImageURI('slime1_5', slime1_5)
        this.load.rexImageURI('slime1_6', slime1_6)
        this.load.rexImageURI('slime1_7', slime1_7)
        this.load.rexImageURI('slime1_8', slime1_8)
        this.load.rexImageURI('slime1_9', slime1_9)
        this.load.rexImageURI('slime1_10', slime1_10)
        this.load.rexImageURI('slime1_11', slime1_11)
        this.load.rexImageURI('slime1_12', slime1_12)
        this.load.rexImageURI('slime1_13', slime1_13)
        this.load.rexImageURI('slime1_14', slime1_14)
        this.load.rexImageURI('slime1_15', slime1_15)
        this.load.rexImageURI('slime1_16', slime1_16)
        
        


        //this.textures.addBase64('player', Player);
        //this.textures.addBase64('player2', Player2);        
    }

    create() {

        this.anims.create({
            key: 'slime1Move',
            frames: [
                { key: 'slime1_1' },
                { key: 'slime1_2' },
                { key: 'slime1_3' },
                { key: 'slime1_4' },
                { key: 'slime1_5' },
                { key: 'slime1_6' },
                { key: 'slime1_7' },
                { key: 'slime1_8' },
                { key: 'slime1_9' },
                { key: 'slime1_10' },
                { key: 'slime1_11' },
                { key: 'slime1_12' },
                { key: 'slime1_13' },
                { key: 'slime1_14' },
                { key: 'slime1_15' },
                { key: 'slime1_16', duration: 50 }
            ],
            frameRate: 16,
            repeat: -1
        });

        
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

        this.anims.create({
            key: 'Slime3Move',
            frames: [
                { key: 'Slime3_1' },
                { key: 'Slime3_2' },
                { key: 'Slime3_3' },
                { key: 'Slime3_4' },
                { key: 'Slime3_5' },
                { key: 'Slime3_6' },
                { key: 'Slime3_7' },
                { key: 'Slime3_8' },
                { key: 'Slime3_9' },
                { key: 'Slime3_10' },
                { key: 'Slime3_11' },
                { key: 'Slime3_12' },
                { key: 'Slime3_13' },
                { key: 'Slime3_14' },
                { key: 'Slime3_15' },
                { key: 'Slime3_16', duration: 50 }
            ],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'SushiMove',
            frames: [
                { key: 'Sushi_1' },
                { key: 'Sushi_2' },
                { key: 'Sushi_3' },
                { key: 'Sushi_4' },
                { key: 'Sushi_5' },
                { key: 'Sushi_6' },
                { key: 'Sushi_7' },
                { key: 'Sushi_8' },
                { key: 'Sushi_9' },
                { key: 'Sushi_10' },
                { key: 'Sushi_11' },
                { key: 'Sushi_12' },
                { key: 'Sushi_13' },
                { key: 'Sushi_14' },
                { key: 'Sushi_15' },
                { key: 'Sushi_16', duration: 50 }
            ],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'gummybearMove',
            frames: [
                { key: 'gummybear_1' },
                { key: 'gummybear_2' },
                { key: 'gummybear_3' },
                { key: 'gummybear_4' },
                { key: 'gummybear_5' },
                { key: 'gummybear_6' },
                { key: 'gummybear_7' },
                { key: 'gummybear_8' },
                { key: 'gummybear_9' },
                { key: 'gummybear_10' },
                { key: 'gummybear_11' },
                { key: 'gummybear_12' },
                { key: 'gummybear_13' },
                { key: 'gummybear_14' },
                { key: 'gummybear_15' },
                { key: 'gummybear_16', duration: 50 }
            ],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'puddingMove',
            frames: [
                { key: 'pudding_1' },
                { key: 'pudding_2' },
                { key: 'pudding_3' },
                { key: 'pudding_4' },
                { key: 'pudding_5' },
                { key: 'pudding_6' },
                { key: 'pudding_7' },
                { key: 'pudding_8' },
                { key: 'pudding_9' },
                { key: 'pudding_10' },
                { key: 'pudding_11' },
                { key: 'pudding_12' },
                { key: 'pudding_13' },
                { key: 'pudding_14' },
                { key: 'pudding_15' },
                { key: 'pudding_16', duration: 50 }
            ],
            frameRate: 20,
            repeat: -1
        });
        

        //this.scene.start("ropeFightScene");
        //this.scene.start("RunningScene");
    }
    StartScene(idx) {  
        this.scene.start("ropeFightScene");
    }
}

export default BootScene;