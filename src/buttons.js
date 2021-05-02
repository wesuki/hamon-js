export class SelectLevelController {
  constructor(selectElement, game, levels) {
    this.selectElement = selectElement;
    this.game = game;
    this.levels = levels;

    levels.forEach((level, i) => {
      let option = document.createElement("option");
      option.value = i;
      option.text = `(${level.difficulty}) ${level.name}`;
      selectElement.appendChild(option);
    });

    selectElement.addEventListener("change", (event) => {
      let levelSelected = levels[event.target.selectedIndex];
      if (levelSelected) this.game.setLevel(levelSelected);
      console.log(event);
    });
  }

  getLevel() {
    return this.levels[this.selectElement.value];
  }

  changeToNext() {
    this.selectElement.selectedIndex =
      (this.selectElement.selectedIndex + 1) %
      this.selectElement.options.length;
    let event = new Event("change");
    this.selectElement.dispatchEvent(event);
  }
}
