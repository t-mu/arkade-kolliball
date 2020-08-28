import { ARENA_CENTER_X, ARENA_HEIGHT, ARENA_WIDTH } from "../constants";

const infoTextConfig = {
  color: '#ffffff',
  font: '56px',
  fontFamily: '"Press Start 2P"',
}



export default class InfoScene extends Phaser.Scene {
  isMobile: boolean;
  constructor() {
    super({ key: 'InfoScene' });
  }

  create = (): void => {
    this.isMobile = !this.game.device.os.desktop;
    this.cameras.main.setBackgroundColor(0x000000);
    this.isMobile ? this.createMobileInfo() : this.createDesktopInfo();
    this.createContinueText();
  }

  startMainScene = (): void => {
    this.scene.start('MainScene');
  }

  createDesktopInfo = (): void => {
    this.add.text(ARENA_CENTER_X, ARENA_HEIGHT * 0.25, 'Left\t\t=\t\'left arrow\'\nRight\t=\t\'right arrow\'\nJump\t\t=\t\'space\'/\'up arrow\'', infoTextConfig)
      .setOrigin(0.5);
  }

  createMobileInfo = (): void => {
    this.add.text(ARENA_CENTER_X, ARENA_HEIGHT * 0.25, 'Left\t\t=\ttap left side\nRight\t=\ttap right side\nJump\t\t=\tswipe upwards', infoTextConfig)
      .setOrigin(0.5);
  }

  createContinueText = (): void => {
    this.add.text(ARENA_CENTER_X, ARENA_HEIGHT * 0.75, `${this.isMobile ? 'Tap' : 'Click'} here to continue ->`, infoTextConfig)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on('pointerdown', this.startMainScene);
  }
}
