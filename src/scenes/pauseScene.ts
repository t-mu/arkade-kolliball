import { ARENA_CENTER_X, ARENA_CENTER_Y } from "../constants";
import { HotKey, KeyboardKey } from "../types";
import { bindHotKeyToScene } from "../utils/utils";

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PauseScene' });
  }

  create = () => {
    this.add.text(ARENA_CENTER_X, ARENA_CENTER_Y, 'PAUSED', {
      color: '#ffffff',
      font: '72px',
      fontFamily: '"Press Start 2P"',
    }).setOrigin(0.5, 0.5);

    const unPause: HotKey = {
      key: KeyboardKey.P,
      action: () => {
        this.scene.stop();
        this.scene.resume('MainScene');
      }
    }

    bindHotKeyToScene(this)(unPause);
  }
}
