import 'phaser';
import { ARENA_HEIGHT, ARENA_WIDTH } from './constants';
import InfoScene from './scenes/infoScene';
import MainScene from './scenes/mainScene';
import PauseScene from './scenes/pauseScene';
import PreloadScene from './scenes/preloadScene';

const config: Phaser.Types.Core.GameConfig & Phaser.Types.Core.RenderConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: ARENA_WIDTH,
    height: ARENA_HEIGHT,
  },
  pixelArt: true,
  scene: [PreloadScene, InfoScene, MainScene, PauseScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
