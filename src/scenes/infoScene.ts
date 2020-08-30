import { ARENA_CENTER_X, ARENA_CENTER_Y, ARENA_HEIGHT } from "../constants";
import { SceneName } from "../types";
import { textBaseConfig } from "../utils/typography";

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
  }

  startGameScene = (): void => {
    this.scene.start(SceneName.MENU);
  }

  createInfoText = (): void => {
    const infoTextContent = this.isMobile ? mobileInfoText : dekstopInfoText;
    const infoText = new Phaser.GameObjects.Text(this, ARENA_CENTER_X, ARENA_CENTER_Y, infoTextContent, textBaseConfig)
      .setOrigin(0.5)
      .setShadow(4, 4);
    const backToMenuText = new Phaser.GameObjects.Text(this, 10, 10, '<- back to menu', textBaseConfig)
      .setInteractive()
      .setShadow(4, 4)
      .setPadding(10, 10, 10, 10)
      .on('pointerdown', this.startGameScene)
      .on('pointerover', () => {
        backToMenuText.setBackgroundColor('#ff00f9');
      })
      .on('pointerout', () => {
        backToMenuText.setBackgroundColor('transparent');
      });;

    this.add.existing(infoText);
    this.add.existing(backToMenuText);
  }
}
