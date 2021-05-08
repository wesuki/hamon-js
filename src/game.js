import { StoneConfig } from "/src/stone";
import Wave from "/src/wave";
import Background from "/src/background";

import InputHandler from "/src/input";
import {
  SelectLevelController,
  ShowSolutionController
} from "/src/controllers";

import { buildLevel, allLevels } from "/src/levels";

const GameState = {
  Menu: 0,
  Running: 1,
  Paused: 2,
  GameOver: 3
};

export default class Game {
  constructor(elements) {
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

    this.elements = elements;

    this.gameWidth = this.elements.canvas.width;
    this.gameHeight = this.elements.canvas.height;

    this.gameObjects = [];
    this.gameObjects.push(new Background(this));

    // game controls
    this.inputHandler = new InputHandler(this.elements.canvas, this);

    this.selectLevelMenuController = new SelectLevelController({
      game: this,
      selectElement: this.elements.selectLevel,
      levels: allLevels
    });

    this.elements.resetLevel.addEventListener("click", (event) => {
      this.resetCurrentLevel();
    });

    this.elements.previousLevel.addEventListener("click", (event) => {
      this.selectLevelMenuController.changeToPrevious();
    });

    this.elements.nextLevel.addEventListener("click", (event) => {
      this.selectLevelMenuController.changeToNext();
    });

    this.showSolutionController = new ShowSolutionController({
      game: this,
      elements
    });

    this.setLevel(this.selectLevelMenuController.getLevel());
  }

  setLevel(levelBluePrint) {
    this.levelBluePrint = levelBluePrint;
    this.resetCurrentLevel();
  }

  resetCurrentLevel() {
    this.level = buildLevel(this, this.levelBluePrint);
    this.stones = this.level.stones;
    this.waves = [];
    if (this.levelBluePrint.difficulty === "tutorial")
      this.showSolutionController.showSolution();
    else this.showSolutionController.hideSolution();
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
    if (this.isSolved()) this.setGameState(GameState.GameOver);
  }

  drawRunning(ctx) {
    [...this.gameObjects, ...this.stones, ...this.waves].forEach((object) => {
      object.draw(ctx);
    });
  }

  isSolved() {
    return (
      this.waves.length === 0 &&
      this.stones?.every((stone) => stone.N === stone.targetN)
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
