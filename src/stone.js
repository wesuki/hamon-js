export const StoneConfig = {
  radius: 10,
  activeColor: "#582520",
  inactiveColor: "#582520", //"#a5655499",
  waveRangeColor: "grey",
  ringWidth: 3,
  successColor: "#ffe19a",
  indicatorColor: "#cb835599"
  // colors from: https://coolors.co/ffe19a-ffc15d-cb8355-a56554-582520
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
    // target indicator
    // a dashed circle, distance to stone indicates the target
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius + StoneConfig.ringWidth * (this.targetN + 1),
      0,
      2 * Math.PI
    );
    ctx.strokeStyle = StoneConfig.waveRangeColor;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    for (let i = this.targetN - this.N + 1; i > 0; i--) {
      ctx.beginPath();
      ctx.arc(
        this.position.x,
        this.position.y,
        this.radius + StoneConfig.ringWidth * i,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = StoneConfig.indicatorColor;
      ctx.fill();
    }

    // fulfilled indicator
    // this must be before the stone circle in orde to appear as a ring
    if (this.N <= this.targetN) {
      ctx.beginPath();
      ctx.arc(
        this.position.x,
        this.position.y,
        this.radius + StoneConfig.ringWidth,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = StoneConfig.successColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(
        this.position.x,
        this.position.y,
        this.radius + StoneConfig.ringWidth,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = StoneConfig.waveRangeColor;
      ctx.stroke();
    }

    // stone itself
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle =
      this.N > 0 ? StoneConfig.activeColor : StoneConfig.inactiveColor;
    ctx.fill();

    // // target count
    // ctx.font = "12px Arial";
    // ctx.fillStyle = "white";
    // ctx.textAlign = "center";
    // ctx.fillText(this.targetN, this.position.x, this.position.y + 5);

    // // current count
    // ctx.font = "15px Arial";
    // ctx.fillStyle = "black";
    // ctx.textAlign = "center";
    // ctx.fillText(this.N, this.position.x, this.position.y - 12);

    // // simplified count
    // ctx.font = "12px Arial";
    // ctx.fillStyle = "white";
    // ctx.textAlign = "center";
    // ctx.fillText(this.targetN - this.N, this.position.x, this.position.y + 5);

    if (this.N === 0) {
      // draw an "X"
      ctx.font = "12px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("X", this.position.x, this.position.y + 4);
    }

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
