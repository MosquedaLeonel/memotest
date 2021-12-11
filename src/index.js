const btnStart = document.querySelector('#btn-start');
const btnRestart = document.querySelector('#btn-restart');

const imagesBase = ['boston-celtics', 'chicago-bulls', 'golden-state-warriors', 'houston-rockets', 'los-angeles-lakers', 'miami-heat', 'phoenix-suns', 'san-antonio-spurs'];

const $boardGame = document.querySelector('#board');
const $cards = $boardGame.querySelectorAll('.cards');

let score = 0;
let count = 0;
let firstCard = null;

btnStart.onclick = setUpGame;
function setUpGame(){
}
