import GameScene from "../scenes/gameScene"
import { textBaseConfig } from "../utils/typography";

export default class ScoreText extends Phaser.GameObjects.Text {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'Score: 0', textBaseConfig);
    scene.add.existing(this);
  }

  update = (score: number): void => {
    this.setText(`Score: ${score}`);
  }
}
