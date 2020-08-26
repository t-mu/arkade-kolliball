import MainScene from "../scenes/mainScene"

const scoreTextConfig: Phaser.Types.GameObjects.Text.TextStyle = {
  color: '#ffffff',
  fontFamily: '"Press Start 2P"',
  fontSize: '38px'
};

export default class ScoreText extends Phaser.GameObjects.Text {
  constructor(scene: MainScene, x: number, y: number) {
    super(scene, x, y, 'Score: 0', scoreTextConfig);
    scene.add.existing(this);
  }

  update = (score: number): void => {
    this.setText(`Score: ${score}`);
  }
}
