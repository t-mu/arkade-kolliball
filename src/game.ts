import 'phaser';
import { ARENA_HEIGHT, ARENA_WIDTH } from './constants';
import InfoScene from './scenes/infoScene';
import GameScene from './scenes/gameScene';
import PauseScene from './scenes/pauseScene';
import PreloadScene from './scenes/preloadScene';
import MenuScene from './scenes/menuScene';

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
  scene: [PreloadScene, MenuScene, InfoScene, GameScene, PauseScene],
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
