<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <div id="game"></div>
    </div>
</template>

<script>
// @ is an alias to /src
import Phaser from "phaser";
import Ground from "../../static/image/ground.png";
import Background from "../../static/image/bg.png";
import Bamboo from "../../static/image/bamboo.png";
import CoinEffect from "../../static/image/coin_effect.png";
import Coin from "../../static/image/coin.png";
import GangJump from "../../static/image/gang_jump.png";
import GangRun from "../../static/image/gang_run.png";

export default {
    name: "HomeView",
    components: {},
    beforeDestroy: function () {
        window.removeEventListener("resize", this.resizeScene);
    },
    mounted() {
        this.width = window.innerWidth - 24 - 17;
        this.create();
        window.addEventListener("resize", this.resizeScene);
    },
    data() {
        return {
            game: null,
            width: 0,
            heght: 0,
            itemList: [],
            radius: 50,
            ballCount: 6,
        };
    },
    methods: {
        create() {
            this.height = window.innerHeight - 64 - 24 - 12;

            this.game = new Phaser.Game({
                parent: "game",
                type: Phaser.AUTO,
                width: this.width,
                height: this.height,
                scene: {
                    preload: this.preload,
                    create: this.createScene,
                    update: this.update,
                },
            });
        },
        preload: function () {
            let scene = this.game.scene.scenes[0];

            scene.load.image("background", Background);
            scene.load.image("bamboo", Bamboo);
            scene.load.image("coin-effect", CoinEffect);
            scene.load.image("coin", Coin);
            scene.load.image("gang-jump", GangJump);
            scene.load.image("gang-run", GangRun);
            scene.load.image("ground", Ground);
        },
        createScene: function () {
            this.itemList = [];

            let scene = this.game.scene.scenes[0];

            let bg = {
                scene: scene.add.image(this.width / 2, this.height / 2, "background"),
                type: "background",
            };

            bg.scene.setDisplaySize(this.width, this.height);
            this.itemList.push(bg);

            let rate = this.width / 1280;
            let bambooWidth = Math.min(900, 900 * rate);
            let bambooCount = this.width / bambooWidth + 1;
            for (let index = 0; index <= bambooCount; index++) {
                this.itemList.push({
                    scene: scene.add.image(bambooWidth * index, 0, "bamboo").setOrigin(0),
                    type: "bamboo",
                });
            }

            let groundWidth = 220;
            let groundCount = this.width / groundWidth + 1;
            for (let index = 0; index <= groundCount; index++) {
                this.itemList.push({
                    scene: scene.add.image(groundWidth * index, this.height - 80, "ground").setOrigin(0),
                    type: "ground",
                });
            }
        },
        update: function () {
            this.itemList.forEach((item) => {
                if (item.type === "bamboo") {
                    item.scene.x += -5;

                    let rate = this.width / 1280;
                    let bambooWidth = Math.min(900, 900 * rate);

                    if (item.scene.x + bambooWidth < 0) {
                        item.scene.x = this.width + bambooWidth;
                    }
                }
            });
        },
        resizeScene: function () {
            this.width = window.innerWidth - 24 - 17;
            this.height = window.innerHeight - 64 - 24 - 12;

            this.game.scale.resize(this.width, this.height);

            let bg = this.itemList.find((item) => item.type == "background");
            bg.scene.x = this.width / 2;
            bg.scene.y = this.height / 2;
            bg.scene.setDisplaySize(this.width, this.height);

            this.itemList.forEach((item) => {
                if (item.type === "ground") {
                    item.scene.y = this.height - 80;
                }
            });
        },
    },
};
</script>
