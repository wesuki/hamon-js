export class SelectLevelController {
  constructor({ game, selectElement, levels }) {
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
      // console.log(event);
    });
  }

  getLevel() {
    return this.levels[this.selectElement.value];
  }

  changeToPrevious() {
    let index = this.selectElement.selectedIndex - 1;
    if (0 <= index) {
      this.selectElement.selectedIndex = index;
      let event = new Event("change");
      this.selectElement.dispatchEvent(event);
    } else {
      alert(`
      You are at the beginning.
      There is no previous level.
      `);
    }
  }

  changeToNext() {
    let index = this.selectElement.selectedIndex + 1;
    if (index < this.selectElement.options.length) {
      this.selectElement.selectedIndex = index;
      let event = new Event("change");
      this.selectElement.dispatchEvent(event);
    } else {
      alert(`
      You are at the end.
      There is no next level.
      `);
    }
  }
}

export class ShowSolutionController {
  constructor({ game, elements }) {
    this.elements = elements;
    this.game = game;

    this.elements.showSolution.addEventListener("click", (event) => {
      if (this.elements.showSolution.value === "show") {
        this.showSolution();
      } else {
        this.hideSolution();
      }
    });
  }

  getLevelBluePrint() {
    return this.game.levelBluePrint;
  }

  checkPasscode() {
    let userInput = prompt("Passcode:", "[level name as it is]");
    let result = userInput?.trim() === this.getLevelBluePrint().name.trim();
    if (!result) {
      alert("Sorry, wrong passcode.");
    }
    return result;
  }

  showSolution() {
    const levelBluePrint = this.getLevelBluePrint();
    const isTutorial = levelBluePrint.difficulty === "tutorial";
    const textType = isTutorial ? "Tutorial" : "Solution";
    if (isTutorial || this.checkPasscode()) {
      this.elements.showSolution.value = "hide";
      this.elements.showSolution.innerText = `Hide ${textType}`;
      const text =
        (isTutorial ? levelBluePrint.tutorial : levelBluePrint.howtosolve) ??
        "(not found)";
      this.elements.solutionText.innerText = `${textType}: ${text}`;
    }
  }

  hideSolution() {
    const levelBluePrint = this.getLevelBluePrint();
    const isTutorial = levelBluePrint.difficulty === "tutorial";
    const textType = isTutorial ? "Tutorial" : "Solution";
    this.elements.showSolution.value = "show";
    this.elements.showSolution.innerText = `Show ${textType}`;
    this.elements.solutionText.innerText = null;
  }
}
