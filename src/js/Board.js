export default class Board {
  constructor(container, size = 4) {
    this.container = container;
    this.size = size;
    this.cells = [];
    this.onCellClickCallback = null;

    this.boundClickHandler = this.handleClick.bind(this);

    this.createCells();
    this.initListeners();
  }

  createCells() {
    this.container.innerHTML = "";
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      this.container.append(cell);
      this.cells.push(cell);
    }
  }

  initListeners() {
    this.container.addEventListener("click", this.boundClickHandler);
  }

  handleClick(event) {
    const cell = event.target.closest(".cell");

    if (cell && typeof this.onCellClickCallback === "function") {
      this.onCellClickCallback(cell);
    }
  }

  subscribeOnClick(callback) {
    this.onCellClickCallback = callback;
  }

  getElements() {
    return this.cells;
  }

  unsubscribe() {
    this.container.removeEventListener("click", this.boundClickHandler);
    this.onCellClickCallback = null;
  }
}
