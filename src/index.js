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
    resetGame();
    const imagesDuplicate = imagesBase.concat(imagesBase);
    const imagesShuffle = shuffleImages(imagesDuplicate);
    boardEnabled(); 
function shuffleImages (duplicateImages) {
    const images = duplicateImages;
    for (let i = images.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
    
    return images;
}


function boardEnabled() {
for (let card of $cards) {
        card.classList.replace('disabled', 'enabled');
    }
}


}
function resetGame () {
    score = 0;
    handleScore(score);
    count = 0;
    firstCard = null;

    if ($cards[0].hasChildNodes()) {
        removeCards();
    }
}


function removeCards () {
    for (let card of $cards) {
        card.firstElementChild.remove();
    }

    setUpGame();
}