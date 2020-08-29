import GameScene from "../scenes/gameScene";

const velocityMultiplier = 20;

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  spin = 2;
  spinAdjustment = 2;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'kolliball')

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.onCollide = true;
    this.body.setMass(0.75);
    this.body.setCircle(50);

    this.initCollisionDetection();
  }

  update = (): void => {
    this.spin = this.spin + this.spinAdjustment;
    this.setAngle(this.spin);
  }

  adjustSpin = (): void => {
    const { left, right, up, down } = this.body.touching;
    const spinRight = (left && down) || (right && up);
    this.spinAdjustment = spinRight ? this.spinAdjustment : -this.spinAdjustment;
  }

  private initCollisionDetection = (): void => {
    this.setCollideWorldBounds(true)
      .setBounce(0.6);
  }
}
