import Phaser from "phaser";
import PubSub from 'pubsub-js'

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
let FADE_DURATION = 1000;

export default class world extends Phaser.Scene {
  constructor() {
    super("world");
    this.zoomFactor = 2;
  }

  init(data) {
    console.log("*** init world");
    this.player = data.player
    this.inventory = data.inventory
  }

  preload() {

  }

  create() {
    console.log("*** create world: ", this);
    PubSub.publish(window.TOPIC2, {event:"world"});

    let map = this.make.tilemap({
      key: "map0",
    });

    let groundTiles = map.addTilesetImage("ultima", "u3");

    this.grass = map
      .createLayer("grassLayer", groundTiles, 0, 0)
      .setScale(this.zoomFactor);
    this.mapLayer = map
      .createLayer("mapLayer", groundTiles, 0, 0)
      .setScale(this.zoomFactor);

    // let moongatePos = map.findObject(
    //   "objectLayer",
    //   (obj) => obj.name === "moonGate"
    // );
    // let playerPos = map.findObject(
    //   "objectLayer",
    //   (obj) => obj.name === "player"
    // );
    // let paladinPos = map.findObject(
    //   "objectLayer",
    //   (obj) => obj.name === "paladin"
    // );
    // let fighterPos = map.findObject(
    //   "objectLayer",
    //   (obj) => obj.name === "fighter"
    // );
    // let thiefPos = map.findObject("objectLayer", (obj) => obj.name === "thief");
    // let valkriePos = map.findObject(
    //   "objectLayer",
    //   (obj) => obj.name === "valkrie"
    // );
    // let clericPos = map.findObject(
    //   "objectLayer",
    //   (obj) => obj.name === "cleric"
    // );

    this.player = {};
    this.player.x = 300;
    this.player.y = 300;
    this.player = this.physics.add
      .sprite(this.player.x, this.player.y, "u3")
      .play("ranger")
      .setScale(this.zoomFactor);

    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels * this.zoomFactor,
      map.heightInPixels * this.zoomFactor + 64
    );

    this.cameras.main.fadeFrom(FADE_DURATION);
    this.cameras.main.startFollow(this.player);

    // mini map
    this.minimap = this.cameras
      .add(480, 10, 150, 150)
      .setZoom(0.2)
      .setName("mini");
    this.minimap.setBackgroundColor(0x000000);
    this.minimap.startFollow(this.player);

    var config = {
      x: 100,
      y: 550,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x888888),
      thumb: this.add.circle(0, 0, 25, 0xcccccc),
    };

    this.text = this.add.text(50, 420, "0", {
      fontSize: "20px",
      fill: "#ffffff",
    });
    // fix the text to the camera
    this.text.setScrollFactor(0);

    this.joyStick = this.plugins
      .get("rexVirtualJoystick")
      .add(this, config)
      .on("update", this.dumpJoyStickState, this);
      
    
    this.cursors = this.input.keyboard.createCursorKeys();

    this.mapLayer.setTileIndexCallback(10, this.dungeon, this);
    this.mapLayer.setTileIndexCallback(11, this.city1, this);
    this.mapLayer.setTileIndexCallback(12, this.castle, this);
    this.mapLayer.setTileIndexCallback(15, this.bigcastle, this);
    this.mapLayer.setTileIndexCallback(13, this.village, this);


    this.physics.add.collider(this.mapLayer, this.player);

  }

  update() {

    this.speed = 256;
    this.dumpJoyStickState();

    // keyboard & vJoysticks keys
    if (this.cursors.left.isDown ||this.cursorKeys.left.isDown ) {
      this.player.body.setVelocityX(-this.speed);
      PubSub.publish(window.TOPIC1, {key:"left"});
    } else if (this.cursors.right.isDown || this.cursorKeys.right.isDown ) {
      this.player.body.setVelocityX(this.speed);
      PubSub.publish(window.TOPIC1, {key:"right"});
    } else if (this.cursors.up.isDown || this.cursorKeys.up.isDown) {
      this.player.body.setVelocityY(-this.speed);
      PubSub.publish(window.TOPIC1, {key:"up"});
    } else if (this.cursors.down.isDown || this.cursorKeys.down.isDown) {
      this.player.body.setVelocityY(this.speed);
      PubSub.publish(window.TOPIC1, {key:"down"});
    } else {
      this.player.body.setVelocity(0);
    }

  }

  dungeon(player, tile) {
    console.log('dungeon ')
    this.scene.start('dungeon', {
        player: player,
        inventory: this.inventory
    });
}

village(player, tile) {
    console.log('village ')
    this.scene.start('village', {
        player: player,
        inventory: this.inventory
    });
}

city1(player, tile) {
    console.log('city: ')
    this.scene.stop('world');

    this.scene.start('city1', {
        player: player,
        inventory: this.inventory
    });
}

castle(player, tile) {
    console.log('castle ')
    this.scene.start('city2', {
        player: player,
        inventory: this.inventory
    })
}

bigcastle(player, tile) {
    console.log('big castle ')
    this.scene.start('city3', {
        player: player,
        inventory: this.inventory
    })
}

  dumpJoyStickState() {
    this.cursorKeys = this.joyStick.createCursorKeys();
    var s = "Key down: ";
    for (var name in this.cursorKeys) {
      if (this.cursorKeys[name].isDown) {
        s += name + " ";
      }
    }

    // // vJoysticks
    // if (this.cursorKeys.down.isDown) {
    //   this.player.body.setVelocityY(this.speed);
    // } else if (this.cursorKeys.up.isDown) {
    //   this.player.body.setVelocityY(-this.speed);
    // } else if (this.cursorKeys.left.isDown) {
    //   this.player.body.setVelocityX(-this.speed);
    //   this.player.flipX = false;
    // } else if (this.cursorKeys.right.isDown) {
    //   this.player.body.setVelocityX(this.speed);
    //   this.player.flipX = true;
    // } else {
    //   this.player.body.setVelocity(0);
    // }
  
    s += "\n";
    s += "Force: " + Math.floor(this.joyStick.force * 100) / 100 + "\n";
    s += "Angle: " + Math.floor(this.joyStick.angle * 100) / 100 + "\n";
    this.text.setText(s);
  }
}
