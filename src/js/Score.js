export default class Score {
  constructor(element) {
    this.element = element;
    this.count = 0;
  }

  increment() {
    this.count++;
    this.render();
  }

  reset() {
    this.count = 0;
    this.render();
  }

  render() {
    this.element.textContent = `Счёт: ${this.count}`;
  }
}
