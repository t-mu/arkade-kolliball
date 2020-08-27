import MainScene from "../scenes/mainScene";
import Player from "./player";
import { CourtType, CharacterAnimations } from "../types";
import { ARENA_WIDTH } from '../constants';

export default class HumanPlayer extends Player {
  controls: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: MainScene, x: number, y: number, court: CourtType, animations: CharacterAnimations) {
    super(scene, x, y, 'kolli-magenta', court, animations);
    this.controls = this.scene.input.keyboard.createCursorKeys();
    this.body.setCircle(50);

    if (!this.scene.game.device.os.desktop) {
      this.handleTouchMovement();
    }
  }

  public update = (): void => {
    this.handleKeyboardMovement();
    this.checkState();
  }

  private handleKeyboardMovement = (): void => {
    const { left, right, up, space } = this.controls;

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

  private handleTouchMovement = (): void => {
    this.scene.input.addPointer(2);
    const { pointer1, pointer2 } = this.scene.input;

    this.scene.input.on('pointerdown', () => {
      if (pointer2.isDown) {
        this.stopHorizontalMovement();
      }
      pointer1.downX > ARENA_WIDTH / 2 ? this.moveRight() : this.moveLeft();
    });

    this

    this.scene.input.on('pointermove', ({ position, prevPosition }) => {
      if (prevPosition.y - position.y > 30) {
        this.jump();
      }
    });
  }
}