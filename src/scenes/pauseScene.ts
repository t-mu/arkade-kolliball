import { ARENA_CENTER_X, ARENA_CENTER_Y } from "../constants";
import { HotKey, KeyboardKey, SceneName } from "../types";
import { textBaseConfig } from "../utils/typography";
import { bindHotKeyToScene } from "../utils/utils";

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneName.PAUSE });
  }

  create = (): void => {
    const pauseText = new Phaser.GameObjects.Text(this, ARENA_CENTER_X, ARENA_CENTER_Y, 'PAUSED', textBaseConfig)
      .setOrigin(0.5);
    this.add.existing(pauseText);

    const unPause: HotKey = {
      key: KeyboardKey.P,
      action: () => {
        this.scene.stop();
        this.scene.resume(SceneName.GAME);
      }
    }

    bindHotKeyToScene(unPause)(this);
  }
}
