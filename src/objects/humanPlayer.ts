import MainScene from "../scenes/mainScene";
import Player from "./player";
import { CourtType, CharacterAnimations } from "../types";

export default class HumanPlayer extends Player {
  controls: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: MainScene, x: number, y: number, court: CourtType, animations?: CharacterAnimations) {
    super(scene, x, y, 'kolli-magenta', court, animations);
    this.controls = this.scene.input.keyboard.createCursorKeys();
    this.body.setCircle(50);
  }

  public update = (): void => {
    this.handleKeyboardMovement();
    this.handlePlayerState();
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