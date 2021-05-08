import "./styles.css";
import Game from "/src/game";

document.getElementById("app").innerHTML = `
<div class="container">
<span class="title">Hamon</span>
<span class="version">v${process.env.npm_package_version}+${process.env.BUILD_VERSION}</span>
</div>
<div>
  Touch stones. Make waves. Make every stone shine.
</div>
<br/>
<div>
  Current Level:
  <select id="selectLevel"></select>
  <button id="previousLevel">Previous Level</button>
  <button id="resetLevel">Reset Level</button>
  <button id="nextLevel">Next Level</button>
</div>
<div>
</div>
<div>
  <canvas id="gameScreen"></canvas>
</div>
<div>
  <button id="showSolution">Show Solution</button>
  <div id="solutionText"></div>
</div>
`;

let canvas = document.getElementById("gameScreen");
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");

let elements = {
  canvas: canvas,
  selectLevel: document.getElementById("selectLevel"),
  resetLevel: document.getElementById("resetLevel"),
  nextLevel: document.getElementById("nextLevel"),
  previousLevel: document.getElementById("previousLevel"),
  showSolution: document.getElementById("showSolution"),
  solutionText: document.getElementById("solutionText")
};

let game = new Game(elements);

function startGameLoop() {
  var lastTime;
  function gameLoop(timestamp) {
    if (timestamp !== undefined) {
      if (lastTime !== undefined) {
        let deltaTime = timestamp - lastTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
      }
      lastTime = timestamp;
      game.draw(ctx);
    }
    requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame(gameLoop);
}

startGameLoop();
