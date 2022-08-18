import Phaser from 'phaser'
import BootScene from './BootScene'
import RopeFightScene from './RopeFightScene'
import RunningScene from './RunningScene'
import WaitingScene from './WaitingScene'
import ImageURILoaderPlugin from 'phaser3-rex-plugins/plugins/imageuriloader-plugin.js';


const Width = 1600;
const Height = 512

function launch() {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: '100%',
        height: '100%',
        parent: 'game-container',
        transparent: true,
        //canvas: document.getElementById('game-canvas'),
        plugins: {
            global: [
            {
                key: 'rexImageURILoader',
                plugin: ImageURILoaderPlugin,
                start: true
            },
            ]
        },
        physics: {
            default : 'arcade',
            arcade: {
                gravity: {y: 300},
                debug: false,
            }
        },
/*scene: {
        preload: this.preload,
        create: this.create,
        update: this.update
    },*/
    scene: [
        BootScene, RopeFightScene, RunningScene, WaitingScene
    ]
    })
}

export default launch
export { launch }