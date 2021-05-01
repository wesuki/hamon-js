export default class Wave {
  constructor(game, position, speed, range, initRadius) {
    this.game = game;

    this.position = position;
    this.speed = speed;
    this.range = range;
    this.radius = initRadius;

    this.active = true;
  }

  update(deltaTime) {
    if (this.active) {
      let newRadius = this.radius + (this.speed * deltaTime) / 1000;
      for (let stone of this.game.stones) {
        let dx = this.position.x - stone.position.x;
        let dy = this.position.y - stone.position.y;
        let d2 = dx * dx + dy * dy;
        let r2 = this.radius * this.radius;
        let nr2 = newRadius * newRadius;
        if (r2 < d2 && nr2 >= d2) {
          stone.handleWave(this);
        }
      }
      this.radius = newRadius;
      if (this.radius > this.range) {
        this.active = false;
      }
    }
  }

  draw(ctx) {
    if (this.active) {
      // wave front as a circle
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(127,127,255,${1.1 - this.radius / this.range})`;
      const lineWidth = ctx.lineWidth;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.lineWidth = lineWidth;
    }
  }
}
