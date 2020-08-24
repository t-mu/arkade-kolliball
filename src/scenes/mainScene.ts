import Ball from '../objects/ball';
import ScoreText from '../objects/scoreText';
import HumanPlayer from '../objects/humanPlayer';
import Net from '../objects/net';
import CpuPlayer from '../objects/CpuPlayer';
import { CharacterAnimations } from '../types';

const sharedFrameConfig: Phaser.Types.Animations.GenerateFrameNumbers = {
  frames: [5, 4, 3, 2, 1]
};

const sharedAnimationConfig: Phaser.Types.Animations.Animation = {
  frameRate: 5,
  yoyo: true,
  repeat: -1
}

export default class MainScene extends Phaser.Scene {
  scoreText: Phaser.GameObjects.Text;
  scoreText2: Phaser.GameObjects.Text;
  playerScore = 0;
  cpuScore = 0;
  ball: Ball;
  player: HumanPlayer;
  cpuPlayer: CpuPlayer;
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  net: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({ key: 'MainScene' })
  }

  create = (): void => {
    this.ball = new Ball(this, 640, 0);
    this.net = new Net(this, 640, 540);

    this.net.setDebugBodyColor(0x000000);
    this.net.debugShowBody = true;

    this.scoreText = new ScoreText(this, 10, 10);
    this.scoreText2 = new ScoreText(this, 1270, 10);
    this.scoreText2.setOrigin(1, 0);

    this.player = new HumanPlayer(this, 100, 720, 'left', this.createPlayerAnimations());
    this.cpuPlayer = new CpuPlayer(this, 1180, 720, 'right', this.createCpuAnimations());
  }

  update = (): void => {
    this.ball.update();
    this.scoreText.update(this.playerScore);
    this.scoreText2.update(this.cpuScore);
    this.player.update();
    this.cpuPlayer.update();
    this.updateScore();
    this.checkCollisions();
  }

  private checkCollisions = (): void => {
    this.physics.collide(this.player, this.ball, this.ball.adjustSpin);
    this.physics.collide(this.cpuPlayer, this.ball, this.ball.adjustSpin);
    this.physics.collide(this.net, this.ball);
    this.physics.collide(this.net, this.player);
    this.physics.collide(this.net, this.cpuPlayer);
  }

  private updateScore = (): void => {
    const ballTouchesGround: boolean = this.ball.body.bottom === this.cameras.main.height;

    if (!ballTouchesGround) {
      return;
    }

    const impactCoords = this.ball.body.x;
    impactCoords > 640 ? this.playerScore++ : this.cpuScore++;

    this.resetBall();
  }

  private resetBall = (): void => {
    this.ball.x = 640;
    this.ball.y = 30;
    this.ball.setVelocityX(Math.random() > 0.5 ? 35 : -35);
    this.ball.setVelocityY(0);
  }

  private createPlayerAnimations = (): CharacterAnimations => {
    const playerIdle: Phaser.Types.Animations.Animation = {
      ...sharedAnimationConfig,
      key: 'kolli-idle',
      frames: this.anims.generateFrameNumbers('kolli-idle-magenta', sharedFrameConfig),
    };

    const playerJump: Phaser.Types.Animations.Animation = {
      ...sharedAnimationConfig,
      key: 'kolli-jump',
      frames: this.anims.generateFrameNumbers('kolli-jump-magenta', sharedFrameConfig),
    };

    this.anims.create(playerIdle);
    this.anims.create(playerJump);

    return {
      walk: 'kolli-walk',
      idle: 'kolli-idle',
      jump: 'kolli-jump',
    };
  }

  private createCpuAnimations = (): CharacterAnimations => {
    const cpuPlayerIdle: Phaser.Types.Animations.Animation = {
      ...sharedAnimationConfig,
      key: 'cpu-idle',
      frames: this.anims.generateFrameNumbers('kolli-idle-cyan', sharedFrameConfig),
    };

    const cpuPlayerJump: Phaser.Types.Animations.Animation = {
      ...sharedAnimationConfig,
      key: 'cpu-jump',
      frames: this.anims.generateFrameNumbers('kolli-jump-cyan', sharedFrameConfig),
    };

    this.anims.create(cpuPlayerIdle);
    this.anims.create(cpuPlayerJump);

    return {
      walk: 'cpu-walk',
      idle: 'cpu-idle',
      jump: 'cpu-jump',
    };
  }
}
