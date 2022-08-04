import Phaser from 'phaser'
import BootScene from './BootScene'
import RopeFightScene from './RopeFightScene'
import ImageURILoaderPlugin from 'phaser3-rex-plugins/plugins/imageuriloader-plugin.js';

function launch() {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: 1600,
        height: 512,
        parent: 'game-container',
        transparent: true,
        canvas: document.getElementById('game-canvas'),
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
        BootScene, RopeFightScene,
    ]
    })
}

export default launch
export { launch }