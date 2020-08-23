import WebFontFile from "../util/webFontLoader";

export default class PreloadScene extends Phaser.Scene {
  webFont: any;
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    // IMAGES
    this.load.image('kolliball', 'assets/img/kolliball_100x100.png');
    this.load.image('kolli', 'assets/img/kolli_100x100.png');
    this.load.image('kolli-alternate', 'assets/img/kolli_alternate_100x100.png');
    this.load.spritesheet('kolli-idle', 'assets/animations/kolli_idle.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('kolli-alternate-idle', 'assets/animations/kolli_alternate_idle.png', { frameWidth: 100, frameHeight: 100 });

    // GRAPHICS
    // net texture
    this.add.graphics({
      fillStyle: {
        color: 0x000000
      }
    })
      .fillRect(0, 0, 20, 360)
      .generateTexture('net', 20, 360);

    // FONTS
    try {
      console.log("Preloading fonts...");
      this.load.addFile(new WebFontFile(this.load, ['Press Start 2P']));
    }
    catch (e) {
      console.log("Error fetching fonts:", e);
    }

  }

  create() {
    this.scene.start('MainScene');

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
