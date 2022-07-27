import Phaser from "phaser";
import u3 from "./assets/ultima.png";
import map0 from "./assets/map1.json";
import map1 from "./assets/city1.json";
import map2 from "./assets/city2.json";
import map3 from "./assets/city3.json";
import mapArena from "./assets/arena.json";
import mapDungeon from "./assets/dungeon.json";
import mapVillage from "./assets/village.json";
//import u3 from "./assets/ultimaA.png";

import ping from "./assets/ping.mp3";

export default class preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  init(data) {
    console.log("*** init preload")
  }

  preload() {

    this.load.spritesheet("u3", u3, { frameWidth: 16, frameHeight: 16 });
    this.load.tilemapTiledJSON("map0", map0);
    this.load.tilemapTiledJSON("map1", map1);
    this.load.tilemapTiledJSON("map2", map2);
    this.load.tilemapTiledJSON("map3", map3);
    this.load.tilemapTiledJSON("mapArena", mapArena);
    this.load.tilemapTiledJSON("dungeon", mapDungeon);
    this.load.tilemapTiledJSON("village", mapVillage);
    this.load.audio("ping", ping);

  }

  create() {
    console.log("*** create preload: ", this);

  
   //////////////////////////////////////////////////////
    // Create all the animations here
    this.anims.create({
      key: "chest",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 172,
        end: 172,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "fireball",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 79,
        end: 79,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "iceball",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 78,
        end: 78,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "dragon",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 232,
        end: 235,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "ranger",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 31,
        end: 31,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "fig",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 36,
        end: 37,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "wiz",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 32,
        end: 33,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "thi",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 34,
        end: 35,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "cle",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 38,
        end: 39,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "pal",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 40,
        end: 41,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "val",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 248,
        end: 251,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "skel",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 196,
        end: 199,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "guard",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 80,
        end: 81,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "british",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 94,
        end: 95,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "horse",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 21,
        end: 21,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "ankh",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 61,
        end: 61,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "moongate",
      frames: this.anims.generateFrameNumbers("u3", {
        start: 64,
        end: 67,
      }),
      frameRate: 1,
      repeat: -1,
    });

  // Small animations
  this.dragon = this.add.sprite(550, 500, "u3").play("dragon").setScale(12);

  //this.chest = this.add.sprite(30, 550, 'u3').play('chest').setScale(4);
  this.moongate = this.add.sprite(30, 550, "u3").play("moongate").setScale(4);

  this.fireball = this.add.sprite(290, 550, "u3").play("fireball").setScale(4);

  this.ranger = this.add.sprite(250, 550, "u3").play("ranger").setScale(4);
  this.fighter = this.add.sprite(200, 550, "u3").play("fig").setScale(4);
  this.wizard = this.add.sprite(140, 550, "u3").play("wiz").setScale(4);
  this.cleric = this.add.sprite(90, 550, "u3").play("cle").setScale(4);

  // Dragon tweens
  this.time.addEvent({
    delay: 1000,
    callback: this.moveRightLeft,
    callbackScope: this,
    loop: false,
  });
  this.time.addEvent({
    delay: 200,
    callback: this.moveRightLeft2,
    callbackScope: this,
    loop: false,
  });

  // Define objects for player and inventory
  this.player = {};
  this.inventory = {};
  this.player.x = 300;
  this.player.y = 300;
  this.inventory.horse = 4;
  this.inventory.chest = 2;
  this.inventory.iceball = 10;
  this.inventory.fireball = 10;
  this.inventory.random = this.randomNum;

  // mouse or touch
  var spaceDown = this.input.keyboard.addKey("SPACE");
  
  spaceDown.on(
    "down",
    function () {
      console.log("space - Jump to world scene");

      this.scene.start("world", {
        player: this.player,
        inventory: this.inventory,
      });
    },
    this
  );

  

  this.input.on(
    "pointerdown",
    function (pointer) {
      console.log("mouse - Jump to world scene");

      this.scene.start("world", {
        player: this.player,
        inventory: this.inventory,
      });
    },
    this
  );
  }
}
