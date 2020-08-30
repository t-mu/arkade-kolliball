import { ARENA_CENTER_X, ARENA_CENTER_Y } from "../constants";
import { KeyboardKey, SceneName } from "../types";
import { menuFontSize, textBaseConfig } from "../utils/typography";
import { bindHotKeyToScene } from "../utils/utils";

type MenuItem = {
  text: string;
  sceneToLaunch: SceneName;
}

const menuItems: MenuItem[] = [
  {
    text: 'play',
    sceneToLaunch: SceneName.GAME,
  },
  {
    text: 'help',
    sceneToLaunch: SceneName.INFO,
  },
];

const menuItemPadding = 20;

export default class MenuScene extends Phaser.Scene {
  activeMenuItemIndex: number = 0;
  menuItems: Phaser.GameObjects.Text[] = [];

  constructor() {
    super({ key: SceneName.MENU });
  }

  create = (): void => {
    this.cameras.main.setBackgroundColor("#444");
    this.createMenu();
    this.initKeyboardControls();
  }

  update = (): void => {
    this.updateActiveMenuItem();
  }

  private createMenu = (): void => {
    const menuItemCreator = new Phaser.GameObjects.GameObjectCreator(this);

    menuItems.forEach(({ text, sceneToLaunch }, i: number) => {
      const menuItem = menuItemCreator.text({}, true);
      this.menuItems.push(menuItem);
      menuItem
        .setText(text)
        .setStyle({ ...textBaseConfig, fontSize: `${menuFontSize}px` })
        .setInteractive()
        .setOrigin(0.5, 0)
        .setPadding(menuItemPadding, menuItemPadding, menuItemPadding, menuItemPadding)
        .setShadow(4, 4)
        .on('pointerdown', () => {
          this.launchScene(sceneToLaunch);
        })
        .on('pointerover', () => {
          this.activeMenuItemIndex = i;
        });

      // We can only calculate the offset after all mutations to the Text object have been done
      // so the height is based on the actual font size and paddings
      // TODO: rewrite this to a cleaner format
      const firstMenuItemY = (menuItems.length * menuItem.height / 2);
      menuItem.setPosition(ARENA_CENTER_X, ARENA_CENTER_Y - firstMenuItemY + i * menuItem.height)
    });
  }

  private initKeyboardControls = (): void => {
    const { up, down, space } = this.input.keyboard.createCursorKeys();

    up?.on('down', () => {
      this.decrementActiveMenuItemIndex();
    });

    down?.on('down', () => {
      this.incrementActiveMenuItemIndex();
    });

    space?.on('down', () => {
      this.launchScene(menuItems[this.activeMenuItemIndex].sceneToLaunch)
    });

    bindHotKeyToScene({
      key: KeyboardKey.ENTER,
      action: () => {
        this.launchScene(menuItems[this.activeMenuItemIndex].sceneToLaunch)
      }
    })(this);
  }

  private incrementActiveMenuItemIndex = (): void => {
    const newIndex = this.activeMenuItemIndex + 1;
    this.activeMenuItemIndex = newIndex > this.menuItems.length - 1 ? 0 : newIndex;
    this.menuItems[this.activeMenuItemIndex]
  }

  private decrementActiveMenuItemIndex = (): void => {
    const newIndex = this.activeMenuItemIndex - 1;
    this.activeMenuItemIndex = newIndex < 0 ? this.menuItems.length - 1 : newIndex;
  }

  private updateActiveMenuItem = (): void => {
    this.menuItems.forEach((m, i) => {
      m.setBackgroundColor(i === this.activeMenuItemIndex ? '#ff00f9' : 'transparent');
    });
  }

  private launchScene = (scene: SceneName): void => {
    this.scene.switch(scene)
    this.input.keyboard.resetKeys();
  }
}
