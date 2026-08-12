import goblinImg from "../assets/goblin.png";

export default class Goblin {
  constructor(intervalTime = 1000) {
    this.intervalTime = intervalTime;
    this.currentCell = null;
    this.timerId = null;
    this.onMissCallback = null;

    this.element = document.createElement("img");

    this.element.src = goblinImg;

    this.element.classList.add("goblin-image");
  }

  appear(targetCell) {
    this.clear();

    this.currentCell = targetCell;
    this.currentCell.append(this.element);

    this.timerId = setTimeout(() => {
      this.miss();
    }, this.intervalTime);
  }

  subscribeOnMiss(callback) {
    this.onMissCallback = callback;
  }

  miss() {
    if (this.currentCell) {
      this.element.remove();
      this.currentCell = null;

      if (typeof this.onMissCallback === "function") {
        this.onMissCallback();
      }
    }
    this.destroyTimer();
  }

  clear() {
    this.element.remove();
    this.currentCell = null;
    this.destroyTimer();
  }

  destroyTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
