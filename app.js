const rouletteBtn = document.querySelector('.ruleta');
const CPU = document.querySelector('.numbersCPU');
const playerPhisical = document.querySelector('.numbersPlayer');
const display = document.querySelector('.chosen-numbers');
const showResult = document.querySelector('.end_game');

let numbersCPU = [];
let numbersPlayer = [];
let listofNumbers = [];
const maxNumber = 90;
const arrayCapacity = 15;
let winner;

window.addEventListener('DOMContentLoaded', getNumbers(CPU, numbersCPU));
window.addEventListener('DOMContentLoaded', getNumbers(playerPhisical, numbersPlayer));

function startGame() {
  roulette();
  getWinner(playerPhisical, 'Player');
  getWinner(CPU, 'CPU');
}

rouletteBtn.addEventListener('click', startGame)

function getNumbers(player, array) {
  let sum = 0;
  do {
    const randomNumber = Math.floor(Math.random() * maxNumber + 1);
    if (!array.includes(randomNumber)) {
      array.push(randomNumber);
      sum++;
    } 
  } while (sum < arrayCapacity);
  array.forEach((number, i) => {
    const figure = document.createElement('div');
    figure.textContent = number;
    figure.classList.add('number', `number${i}`);
    player.appendChild(figure);
  });
  return array;
}

function roulette () {
  let randomNumber; 
  do {
    randomNumber = Math.floor(Math.random() * maxNumber) + 1;
  } while (listofNumbers.includes(randomNumber) && listofNumbers.length <= maxNumber);
  listofNumbers.push(randomNumber);
  const figure = document.createElement('div');
  figure.textContent = randomNumber;
  display.appendChild(figure);
  rouletteBtn.innerHTML = randomNumber;
  checkNumbers(CPU, numbersCPU, randomNumber);
  checkNumbers(playerPhisical, numbersPlayer, randomNumber);
}

function checkNumbers (player, arrayPlayer, number) {
  if (arrayPlayer.some(elemento => elemento === number)) {
    const spotted = arrayPlayer.indexOf(number);
    const btn = player.querySelector(`.number${spotted}`);
    btn.classList.add('numberCrossed');
  } 
}

function getWinner(player, winnerAll) {
  let paquito = 0;
  const btns = player.querySelectorAll('.number');
  btns.forEach((element) => {
    if (element.classList.contains('numberCrossed')) paquito++;
  })
  console.log(paquito);
  if (paquito === 15) winner = winnerAll; 
  console.log(winner);
  showResults();
}

function showResults() {
  if (winner !== undefined) {
    const winnerPosted = document.createElement('p');
    winnerPosted.classList.add('ppp');
    winnerPosted.textContent = `${winner} WINS!`;
    showResult.insertAdjacentElement('afterbegin', winnerPosted)
    showResult.classList.add('showResult');
    rouletteBtn.removeEventListener('click', startGame)
  } 
} 

function exitGame() {
  showResult.classList.remove('showResult');
}

function resetAll() {
  numbersCPU = [];
  CPU.innerHTML = '';
  numbersPlayer = [];
  playerPhisical.innerHTML = '';
  listofNumbers = [];
  display.innerHTML = '';
  getNumbers(playerPhisical, numbersPlayer);
  getNumbers(CPU, numbersCPU);
  winner = undefined;
  rouletteBtn.innerHTML = 'Sacar número';
  rouletteBtn.addEventListener('click', startGame);
  showResult.classList.remove('showResult');
}

document.querySelector('.exit').addEventListener('click', exitGame);

document.querySelector('.again').addEventListener('click', resetAll);