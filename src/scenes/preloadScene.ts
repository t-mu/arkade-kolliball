import WebFontFile from "../util/webFontLoader";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    // IMAGES
    this.load.image('kolliball', 'assets/img/kolliball_100x100.png');
    this.load.image('kolli-magenta', 'assets/img/kolli_magenta_100x100.png');
    this.load.image('kolli-cyan', 'assets/img/kolli_cyan_100x100.png');
    this.load.image('net', 'assets/img/net.png');

    this.load.spritesheet('player-idle', 'assets/animations/kolli_idle_magenta.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('player-jump', 'assets/animations/kolli_jump_magenta.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('player-walk', 'assets/animations/kolli_walk_magenta.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('cpu-idle', 'assets/animations/kolli_idle_cyan.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('cpu-jump', 'assets/animations/kolli_jump_cyan.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('cpu-walk', 'assets/animations/kolli_walk_cyan.png', { frameWidth: 100, frameHeight: 100 });

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
