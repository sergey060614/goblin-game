import Board from "./Board.js";
import Goblin from "./Goblin.js";
import Score from "./Score.js";

export default class Game {
  static DEFAULT_SPAWN_INTERVAL = 1500;
  static GOBLIN_LIFETIME = 1000;
  static MAX_MISSES = 5;

  constructor(container, boardEl, scoreEl, messageEl) {
    this.container = container;
    this.messageEl = messageEl;

    this.score = new Score(scoreEl);
    this.board = new Board(boardEl);

    this.goblin = new Goblin(Game.GOBLIN_LIFETIME);

    this.misses = 0;
    this.hits = 0;
    this.maxMisses = Game.MAX_MISSES;
    this.isActive = false;
    this.gameInterval = null;
    this.currentTargetCell = null;
    this.lastCellIndex = null;

    // Регистрация автоматического промаха гоблина по таймеру
    this.goblin.subscribeOnMiss(() => this.registerMiss());

    this.board.subscribeOnClick((cell) => this.handleCellClick(cell));
  }

  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.misses = 0;
    this.hits = 0;
    this.lastCellIndex = null;

    this.score.reset();
    this.messageEl.classList.add("hidden");
    this.renderScores();

    this.spawnLoop();
  }

  getRandomUniqueIndex(cells) {
    const count = cells.length;
    if (count <= 1) return 0;

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * count);
    } while (newIndex === this.lastCellIndex);

    this.lastCellIndex = newIndex;
    return newIndex;
  }

  moveGoblin() {
    const cells = this.board.getElements();
    const nextIndex = this.getRandomUniqueIndex(cells);
    const targetCell = cells[nextIndex];

    this.goblin.appear(targetCell);
    this.currentTargetCell = targetCell;
  }

  handleCellClick(cell) {
    if (!this.isActive || !cell) return;

    // Проверяем, есть ли картинка гоблина внутри кликнутой ячейки
    const hasGoblin = cell.querySelector(".goblin-image");

    if (hasGoblin) {
      this.hits++;
      this.renderScores(); // Синхронно обновляем интерфейс счета

      this.goblin.clear(); // Прячем гоблина и сбрасываем его таймер
      this.currentTargetCell = null;
    }
  }

  registerMiss() {
    this.currentTargetCell = null;
    this.misses++;
    this.renderScores(); // Синхронно обновляем интерфейс промахов

    if (this.misses >= this.maxMisses) {
      this.finish();
    }
  }

  spawnLoop() {
    this.moveGoblin();

    this.gameInterval = setInterval(() => {
      this.moveGoblin();
    }, Game.DEFAULT_SPAWN_INTERVAL);
  }

  renderScores() {
    if (typeof this.score.update === "function") {
      this.score.update(this.hits, this.misses);
    }
  }

  finish() {
    this.isActive = false;
    clearInterval(this.gameInterval);
    this.goblin.clear();

    this.messageEl.classList.remove("hidden");
    this.messageEl.textContent = `Игра окончена! Вы пропустили ${this.misses} гоблинов. Ваш результат попаданий: ${this.hits}`;
  }
}
