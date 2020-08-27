import WebFontFile from "../util/webFontLoader";
import { ARENA_HEIGHT, ARENA_WIDTH } from '../constants';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.cameras.main.setBackgroundColor(0x000000);
    
    this.showLoadingText();

    // IMAGES
    // static
    this.load.image('kolliball', 'assets/img/kolliball_100x100.png');
    this.load.image('kolli-magenta', 'assets/img/kolli_magenta_100x100.png');
    this.load.image('kolli-cyan', 'assets/img/kolli_cyan_100x100.png');
    this.load.image('net', 'assets/img/net.png');
    this.load.image('background', 'assets/img/bg_rising_sun.png');
    this.load.image('music-on', 'assets/img/music_on.png');
    this.load.image('music-off', 'assets/img/music_off.png');

    // mobile only
    if (!this.game.device.os.desktop) {
      this.load.image('mobile-arrow', 'assets/img/mobile_arrow.png');
      this.load.image('mobile-space', 'assets/img/mobile_space.png');
    }

    // animations
    this.load.spritesheet('player-idle', 'assets/animations/kolli_idle_magenta.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('player-jump', 'assets/animations/kolli_jump_magenta.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('player-walk', 'assets/animations/kolli_walk_magenta.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('cpu-idle', 'assets/animations/kolli_idle_cyan.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('cpu-jump', 'assets/animations/kolli_jump_cyan.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('cpu-walk', 'assets/animations/kolli_walk_cyan.png', { frameWidth: 100, frameHeight: 100 });

    // FONTS
    try {
      this.load.addFile(new WebFontFile(this.load, ['Press Start 2P']));
    }
    catch (e) {
      console.log("Error fetching fonts:", e);
    }

    // AUDIO
    this.load.audio('music', ['assets/music/valley_of_the_endless_sun.ogg', 'assets/music/valley_of_the_endless_sun.ogg']);

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

  private showLoadingText = (): void => {
    const loadingText = this.make.text({
      x: ARENA_WIDTH / 2,
      y: ARENA_HEIGHT / 2,
      text: 'Loading',
      style: {
        font: '56px monospace',
        fill: '#ffffff',
      }
    });

    loadingText.setOrigin(0.5, 0.5);
    
    let loadingBallAmount = 0;
    const loadingInterval = setInterval(() => {
      loadingBallAmount += 1;
      loadingText.text = `Loading${'.'.repeat(loadingBallAmount)}`;
      
      if (loadingBallAmount >= 3) {
        loadingBallAmount = 0;
      }
    }, 500);

    this.load.on('complete', () => {
      clearInterval(loadingInterval);
    });
  }
}
