import {
  DEFAULT_CHARACTER_MASS_MULTIPLIER,
  DEFAULT_CHARACTER_GRAVITY,
  DEFAULT_CHARACTER_HORIZONTAL_VELOCITY,
  DEFAULT_CHARACTER_VERTICAL_VELOCITY,
  ARENA_HEIGHT
} from "../constants";
import { CourtType, CharacterAnimations } from "../types";


enum PlayerState {
  WALKING,
  JUMPING,
  IDLE
};

export default class Player extends Phaser.Physics.Arcade.Sprite {
  horizontalVelocity: number;
  verticalVelocity: number;
  gravity: number;
  mass: number;
  court: CourtType;
  animations: CharacterAnimations;
  state: PlayerState;

  constructor(scene: Phaser.Scene, x: number, y: number, skin: string, court: CourtType, animations?: CharacterAnimations) {
    super(scene, x, y, skin);

    this.court = court;
    this.animations = animations ?? { walk: '', idle: '', jump: '' };

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

    this.anims.play(this.animations.idle);
  }

  protected isAirborne = (): boolean => this.body.y + this.body.height < ARENA_HEIGHT;
  protected isGrounded = (): boolean => this.body.y + this.body.height === ARENA_HEIGHT;

  protected moveLeft = (): void => {
    this.setVelocityX(-this.horizontalVelocity);
    this.flipX = true;
  }

  protected moveRight = (): void => {
    this.setVelocityX(this.horizontalVelocity);
    this.flipX = false;
  }

  protected jump = (): void => {
    if (this.isGrounded()) {
      this.setVelocityY(-this.verticalVelocity);
    }
  }

  protected stopHorizontalMovement = (): void => {
    this.setVelocityX(0);
  }

  protected handlePlayerState = (): void => {
    // TODO: Decent logic to toggle between states and play animations
    if (this.state !== PlayerState.JUMPING && this.isAirborne()) {
      this.state = PlayerState.JUMPING;
      this.anims.play(this.animations.jump);
    }
    else if (this.state !== PlayerState.IDLE && this.isGrounded()) {
      this.state = PlayerState.IDLE;
      this.anims.play(this.animations.idle);
    }
  }
}