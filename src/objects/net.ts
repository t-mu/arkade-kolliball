import GameScene from "../scenes/gameScene";

export default class Net extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'net');

    this.scene.add.existing(this);
    this.scene.physics.add.staticGroup([this]);
    this.body.immovable = true;
  }
}