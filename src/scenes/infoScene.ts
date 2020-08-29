import { ARENA_CENTER_X, ARENA_HEIGHT } from "../constants";
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
    super({ key: 'InfoScene' });
  }

  create = (): void => {
    this.isMobile = !this.game.device.os.desktop;
    this.cameras.main.setBackgroundColor(0x000000);
    this.createInfoText();
  }

  startGameScene = (): void => {
    this.scene.start('GameScene');
  }

  createInfoText = (): void => {
    const infoTextContent = this.isMobile ? mobileInfoText : dekstopInfoText;
    const infoText = new Phaser.GameObjects.Text(this, ARENA_CENTER_X, ARENA_HEIGHT * 0.25, infoTextContent, textBaseConfig)
      .setOrigin(0.5);
    const continueText = new Phaser.GameObjects.Text(this, ARENA_CENTER_X, ARENA_HEIGHT * 0.75, `${this.isMobile ? 'Tap' : 'Click'} here to continue ->`, textBaseConfig)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', this.startGameScene);

    this.add.existing(infoText);
    this.add.existing(continueText);
  }
}
