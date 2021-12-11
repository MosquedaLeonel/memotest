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
    configureDashboard(imagesShuffle);
    handleEvents();
}


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


function configureDashboard(images) {

    for (let i = 0; i < images.length; i++) {
        const card = $cards[i];
        
        const newImageCard = document.createElement('img');
        newImageCard.src = `assets/images/${images[i]}.png`;
        newImageCard.id = `${images[i]}`;
        newImageCard.classList.add('card-image', 'hidden-card');

        card.appendChild(newImageCard);
    }
}


function handleEvents(){
    $boardGame.onclick = function(e){

        const $actualCard = e.target;
        
        if (validateClick($actualCard)) {
                handleClickCard($actualCard);
        }
    }
}


    }
}

function validateClick (card) {
    if (card.classList.contains('board')) {
        return false;
    }

    if (card === firstCard) {
        return false;
    }

    if (card.parentElement.classList.contains('disabled')) {
        return false;
    }

    return true;
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