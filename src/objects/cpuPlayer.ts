import Player from "./player"
import MainScene from "../scenes/mainScene";
import { CourtType, CharacterAnimations } from "../types";

export default class CpuPlayer extends Player {
  constructor(scene: Phaser.Scene | MainScene, x: number, y: number, court: CourtType, animations?: CharacterAnimations) {
    super(scene, x, y, 'kolli-cyan', court, animations);
    this.body.setCircle(50);
  }

  update = (): void => {
    this.handleMovement();
    this.handlePlayerState();
  }

  private targetBall = (callBack: () => void): void => {
    let targetBall = false;
    setTimeout(() => {
      if (!targetBall) {
        targetBall = true;
        callBack();
      }
    }, 100);
  }

  private handleMovement = (): void => {
    const { ball } = this.scene as MainScene;
    const horizontalBallDistance: number = Math.abs(ball.x - this.body.x);
    const vertucalBallDistance: number = Math.abs(this.body.y - ball.y);

    if (ball.x > 640 && ball.x < this.body.x) {
      this.targetBall(this.moveLeft);
    }
    if (ball.x > this.body.x) {
      this.targetBall(this.moveRight)
    }
    if (horizontalBallDistance < 30 && ball.y < this.body.y && vertucalBallDistance < 250) {
      this.jump();
    }

    if (this.body.velocity.x === 0) {
      this.moveLeft();
    }
    if (this.body.wasTouching.left) {
      this.moveRight();
    }
    if (this.body.wasTouching.right) {
      this.moveLeft();
    }
  }
}