<template>
    <div id="game"></div>
</template>

<script>
import Phaser from "phaser";
import Sky from "../../static/image/sky.png";
import Platform from "../../static/image/platform.png";
import Star from "../../static/image/star.png";
import Bomb from "../../static/image/bomb.png";
import Dude from "../../static/image/dude.png";

export default {
    mounted() {
        this.create();
    },
    data() {
        return {
            game: null,
        };
    },
    methods: {
        create() {
            this.game = new Phaser.Game({
                parent: "game",
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                backgroundColor: "#18216D",
                scene: {
                    preload: this.preload,
                    create: this.createScene,
                    update: this.update,
                },
            });
        },
        preload: function () {
            let scene = this.game.scene.scenes[0];

            scene.load.image("sky", Sky);
            scene.load.image("platform", Platform);
            scene.load.image("star", Star);
            scene.load.image("bomb", Bomb);
            scene.load.spritesheet("dude", Dude, { frameWidth: 32, frameHeight: 48 });
        },
        createScene: function () {
            let scene = this.game.scene.scenes[0];
            scene.add.text(150, 300, "Press Any Key to Start").setOrigin(0,0);
        },
        update: function () {

        },
    },
};
</script>

<style></style>
