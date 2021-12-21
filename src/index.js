const btnStart = document.querySelector('#btn-start');
const btnRestart = document.querySelector('#btn-restart');

const imagesBase = ['boston-celtics', 'chicago-bulls', 'golden-state-warriors', 'houston-rockets', 'los-angeles-lakers', 'miami-heat', 'phoenix-suns', 'san-antonio-spurs'];

const $boardGame = document.querySelector('#board');
const $cards = $boardGame.querySelectorAll('.cards');

let score = 00;
let count = 0;
let firstCard = null;

btnStart.onclick = setUpGame;
btnRestart.onclick = removeCards;

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
        newImageCard.name = `${images[i]}`;

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


function handleClickCard(card) {
    showCard(card);

    if (firstCard === null) {
        firstCard = card;
    } else {

        score++;
        handleScore(score);
        
        if (firstCard.parentElement.id !== card.parentElement.id) {
            if (card.parentElement.classList.contains('disabled')) {
                return;
            }
            if (checkPair(card)) {
                handleCoincidence(card);
            } else {
                handleError(card);
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


function showCard(card){
    card.classList.replace('hidden-card', 'show-card');
    card.classList.add('highlight');
}


function handleScore(score) {
    const $score = document.querySelector('.score-indicator');

    $score.textContent = `Score: ${score.toString().padStart(2, '0')}`;
}


function checkPair(lastCard) {
    return firstCard.id === lastCard.id; 
}


function handleCoincidence (actualCard) {

    highlightSuccess(actualCard);
    
    setTimeout(function() {
        disableCards(actualCard);
        count++;
        
        if (checkEndGame(count)) {
            handleEndGame();
        } else {
            firstCard = null;
        }
    }, 500);
}


function highlightSuccess (actualCard) {
    firstCard.classList.replace('highlight' , 'success');
    actualCard.classList.replace('highlight', 'success');
}


function disableCards (actualCard) {
    firstCard.classList.toggle('success');
    firstCard.parentElement.classList.replace('enabled', 'disabled');

    actualCard.classList.toggle('success');
    actualCard.parentElement.classList.replace('enabled', 'disabled');
}


function checkEndGame () {
    return count === imagesBase.length;
}


function handleEndGame() {
    setTimeout(function(){
        setScore();
        showModal();
    }, 1000)
}


function setScore () {
    const $score = document.querySelector('#score');
    $score.textContent = score;
}


function showModal (){
    $('#myModal').modal('show');
}


function handleError(actualCard) {
    highlightError(actualCard);
    setTimeout(function() {
        hideCards(actualCard);
    }, 500);
}

function highlightError (actualCard) {
    firstCard.classList.replace('highlight', 'error');
    actualCard.classList.replace('highlight', 'error');
    
}


function hideCards(actualCard) {
        firstCard.classList.toggle('error');
        firstCard.classList.replace('show-card', 'hidden-card');
    
        actualCard.classList.toggle('error');
        actualCard.classList.replace('show-card', 'hidden-card');    

        firstCard = null;
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