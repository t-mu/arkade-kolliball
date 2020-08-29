import { ARENA_CENTER_X } from "../constants";
import { SceneName } from "../types";
import { defaultPxFontSize, menuFontSize, textBaseConfig } from "../utils/typography";

const menuItemSpacing = 3 * defaultPxFontSize;

type MenuItem = {
  text: string;
  scene: string;
}

const menuItems: MenuItem[] = [
  {
    text: 'start',
    scene: SceneName.GAME,
  }, {
    text: 'help',
    scene: SceneName.INFO
  }
];

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneName.MENU });
  }

  create = (): void => {
    this.cameras.main.setBackgroundColor(0x000000);
    menuItems.forEach(({ text, scene }, i) => {
      const item = this.createMenuItem(text, () => {
        this.scene.start(scene);
      });
      item.setPosition(ARENA_CENTER_X, i * menuItemSpacing);
    });
  }

  createMenuItem = (text: string, action: () => void): Phaser.GameObjects.Text => {
    const menuItem = new Phaser.GameObjects.Text(this, ARENA_CENTER_X, 0, text, { ...textBaseConfig, fontSize: menuFontSize })
      .setInteractive()
      .on('pointerdown', () => action())
      .setOrigin(0.5, 0)
      .setPadding(10, 10, 10, 10);

    this.add.existing(menuItem);

    return menuItem;
  }
}
