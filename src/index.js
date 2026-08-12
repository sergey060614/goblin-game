import Game from "./js/Game.js";
import './styles/main.css';

const container = document.querySelector(".game-container");
const boardEl = document.querySelector(".board");
const scoreEl = document.querySelector("#score"); 
const messageEl = document.querySelector("#message"); 

const game = new Game(container, boardEl, scoreEl, messageEl);
game.start();
const customCursor = document.querySelector("#custom-cursor");

if (customCursor) {
  customCursor.style.display = "block"; // Показываем кастомный молоток
  
  window.addEventListener("mousemove", (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  });
}