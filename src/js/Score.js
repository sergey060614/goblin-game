export default class Score {
  constructor(element) {
    this.element = element; 
    
    this.hitsElement = document.querySelector("#hits");
    this.missesElement = document.querySelector("#misses");
    
    this.hits = 0;
    this.misses = 0;
  }

  update(hits, misses) {
    this.hits = hits;
    this.misses = misses;
    this.render();
  }

  reset() {
    this.hits = 0;
    this.misses = 0;
    if (this.element) {
      this.element.textContent = ""; 
    }
    this.render();
  }

  render() {
    if (this.hitsElement) {
      this.hitsElement.textContent = `Попаданий: ${this.hits}`;
    }
    if (this.missesElement) {
      this.missesElement.textContent = `Промахов: ${this.misses}`;
    }
  }
}
