import { ARENA_CENTER_X, ARENA_CENTER_Y } from "../constants";
import { KeyboardKey, SceneName } from "../types";
import { textBaseConfig } from "../utils/typography";
import { bindHotKeyToScene } from "../utils/utils";

const dekstopInfoText = `Left  = \'left arrow\'
Right = \'right arrow\'
Jump  = 'space\'/\'up arrow\'
Pause = 'P'
Mute  = 'M'`;

const mobileInfoText = `Left  = touch left side
Right = touch right side
Jump  = swipe upwards`;

export default class InfoScene extends Phaser.Scene {
  isMobile: boolean;
  constructor() {
    super({ key: SceneName.INFO });
  }

  create = (): void => {
    this.isMobile = !this.game.device.os.desktop;
    this.cameras.main.setBackgroundColor('#444');
    this.createInfoText();
    this.initKeyboardControls();
  }

  goToMenuScene = (): void => {
    this.input.keyboard.resetKeys();
    this.scene.switch(SceneName.MENU);
  }

  createInfoText = (): void => {
    const infoTextContent = this.isMobile ? mobileInfoText : dekstopInfoText;
    const infoText = new Phaser.GameObjects.Text(this, ARENA_CENTER_X, ARENA_CENTER_Y, infoTextContent, textBaseConfig)
      .setOrigin(0.5)
      .setShadow(4, 4);
    const backToMenuText = new Phaser.GameObjects.Text(this, 10, 10, '<- back to menu', textBaseConfig)

    backToMenuText
      .setInteractive()
      .setShadow(4, 4)
      .setPadding(10, 10, 10, 10)
      .setBackgroundColor('#ff00f9')
      .on('pointerdown', this.goToMenuScene);

    this.add.existing(infoText);
    this.add.existing(backToMenuText);
  }

  private initKeyboardControls = (): void => {
    const { space } = this.input.keyboard.createCursorKeys();

    space?.on('down', this.goToMenuScene);

    bindHotKeyToScene({ key: KeyboardKey.ESC, action: this.goToMenuScene })(this);
    bindHotKeyToScene({ key: KeyboardKey.ENTER, action: this.goToMenuScene })(this);
  }
}
