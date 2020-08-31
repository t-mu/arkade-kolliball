import GameScene from "../scenes/gameScene";
import CharacterBase from "./characterBase";
import { Court } from "../types";
import { ARENA_WIDTH } from '../constants';

export default class PlayerCharacter extends CharacterBase {
  controls: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: GameScene, characterName: string, court: Court) {
    super(scene, characterName, court);

    this.body.setCircle(50);

    if (!this.scene.game.device.os.desktop) {
      this.initTouchListeners();
    }
    else {
      this.initKeyboardListeners();
    }
  }

  update = (): void => {
    this.checkState();
  }

  private initKeyboardListeners = (): void => {
    const { left, right, up, space } = this.scene.input.keyboard.createCursorKeys();

    left?.on('down', () => {
      this.moveLeft();
    });

    left?.on('up', () => {
      if (!right?.isDown) {
        this.stopHorizontalMovement();
      }
    });

    right?.on('down', () => {
      this.moveRight();
    });

    right?.on('up', () => {
      if (!left?.isDown) {
        this.stopHorizontalMovement();
      }
    });

    up?.on('down', () => {
      this.jump();
    });

    space?.on('down', () => {
      this.jump();
    });
  }

  private initTouchListeners = (): void => {
    this.scene.input.addPointer(2);
    const { pointer1, pointer2 } = this.scene.input;

    this.scene.input.on('pointerdown', () => {
      if (pointer2.isDown) {
        this.stopHorizontalMovement();
      }
      pointer1.downX > ARENA_WIDTH / 2 ? this.moveRight() : this.moveLeft();
    });

    this.scene.input.on('pointerup', () => {
      if (!pointer2.isDown) {
        this.stopHorizontalMovement();
      }
    });

    this.scene.input.on('pointermove', ({ position, prevPosition }) => {
      if (prevPosition.y - position.y > 30) {
        this.jump();
      }
    });
  }
}