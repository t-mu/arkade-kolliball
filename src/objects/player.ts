import MainScene from "../scenes/mainScene";
import Character from "./character";
import { CourtType } from "../types";

export default class Player extends Character {
  controls: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: MainScene, x: number, y: number, court: CourtType) {
    super(scene, x, y, 'kolli-magenta', court);
    this.controls = this.scene.input.keyboard.createCursorKeys();
    this.body.setCircle(50);
    this.court = 'left';
  }

  public update = (): void => {
    this.handleKeyboardMovement();
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
}