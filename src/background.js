export default class Background {
  constructor(game) {
    this.game = game;
  }

  update(deltaTime) {}

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(0, 0, this.game.gameWidth, this.game.gameHeight);
    ctx.fillStyle = "#d8e2dc";
    ctx.fill();
  }
}
