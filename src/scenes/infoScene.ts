import { ARENA_CENTER_X, ARENA_HEIGHT, ARENA_WIDTH } from "../constants";

const infoTextConfig: Phaser.Types.GameObjects.Text.TextStyle = {
  color: '#ffffff',
  fontFamily: '"Press Start 2P"',
  fontSize: '38px'
};

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

  startMainScene = (): void => {
    this.scene.start('MainScene');
  }

  createInfoText = (): void => {
    const infoTextContent = this.isMobile ? mobileInfoText : dekstopInfoText;
    const infoText = new Phaser.GameObjects.Text(this, ARENA_CENTER_X, ARENA_HEIGHT * 0.25, infoTextContent, infoTextConfig)
      .setOrigin(0.5);
    const continueText = new Phaser.GameObjects.Text(this, ARENA_CENTER_X, ARENA_HEIGHT * 0.75, `${this.isMobile ? 'Tap' : 'Click'} here to continue ->`, infoTextConfig)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', this.startMainScene);;

    this.add.existing(infoText);
    this.add.existing(continueText);
  }
}
