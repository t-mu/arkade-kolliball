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
  }

  public moveLeft = (): void => {
    if (this.state !== PlayerState.WALKING && this.isGrounded()) {
      this.setPlayerState(PlayerState.WALKING);
      this.anims.play(this.animations.walk);
    }

    this.setVelocityX(-this.horizontalVelocity);
    this.flipX = true;
  }

  public moveRight = (): void => {
    if (this.state !== PlayerState.WALKING && this.isGrounded()) {
      this.setPlayerState(PlayerState.WALKING);
      this.anims.play(this.animations.walk);
    }

    this.setVelocityX(this.horizontalVelocity);
    this.flipX = false;
  }

  public jump = (): void => {
    if (this.state !== PlayerState.JUMPING) {
      this.setPlayerState(PlayerState.JUMPING);
      this.anims.play(this.animations.jump);
    }

    if (this.isGrounded()) {
      this.setVelocityY(-this.verticalVelocity);
    }
  }

  public stopHorizontalMovement = (): void => {
    this.setVelocityX(0);
  }

  protected isAirborne = (): boolean => this.body.y + this.body.height < ARENA_HEIGHT;
  protected isGrounded = (): boolean => this.body.y + this.body.height === ARENA_HEIGHT;
  protected isWalking = (): boolean => this.isGrounded() && this.body.velocity.x !== 0;

  // helper to handle some states / animation transitions
  // TODO: come up with a better solution for state and animations
  protected checkState = (): void => {
    // check for idle state  
    if (this.state !== PlayerState.IDLE && !this.isWalking() && !this.isAirborne()) {
      this.setPlayerState(PlayerState.IDLE);
      this.anims.play(this.animations.idle);
    }
    // check if the player is on the ground after jump and moving
    if (this.state !== PlayerState.WALKING && this.isWalking()) {
      this.setPlayerState(PlayerState.WALKING);
      this.anims.play(this.animations.walk);
    }
  }

  private setPlayerState = (state: PlayerState): void => {
    this.state = state;
  }
}