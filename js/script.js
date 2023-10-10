function addLeft(number) {
    let score = document.getElementById("placarLeft")
    
    let currentValue = parseInt(score.textContent);

    if (number === -1 && currentValue <= 0) {
        return;
    }
    
    currentValue += number;

    score.textContent = currentValue.toString().padStart(2, '0');
}

function addRight(number) {
    let score = document.getElementById("placarRight")

    let currentValue = parseInt(score.textContent);

    if (number === -1 && currentValue <= 0) {
        return;
    }

    currentValue += number;

    score.textContent = currentValue.toString().padStart(2, '0');
}

function resetAll() {
    let score = document.getElementById("placarRight")
    score.textContent = '00';

    score = document.getElementById("placarLeft")
    score.textContent = '00';
}

const remL = document.getElementById('remL');
const addL = document.getElementById('addL');

remL.onclick = function () {addLeft(-1);};
addL.onclick = function () {addLeft(1);}

const remR = document.getElementById('remR');
const addR = document.getElementById('addR');

remR.onclick = function () {addRight(-1);};
addR.onclick = function () {addRight(1);}

const resA = document.getElementById('resetAll');

resA.onclick = function () {resetAll()}

let timerInterval;
let timeLeft = 600; // 10 minutos em segundos
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const add30Button = document.getElementById('add');

let startIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>`

let pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
</svg>`;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function toggleStartPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        startButton.innerHTML = startIcon;
    } else {
        startButton.innerHTML = pauseIcon;
        startTimer();
    }
    isRunning = !isRunning;
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            alert("Tempo esgotado!");
            isRunning = false;
            startButton.innerHTML = startIcon;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 600;
    updateTimerDisplay();
    startButton.innerHTML = startIcon;
    isRunning = false;
}

function add30Seconds() {
    timeLeft += 30;
    if (!isRunning) {
        updateTimerDisplay();
    }
}

startButton.addEventListener('click', toggleStartPause);
resetButton.addEventListener('click', resetTimer);
add30Button.addEventListener('click', add30Seconds);

updateTimerDisplay();