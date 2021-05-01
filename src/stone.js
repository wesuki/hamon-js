export const StoneConfig = {
  radius: 10,
  activeColor: "blue",
  inactiveColor: "red",
  waveRangeColor: "grey"
};

export default class Stone {
  constructor(game, position, targetN, initN) {
    this.game = game;

    this.position = position;
    this.radius = StoneConfig.radius;

    this.targetN = targetN;
    this.initN = initN;
    this.N = this.initN;

    this.showRange = false;
  }

  update(deltaTime) {}

  draw(ctx) {
    // stone itself
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle =
      this.N > 0 ? StoneConfig.activeColor : StoneConfig.inactiveColor;
    ctx.fill();

    // target count
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(this.targetN, this.position.x, this.position.y + 5);

    // current count
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(this.N, this.position.x, this.position.y - 12);

    if (this.showRange) {
      // range front as a circle
      ctx.beginPath();
      ctx.arc(
        this.position.x,
        this.position.y,
        this.game.level.waveRange,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = StoneConfig.waveRangeColor;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  isPointInPath(position) {
    let dx = position.x - this.position.x;
    let dy = position.y - this.position.y;
    let r = this.radius;
    return dx * dx + dy * dy <= r * r;
  }

  handleMouseDown(event) {
    this.showRange = true;
    this.mouseDownTime = event.timeStamp;
  }

  handleMouseUp(event) {
    this.showRange = false;
  }

  handleClick(event) {
    console.log("Clicked");
    if (this.N > 0 && event.timeStamp < this.mouseDownTime + 500) {
      this.N = 0;
      this.game.waves.push(this.game.newWaveAt(this.position));
    }
  }

  handleWave(wave) {
    this.N += 1;
  }
}
