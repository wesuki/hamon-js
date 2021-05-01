import "./styles.css";
import Game from "/src/game";

document.getElementById("app").innerHTML = `
<h1>Hamon</h1>
<div>
Touch stones. Make waves. Match numbers.
</div>
`;

const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;

let canvas = document.getElementById("gameScreen");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
let ctx = canvas.getContext("2d");

let game = new Game(canvas);

function startGameLoop() {
  var lastTime;
  function gameLoop(timestamp) {
    if (timestamp !== undefined) {
      if (lastTime !== undefined) {
        let deltaTime = timestamp - lastTime;
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
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
