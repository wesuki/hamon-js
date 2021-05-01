import { Stone, StoneConfig } from "/src/stone";
import Wave from "/src/wave";

import InputHandler from "/src/input";

import { buildLevel, testLevel } from "/src/levels";

const GameState = {
  Menu: 0,
  Running: 1,
  Paused: 2,
  GameOver: 3
};

export default class Game {
  constructor(canvas) {
    let prepareFunctions = {};
    prepareFunctions[GameState.GameOver] = this.prepareGameOver;
    this.prepareFunctions = prepareFunctions;

    let updateFunctions = {};
    updateFunctions[GameState.Running] = this.updateRunning;
    updateFunctions[GameState.GameOver] = this.updateGameOver;
    this.updateFunctions = updateFunctions;

    let drawFunctions = {};
    drawFunctions[GameState.Running] = this.drawRunning;
    drawFunctions[GameState.GameOver] = this.drawGameOver;
    this.drawFunctions = drawFunctions;

    this.canvas = canvas;

    this.gameWidth = canvas.width;
    this.gameHeight = canvas.height;

    this.gameObjects = [];

    this.level = buildLevel(this, testLevel);
    this.stones = this.level.stones;
    this.waves = [];

    this.inputHandler = new InputHandler(this.canvas, this);
    // console.log(this);
    this.setGameState(GameState.Running);
  }

  setGameState(newState) {
    if (newState === this.gameState) return;
    this.gameState = newState;
    this.prepare = this.prepareFunctions[this.gameState];
    if (this.prepare) this.prepare();
    this.update = this.updateFunctions[this.gameState];
    this.draw = this.drawFunctions[this.gameState];
  }

  prepareGameOver() {
    this.solved = this.isSolved();
  }

  updateGameOver(deltaTime) {}

  drawGameOver(ctx) {
    [...this.gameObjects, ...this.stones].forEach((object) => {
      object.draw(ctx);
    });

    ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = "rgba(0.5,0.5,0.5,0.5)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    const verdict = this.solved ? "Solved!" : "Out of Move";
    ctx.fillText(verdict, this.gameWidth / 2, this.gameHeight / 2);
  }

  updateRunning(deltaTime) {
    [...this.gameObjects, ...this.stones, ...this.waves].forEach((object) => {
      object.update(deltaTime);
    });
    // let prevLength = this.waves.length
    this.waves = this.waves.filter((wave) => wave.active);
    // let afterLength = this.waves.length
    // if (prevLength !== afterLength) console.log(this.waves.length)
    if (this.isSolved() || this.isFailed())
      this.setGameState(GameState.GameOver);
  }

  drawRunning(ctx) {
    [...this.gameObjects, ...this.stones, ...this.waves].forEach((object) => {
      object.draw(ctx);
    });

    // if (this.gamestate === GAMESTATE.Paused) {
    //   ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    //   ctx.fillStyle = "rgba(0,0,0,0.5)";
    //   ctx.fill();

    //   ctx.font = "30px Arial";
    //   ctx.fillStyle = "white";
    //   ctx.textAlign = "center";
    //   ctx.fillText(
    //       "Paused",
    //       this.gameWidth / 2,
    //       this.gameHeight / 2,
    //     );
    // }

    // if (this.gamestate === GAMESTATE.Menu) {
    //   ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    //   ctx.fillStyle = "rgba(0,0,0,1)";
    //   ctx.fill();

    //   ctx.font = "30px Arial";
    //   ctx.fillStyle = "white";
    //   ctx.textAlign = "center";
    //   ctx.fillText(
    //     "Press SPACEBAR To Start",
    //     this.gameWidth / 2,
    //     this.gameHeight / 2,
    //   );
    // }
    // if (this.gamestate === GAMESTATE.GameOver) {
    //   ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    //   ctx.fillStyle = "rgba(0,0,0,1)";
    //   ctx.fill();

    //   ctx.font = "30px Arial";
    //   ctx.fillStyle = "white";
    //   ctx.textAlign = "center";
    //   ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    // }
  }

  //   togglePause() {
  //     if (this.gamestate == GAMESTATE.Paused) {
  //       this.gamestate = GAMESTATE.Running;
  //     } else {
  //       this.gamestate = GAMESTATE.Paused;
  //     }
  //   }

  isSolved() {
    return (
      this.waves.length === 0 &&
      this.stones.every((stone) => stone.N === stone.targetN)
    );
  }

  isFailed() {
    return (
      this.waves.length === 0 && this.stones.every((stone) => stone.N === 0)
    );
  }

  newWaveAt(position) {
    return new Wave(
      /*game*/ this,
      /*position*/ position,
      /*speed*/ this.level.waveSpeed,
      /*range*/ this.level.waveRange,
      /*initRadius*/ StoneConfig.radius
    );
  }
}
