import "./styles/main.css";
import Game from "./js/Game.js";

document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.querySelector(".game-container");
  const boardElement = document.querySelector(".board");
  const scoreElement = document.getElementById("score");
  const messageElement = document.getElementById("message");

  new Game(gameContainer, boardElement, scoreElement, messageElement).init();
});
