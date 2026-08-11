export default class Board {
  constructor(container, size = 4) {
    this.container = container;
    this.size = size;
    this.cells = [];
    this.onCellClickCallback = null;
    this.createCells();
  }

  createCells() {
    this.container.innerHTML = "";
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      // Привязываем обработчик к каждой ячейке
      cell.addEventListener("click", () => {
        if (typeof this.onCellClickCallback === "function") {
          this.onCellClickCallback(cell);
        }
      });

      this.container.appendChild(cell);
      this.cells.push(cell);
    }
  }

  subscribeOnClick(callback) {
    this.onCellClickCallback = callback;
  }

  getElements() {
    return this.cells;
  }

  unsubscribe() {
    this.cells.forEach((cell) => {
      cell.replaceWith(cell.cloneNode(true));
    });

    this.cells = Array.from(this.container.querySelectorAll(".cell"));
  }
}
