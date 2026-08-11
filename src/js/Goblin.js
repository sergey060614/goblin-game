export default class Goblin {
  constructor(intervalTime = 1000) {
    this.intervalTime = intervalTime;
    this.currentCell = null;
    this.timerId = null;
    this.onMissCallback = null;
  }

  appear(cells) {
    if (this.currentCell) {
      this.currentCell.classList.remove("goblin");
    }

    const randomIndex = Math.floor(Math.random() * cells.length);
    this.currentCell = cells[randomIndex];
    this.currentCell.classList.add("goblin");

    this.timerId = setTimeout(() => {
      this.miss();
    }, this.intervalTime);
  }

  subscribeOnMiss(callback) {
    this.onMissCallback = callback;
  }

  miss(silent = false) {
    if (this.currentCell) {
      this.currentCell.classList.remove("goblin");

      if (typeof this.onMissCallback === "function" && !silent) {
        this.onMissCallback();
      }

      this.currentCell = null;
    }
    clearTimeout(this.timerId);
  }

  destroyTimer(silent = false) {
    clearTimeout(this.timerId);
  }
}
