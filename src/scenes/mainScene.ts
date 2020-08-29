import Ball from '../objects/ball';
import ScoreText from '../objects/scoreText';
import PlayerCharacter from '../objects/playerCharacter';
import Net from '../objects/net';
import CpuCharacter from '../objects/cpuCharacter';
import { Court, HotKey, KeyboardKey } from '../types';
import { bindHotKeyToScene } from '../utils/utils';
import { ARENA_CENTER_X, ARENA_CENTER_Y, ARENA_HEIGHT, ARENA_WIDTH } from '../constants';

export default class MainScene extends Phaser.Scene {
  scoreText: Phaser.GameObjects.Text;
  scoreText2: Phaser.GameObjects.Text;
  playerScore = 0;
  cpuScore = 0;
  ball: Ball;
  player: PlayerCharacter;
  cpuPlayer: CpuCharacter;
  keys: Phaser.Types.Input.Keyboard.CursorKeys;
  net: Phaser.Physics.Arcade.Sprite;
  music: Phaser.Sound.BaseSound;
  musicControls: Phaser.GameObjects.Image;
  muted = false;

  constructor() {
    super({ key: 'MainScene' });
  }

  create = (): void => {
    const bg = this.add.image(ARENA_CENTER_X, ARENA_CENTER_Y, 'background').setOrigin(0.5);
    bg.scale = 4;

    this.scoreText = new ScoreText(this, 10, 10);
    this.scoreText2 = new ScoreText(this, ARENA_WIDTH - 10, 10);
    this.scoreText2.setOrigin(1, 0);

    this.net = new Net(this, ARENA_CENTER_X, 0.75 * ARENA_HEIGHT);
    this.ball = new Ball(this, ARENA_CENTER_X, 0);
    this.resetBall();

    this.player = new PlayerCharacter(this, 'player', Court.LEFT);
    this.cpuPlayer = new CpuCharacter(this, 'cpu', Court.RIGHT);

    this.initMusic();
    this.bindHotKeys();

    this.scene.scene.events.on('resume', () => {
      if (!this.muted && this.music.isPaused) {
        this.music.resume();
      }
    });
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

  public toggleMusic = (): void => {
    this.muted ? this.unMute() : this.mute();
  }

  private mute = (): void => {
    this.muted = true;
    this.musicControls.setTexture('music-off');
    this.music.pause();
  }

  private unMute = (): void => {
    this.muted = false;
    this.musicControls.setTexture('music-on');
    this.music.resume();
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
    this.ball.x = ARENA_CENTER_X;
    this.ball.y = 30;
    this.ball.setVelocityX(Math.random() > 0.5 ? 35 : -35);
    this.ball.setVelocityY(0);
  }

  private bindHotKeys = (): void => {
    const mute: HotKey = {
      key: KeyboardKey.M,
      action: () => this.toggleMusic(),
    }

    const pause: HotKey = {
      key: KeyboardKey.P,
      action: () => {
        this.music.pause();
        this.scene.pause();
        this.scene.launch('PauseScene');
      },
    }

    bindHotKeyToScene(this)(mute);
    bindHotKeyToScene(this)(pause);
  }

  private initMusic = (): void => {
    this.musicControls = this.add.image(ARENA_WIDTH - 20, 60, 'music-on').setOrigin(1, 0);
    this.musicControls.setInteractive();
    this.musicControls.scale = 4;
    this.musicControls.on('pointerdown', () => {
      this.toggleMusic();
    });

    this.music = this.sound.add('music', {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    });
    this.music.play();
  }
}
