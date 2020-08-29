import {
  DEFAULT_CHARACTER_MASS_MULTIPLIER,
  DEFAULT_CHARACTER_GRAVITY,
  DEFAULT_CHARACTER_HORIZONTAL_VELOCITY,
  DEFAULT_CHARACTER_VERTICAL_VELOCITY,
  ARENA_HEIGHT, LEFT_COURT_CENTER_X, RIGHT_COURT_CENTER_X
} from "../constants";
import { Court, CharacterAnimations } from "../types";

enum CharacterAnimationType {
  WALK = 'walk',
  IDLE = 'idle',
  JUMP = 'jump',
}

enum CharacterState {
  WALKING,
  JUMPING,
  IDLE
};

export default class CharacterBase extends Phaser.Physics.Arcade.Sprite {
  horizontalVelocity: number;
  verticalVelocity: number;
  gravity: number;
  mass: number;
  court: Court;
  animations: CharacterAnimations;
  state: CharacterState;

  constructor(scene: Phaser.Scene, characterName: string, court: Court) {
    super(scene, court === Court.LEFT ? LEFT_COURT_CENTER_X : RIGHT_COURT_CENTER_X, ARENA_HEIGHT, characterName);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.body.setMass(DEFAULT_CHARACTER_MASS_MULTIPLIER);
    this.body.gravity.y = DEFAULT_CHARACTER_GRAVITY;

    this.court = court;
    this.animations = this.createAnimations(characterName);
    this.horizontalVelocity = DEFAULT_CHARACTER_HORIZONTAL_VELOCITY;
    this.verticalVelocity = DEFAULT_CHARACTER_VERTICAL_VELOCITY;

    if (court === Court.RIGHT) {
      this.flipX = true;
    }
  }

  moveLeft = (): void => {
    if (this.state !== CharacterState.WALKING && this.isGrounded()) {
      this.setPlayerState(CharacterState.WALKING);
      this.anims.play(this.animations.walk);
    }

    this.setVelocityX(-this.horizontalVelocity);
    this.flipX = true;
  }

  moveRight = (): void => {
    if (this.state !== CharacterState.WALKING && this.isGrounded()) {
      this.setPlayerState(CharacterState.WALKING);
      this.anims.play(this.animations.walk);
    }

    this.setVelocityX(this.horizontalVelocity);
    this.flipX = false;
  }

  jump = (): void => {
    if (this.state !== CharacterState.JUMPING) {
      this.setPlayerState(CharacterState.JUMPING);
      this.anims.play(this.animations.jump);
    }

    if (this.isGrounded()) {
      this.setVelocityY(-this.verticalVelocity);
    }
  }

  stopHorizontalMovement = (): void => {
    this.setVelocityX(0);
  }

  protected isAirborne = (): boolean => this.body.y + this.body.height < ARENA_HEIGHT;
  protected isGrounded = (): boolean => this.body.y + this.body.height === ARENA_HEIGHT;
  protected isWalking = (): boolean => this.isGrounded() && this.body.velocity.x !== 0;

  // helper to handle some states / animation transitions
  // TODO: come up with a better solution for state and animations
  protected checkState = (): void => {
    // check for idle state  
    if (this.state !== CharacterState.IDLE && !this.isWalking() && !this.isAirborne()) {
      this.setPlayerState(CharacterState.IDLE);
      this.anims.play(this.animations.idle);
    }
    // check if the player is on the ground after jump and moving
    if (this.state !== CharacterState.WALKING && this.isWalking()) {
      this.setPlayerState(CharacterState.WALKING);
      this.anims.play(this.animations.walk);
    }
  }

  private setPlayerState = (state: CharacterState): void => {
    this.state = state;
  }

  // TODO: rework this later
  private createAnimations = (characterPrefix: string): CharacterAnimations => {
    let characterAnimations: CharacterAnimations = {
      walk: '',
      idle: '',
      jump: '',
    };

    for (let animationType in CharacterAnimationType) {
      const animationName: string = CharacterAnimationType[animationType];
      const animationKey: string = `${characterPrefix}-${animationName}`;

      this.scene.anims.create({
        key: animationKey,
        yoyo: true,
        repeat: -1,
        frames: this.scene.anims.generateFrameNumbers(animationKey, {
          frames: [5, 4, 3, 2, 1]
        }),
        frameRate: animationName === CharacterAnimationType.WALK ? 10 : 5,
      });

      characterAnimations[animationName] = animationKey;
    }

    return characterAnimations;
  }
}