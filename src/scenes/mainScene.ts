import Ball from '../objects/ball';
import ScoreText from '../objects/scoreText';
import Player from '../objects/player';
import Net from '../objects/net';
import CpuPlayer from '../objects/CpuPlayer';

const idleAnimationFrameConfig: Phaser.Types.Animations.GenerateFrameNumbers = {
  frames: [5, 4, 3, 2, 1]
};

export default class MainScene extends Phaser.Scene {
  scoreText: Phaser.GameObjects.Text;
  scoreText2: Phaser.GameObjects.Text;
  p1Score = 0;
  p2Score = 0;
  ball: Ball;
  player: Player;
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

    this.player = new Player(this, 100, 720, 'left');
    this.cpuPlayer = new CpuPlayer(this, 1180, 720, 'right');

    this.createAnimations();
    this.player.play('kolli-idle');
    this.cpuPlayer.play('cpu-idle');
  }

  update = (): void => {
    this.ball.update();
    this.scoreText.update(this.p1Score);
    this.scoreText2.update(this.p2Score);
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
    impactCoords > 640 ? this.p1Score++ : this.p2Score++;

    this.resetBall();
  }

  private resetBall = (): void => {
    this.ball.x = 640;
    this.ball.y = 30;
    this.ball.setVelocityX(Math.random() > 0.5 ? 35 : -35);
    this.ball.setVelocityY(0);
  }

  private createAnimations = (): void => {
    const playerIdle: Phaser.Types.Animations.Animation = {
      key: 'kolli-idle',
      frames: this.anims.generateFrameNumbers('kolli-idle-magenta', idleAnimationFrameConfig),
      frameRate: 5,
      yoyo: true,
      repeat: -1
    };

    const cpuPlayerIdle: Phaser.Types.Animations.Animation = {
      key: 'cpu-idle',
      frames: this.anims.generateFrameNumbers('kolli-idle-cyan', idleAnimationFrameConfig),
      frameRate: 5,
      yoyo: true,
      repeat: -1
    };

    this.anims.create(playerIdle);
    this.anims.create(cpuPlayerIdle);
  }
}
