import { ARENA_CENTER_X, ARENA_CENTER_Y } from "../constants";
import { HotKey, KeyboardKey } from "../types";
import { textBaseConfig } from "../utils/typography";
import { bindHotKeyToScene } from "../utils/utils";

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PauseScene' });
  }

  create = (): void => {
    const pauseText = new Phaser.GameObjects.Text(this, ARENA_CENTER_X, ARENA_CENTER_Y, 'PAUSED', textBaseConfig)
      .setOrigin(0.5);
    this.add.existing(pauseText);

    const unPause: HotKey = {
      key: KeyboardKey.P,
      action: () => {
        this.scene.stop();
        this.scene.resume('MainScene');
      }
    }

    bindHotKeyToScene(unPause)(this);
  }
}
