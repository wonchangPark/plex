import {Scene} from 'phaser';
import Player from '../assets/test_player.png';
import Player2 from '../assets/chick.png';
import Rope from '../assets/rope.png';
import Ground from '../assets/platform.png';
import Sky from '../assets/sky_background.png';
import SkyUpper from '../assets/sky_upperbackground.png';

class BootScene extends Scene {


    constructor() {
        super({key : "bootScene"});
    }

    preload() {
        this.load.rexImageURI('player', Player);
        this.load.rexImageURI('player2', Player2);
        this.load.rexImageURI('rope', Rope);
        this.load.rexImageURI('ground', Ground);
        this.load.rexImageURI('sky', Sky);
        this.load.rexImageURI('skyupper', SkyUpper);

        //this.textures.addBase64('player', Player);
        //this.textures.addBase64('player2', Player2);        
    }

    create() {
        this.scene.start("ropeFightScene");
    }
}

export default BootScene;