import {
  DEFAULT_CHARACTER_MASS_MULTIPLIER,
  DEFAULT_CHARACTER_GRAVITY,
  DEFAULT_CHARACTER_HORIZONTAL_VELOCITY,
  DEFAULT_CHARACTER_VERTICAL_VELOCITY,
  ARENA_HEIGHT
} from "../constants";
import { CourtType } from "../types";

export default class Character extends Phaser.Physics.Arcade.Sprite {
  horizontalVelocity: number;
  verticalVelocity: number;
  gravity: number;
  mass: number;
  court: CourtType;

  constructor(scene: Phaser.Scene, x: number, y: number, skin: string, court: CourtType) {
    super(scene, x, y, skin);
    this.court = court;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.body.setMass(DEFAULT_CHARACTER_MASS_MULTIPLIER);
    this.body.gravity.y = DEFAULT_CHARACTER_GRAVITY;

    this.horizontalVelocity = DEFAULT_CHARACTER_HORIZONTAL_VELOCITY;
    this.verticalVelocity = DEFAULT_CHARACTER_VERTICAL_VELOCITY;

    if (court === 'right') {
      this.flipX = true;
    }
  }

  protected characterIsOnGround = (): boolean => this.body.y + this.body.height === ARENA_HEIGHT;

  protected moveLeft = (): void => {
    this.setVelocityX(-this.horizontalVelocity);
    this.flipX = true;
  }

  protected moveRight = (): void => {
    this.setVelocityX(this.horizontalVelocity);
    this.flipX = false;
  }

  protected jump = (): void => {
    if (this.characterIsOnGround()) {
      this.setVelocityY(-this.verticalVelocity);
    }
  }

  protected stopHorizontalMovement = (): void => {
    this.setVelocityX(0);
  }
}