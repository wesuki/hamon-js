export default class InputHandler {
  constructor(canvas, game) {
    canvas.addEventListener("click", (event) => {
      // console.log(event);
      let pos = { x: event.offsetX, y: event.offsetY };
      for (let stone of game.stones) {
        if (stone.isPointInPath(pos)) {
          stone.handleClick(event);
          break;
        }
      }
    });

    var mouseDownStone;
    canvas.addEventListener("mousedown", (event) => {
      // console.log(event);
      let pos = { x: event.offsetX, y: event.offsetY };
      for (let stone of game.stones) {
        if (stone.isPointInPath(pos)) {
          stone.handleMouseDown(event);
          mouseDownStone = stone;
          break;
        }
      }
    });

    canvas.addEventListener("mouseup", (event) => {
      // console.log(event);
      if (mouseDownStone) mouseDownStone.handleMouseUp(event);
    });
  }
}
