import { ARENA_CENTER_X, ARENA_CENTER_Y } from "../constants";
import { SceneName } from "../types";
import { defaultFontSize, menuFontSize, textBaseConfig } from "../utils/typography";

type MenuItem = {
  text: string;
  goToScene: string;
}

const menuItems: MenuItem[] = [
  {
    text: 'play',
    goToScene: SceneName.GAME,
  },
  {
    text: 'help',
    goToScene: SceneName.INFO,
  },
];

const menuItemPadding = 20;
const menuItemSpacing = defaultFontSize + 3 * menuItemPadding; // 3 x paddigs = top/bottom self + 1 top of upper sibling

export default class MenuScene extends Phaser.Scene {
  activeMenuItem

  constructor() {
    super({ key: SceneName.MENU });
  }

  create = (): void => {
    this.cameras.main.setBackgroundColor("#000");

    // menu container
    const menuContainer = new Phaser.GameObjects.Container(this, ARENA_CENTER_X, ARENA_CENTER_Y);
    this.add.existing(menuContainer);

    // menu items
    const menuItemCreator = new Phaser.GameObjects.GameObjectCreator(this);
    menuItems.forEach(({ text, goToScene }, i: number) => {
      const firstItemVerticalOffset = -(menuItems.length * 90) / 2;
      const menuItem = menuItemCreator.text({}, true)
        .setText(text)
        .setStyle({ ...textBaseConfig, fontSize: `${menuFontSize}px` })
        .setInteractive()
        .setOrigin(0.5, 0)
        .setPadding(menuItemPadding, menuItemPadding, menuItemPadding, menuItemPadding)
        .setPosition(0, firstItemVerticalOffset + i * menuItemSpacing)
        .on('pointerdown', () => {
          this.scene.start(goToScene);
        })
        .on('pointerover', () => {
          menuItem.setBackgroundColor('#666');
        })
        .on('pointerout', () => {
          menuItem.setBackgroundColor('transparent');
        });

      menuContainer.add(menuItem);
    });
  }


}
