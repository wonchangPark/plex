import {Scene} from 'phaser';
import Player from '../assets/test_player.png';
import Player2 from '../assets/chick.png';
import Rope from '../assets/rope.png';
import Ground from '../assets/platform.png';

import T1 from '../assets/Test1.png'
import T2 from '../assets/Test2.png'
import T3 from '../assets/Test3.png'

import BackGround from '../assets/Room1600.png'
import DeskRight from '../assets/DeskRight.png'
import DeskLeft from '../assets/DeskLeft.png'


import Slime1 from '../assets/Slime/Slime1.png'
import Slime2 from '../assets/Slime/Slime2.png'
import Slime3 from '../assets/Slime/Slime3.png'
import Slime4 from '../assets/Slime/Slime4.png'
import Slime5 from '../assets/Slime/Slime5.png'
import Slime6 from '../assets/Slime/Slime6.png'
import Slime7 from '../assets/Slime/Slime7.png'
import Slime8 from '../assets/Slime/Slime8.png'

class BootScene extends Scene {


    constructor() {
        super({key : "bootScene"});
    }

    preload() {
        this.load.rexImageURI('player', Player);
        this.load.rexImageURI('player2', Player2);
        this.load.rexImageURI('rope', Rope);
        this.load.rexImageURI('ground', Ground);

        this.load.rexImageURI('test1', T1);
        this.load.rexImageURI('test2', T2)
        this.load.rexImageURI('test3', T3)

        this.load.rexImageURI('background', BackGround)
        this.load.rexImageURI('DeskRight', DeskRight)
        this.load.rexImageURI('DeskLeft', DeskLeft)

        this.load.rexImageURI('Slime1', Slime1)
        this.load.rexImageURI('Slime2', Slime2)
        this.load.rexImageURI('Slime3', Slime3)
        this.load.rexImageURI('Slime4', Slime4)
        this.load.rexImageURI('Slime5', Slime5)
        this.load.rexImageURI('Slime6', Slime6)
        this.load.rexImageURI('Slime7', Slime7)
        this.load.rexImageURI('Slime8', Slime8)


        //this.textures.addBase64('player', Player);
        //this.textures.addBase64('player2', Player2);        
    }

    create() {
        this.scene.start("ropeFightScene");
    }
}

export default BootScene;