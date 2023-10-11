function addLeft(number) {
    let score = document.getElementById("placarLeft")
    
    let currentValue = parseInt(score.textContent);

    if (number === -1 && currentValue <= 0) return;

    if (currentValue === 99) return;

    currentValue += number;

    score.textContent = currentValue.toString().padStart(2, '0');
}

function addRight(number) {
    let score = document.getElementById("placarRight")

    let currentValue = parseInt(score.textContent);

    if (number === -1 && currentValue <= 0) return;

    if (currentValue === 99) return;

    currentValue += number;

    score.textContent = currentValue.toString().padStart(2, '0');
}

function resetAll() {
    let score = document.getElementById("placarRight")
    score.textContent = '00';

    score = document.getElementById("placarLeft")
    score.textContent = '00';
    
    resetTimer()
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

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const add30Button = document.getElementById('add');

const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

let startIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>`

let pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
</svg>`;

let canVibrate = false;
if('vibrate' in navigator)
    canVibrate = true;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesInput.value = minutes.toString().padStart(2,'00');
    secondsInput.value = seconds.toString().padStart(2,'00');
}

function toggleStartPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        startButton.innerHTML = startIcon;
        toggleInputDisabled(false);
    } else {
        startButton.innerHTML = pauseIcon;
        timeLeft = parseInt(minutesInput.value, 10) * 60 + parseInt(secondsInput.value, 10);
        startTimer();
        toggleInputDisabled(true);
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
            
            if(!isMute) 
                document.getElementById('xyz').play();
            
            if(canVibrate)
                navigator.vibrate([500,500,500])

            alert("Tempo esgotado!");
            
            this.resetTimer();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 600;
    updateTimerDisplay();
    startButton.innerHTML = startIcon;
    isRunning = false;
    toggleInputDisabled(false);
}

function add30Seconds() {
    timeLeft += 30;
    if (!isRunning) {
        updateTimerDisplay();
    }
}

function toggleInputDisabled(disabled) {
    minutesInput.disabled = disabled;
    secondsInput.disabled = disabled;
}

startButton.addEventListener('click', toggleStartPause);
resetButton.addEventListener('click', resetTimer);
add30Button.addEventListener('click', add30Seconds);

updateTimerDisplay();

let isFull = false;
function fullscreen() {
    if(isFull) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox 
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        isFull = false;
        document.getElementById("fullscreen").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1871 17.8129C10.0225 17.6484 9.79927 17.5559 9.56652 17.5559C9.33377 17.5559 9.11056 17.6484 8.94596 17.8129L1.75549 25.0034V20.1442C1.75549 19.9114 1.66301 19.6882 1.4984 19.5235C1.33379 19.3589 1.11053 19.2665 0.877743 19.2665C0.644951 19.2665 0.421694 19.3589 0.257085 19.5235C0.0924762 19.6882 0 19.9114 0 20.1442V27.1223C0 27.355 0.0924762 27.5783 0.257085 27.7429C0.421694 27.9075 0.644951 28 0.877743 28H7.8558C8.08859 28 8.31185 27.9075 8.47646 27.7429C8.64107 27.5783 8.73354 27.355 8.73354 27.1223C8.73354 26.8895 8.64107 26.6662 8.47646 26.5016C8.31185 26.337 8.08859 26.2445 7.8558 26.2445H2.99661L10.1871 19.054C10.3516 18.8894 10.4441 18.6662 10.4441 18.4335C10.4441 18.2007 10.3516 17.9775 10.1871 17.8129ZM17.8129 17.8129C17.9775 17.6484 18.2007 17.5559 18.4335 17.5559C18.6662 17.5559 18.8894 17.6484 19.054 17.8129L26.2445 25.0034V20.1442C26.2445 19.9114 26.337 19.6882 26.5016 19.5235C26.6662 19.3589 26.8895 19.2665 27.1223 19.2665C27.355 19.2665 27.5783 19.3589 27.7429 19.5235C27.9075 19.6882 28 19.9114 28 20.1442V27.1223C28 27.355 27.9075 27.5783 27.7429 27.7429C27.5783 27.9075 27.355 28 27.1223 28H20.1442C19.9114 28 19.6882 27.9075 19.5235 27.7429C19.3589 27.5783 19.2665 27.355 19.2665 27.1223C19.2665 26.8895 19.3589 26.6662 19.5235 26.5016C19.6882 26.337 19.9114 26.2445 20.1442 26.2445H25.0034L17.8129 19.054C17.6484 18.8894 17.5559 18.6662 17.5559 18.4335C17.5559 18.2007 17.6484 17.9775 17.8129 17.8129ZM17.8129 10.1871C17.9775 10.3516 18.2007 10.4441 18.4335 10.4441C18.6662 10.4441 18.8894 10.3516 19.054 10.1871L26.2445 2.99661V7.8558C26.2445 8.08859 26.337 8.31185 26.5016 8.47646C26.6662 8.64107 26.8895 8.73354 27.1223 8.73354C27.355 8.73354 27.5783 8.64107 27.7429 8.47646C27.9075 8.31185 28 8.08859 28 7.8558V0.877743C28 0.644951 27.9075 0.421694 27.7429 0.257085C27.5783 0.0924762 27.355 0 27.1223 0H20.1442C19.9114 3.46887e-09 19.6882 0.0924762 19.5235 0.257085C19.3589 0.421694 19.2665 0.644951 19.2665 0.877743C19.2665 1.11053 19.3589 1.33379 19.5235 1.4984C19.6882 1.66301 19.9114 1.75549 20.1442 1.75549H25.0034L17.8129 8.94596C17.6484 9.11056 17.5559 9.33377 17.5559 9.56652C17.5559 9.79927 17.6484 10.0225 17.8129 10.1871ZM10.1871 10.1871C10.0225 10.3516 9.79927 10.4441 9.56652 10.4441C9.33377 10.4441 9.11056 10.3516 8.94596 10.1871L1.75549 2.99661V7.8558C1.75549 8.08859 1.66301 8.31185 1.4984 8.47646C1.33379 8.64107 1.11053 8.73354 0.877743 8.73354C0.644951 8.73354 0.421694 8.64107 0.257085 8.47646C0.0924762 8.31185 0 8.08859 0 7.8558V0.877743C0 0.644951 0.0924762 0.421694 0.257085 0.257085C0.421694 0.0924762 0.644951 0 0.877743 0H7.8558C8.08859 3.46887e-09 8.31185 0.0924762 8.47646 0.257085C8.64107 0.421694 8.73354 0.644951 8.73354 0.877743C8.73354 1.11053 8.64107 1.33379 8.47646 1.4984C8.31185 1.66301 8.08859 1.75549 7.8558 1.75549H2.99661L10.1871 8.94596C10.3516 9.11056 10.4441 9.33377 10.4441 9.56652C10.4441 9.79927 10.3516 10.0225 10.1871 10.1871Z" fill="black"/>
            </svg>`
    } else {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
        isFull = true;
        document.getElementById("fullscreen").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
  <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
</svg>`
    }
}

let isMute = false;

function mute() {
    if(isMute) {
        isMute = false;
        document.getElementById("mute").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
  <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
</svg>`
    } else {
        isMute = true;
        document.getElementById("mute").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16">
  <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
</svg>`
    }
}