import 'phaser';
import MainScene from './scenes/mainScene';
import PauseScene from './scenes/pauseScene';
import PreloadScene from './scenes/preloadScene';
import PuseScene from './scenes/preloadScene';

export const DEFAULT_WIDTH = 1280
export const DEFAULT_HEIGHT = 720

const config: Phaser.Types.Core.GameConfig & Phaser.Types.Core.RenderConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  pixelArt: true,
  scene: [PreloadScene, MainScene, PauseScene],
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
