import Ball from '../objects/ball';
import ScoreText from '../objects/scoreText';
import HumanPlayer from '../objects/humanPlayer';
import Net from '../objects/net';
import CpuPlayer from '../objects/cpuPlayer';
import { CharacterAnimations } from '../types';

enum CharacterAnimationType {
  WALK = 'walk',
  IDLE = 'idle',
  JUMP = 'jump',
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
    const bg = this.add.image(640, 360, 'background').setOrigin(0.5, 0.5);
    bg.scale = 4;

    this.ball = new Ball(this, 640, 0);
    this.resetBall();

    this.net = new Net(this, 640, 540);
    this.net.setDebugBodyColor(0x000000);
    this.net.debugShowBody = true;

    this.scoreText = new ScoreText(this, 10, 10);
    this.scoreText2 = new ScoreText(this, 1270, 10);
    this.scoreText2.setOrigin(1, 0);

    this.player = new HumanPlayer(this, 100, 720, 'left', this.createCharacterAnimations('player'));
    this.cpuPlayer = new CpuPlayer(this, 1180, 720, 'right', this.createCharacterAnimations('cpu'));
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

  // TODO: rework this later
  private createCharacterAnimations = (characterPrefix: string): CharacterAnimations => {
    let characterAnimations: CharacterAnimations = {
      walk: '',
      idle: '',
      jump: '',
    };

    for (let animationType in CharacterAnimationType) {
      const animationName: string = CharacterAnimationType[animationType];
      const animationKey: string = `${characterPrefix}-${animationName}`;
      
      this.anims.create({
        key: animationKey,
        yoyo: true,
        repeat: -1,
        frames: this.anims.generateFrameNumbers(animationKey, {
          frames: [5, 4, 3, 2, 1]
        }),
        frameRate: animationName === CharacterAnimationType.WALK ? 10 : 5,
      });

      characterAnimations[animationName] = animationKey;
    }
    
    return characterAnimations;
  }
}
