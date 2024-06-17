'use strict';

const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

const maxScore = 100;
let totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

btnRoll.addEventListener('click', function () {
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  diceElement.classList.remove('hidden');
  diceElement.src = `dice${diceNumber}.png`;

  if (diceNumber !== 1) {
    currentScore += diceNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});

btnHold.addEventListener('click', function () {
  totalScores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    totalScores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  if (totalScores[activePlayer] >= maxScore) {
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
  }

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
});

btnNew.addEventListener('click', function () {
  totalScores[0] = 0;
  totalScores[1] = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  activePlayer = 0;
  currentScore = 0;
  diceElement.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
});
