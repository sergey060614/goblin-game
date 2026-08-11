import Board from "./Board.js";
import Goblin from "./Goblin.js";
import Score from "./Score.js";

export default class Game {
  constructor(container, boardEl, scoreEl, messageEl) {
    this.container = container;
    this.messageEl = messageEl;

    this.score = new Score(scoreEl);
    this.board = new Board(boardEl);
    this.goblin = new Goblin(1000);

    this.misses = 0;
    this.maxMisses = 5;
    this.isActive = false;
    this.gameInterval = null;
    this.currentTargetCell = null;

    this.goblin.subscribeOnMiss(() => this.registerMiss());
  }

  init() {
    this.bindEvents();
    this.start();
  }

  bindEvents() {
    this.board.subscribeOnClick((cell) => this.handleCellClick(cell));
  }

  unbindEvents() {
    if (typeof this.board.unsubscribe === "function") {
      this.board.unsubscribe();
    }
  }

  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.misses = 0;
    this.score.reset();
    this.messageEl.classList.add("hidden");
    this.renderMissStatus();

    this.spawnLoop();
  }

  spawnLoop() {
    this.gameInterval = setInterval(() => {
      this.goblin.appear(this.board.getElements());
      this.currentTargetCell = this.goblin.currentCell;
    }, 1500);
  }

  handleCellClick(cell) {
    if (!this.isActive) return;

    if (cell === this.currentTargetCell && cell.classList.contains("goblin")) {
      this.goblin.miss();
      this.score.increment();
    }
  }

  registerMiss() {
    this.currentTargetCell = null;

    this.misses++;
    this.renderMissStatus();

    if (this.misses >= this.maxMisses) {
      this.finish();
    }
  }

  renderMissStatus() {
    console.log(`Промахов: ${this.misses} из ${this.maxMisses}`);
  }

  finish() {
    this.isActive = false;

    clearInterval(this.gameInterval);

    this.goblin.destroyTimer(true);

    if (this.goblin.currentCell) {
      this.goblin.currentCell.classList.remove("goblin");
    }

    this.unbindEvents();

    this.messageEl.classList.remove("hidden");
  }
}
