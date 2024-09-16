'use strict';

let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapList = [];

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')} : ${String(milliseconds).padStart(2, '0')}`;
}

function updateDisplay() {
    const timerDisplay = document.querySelector('.timer-display');
    timerDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function pauseTimer() {
    if (!isRunning) return;
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
}

function restartTimer() {
    resetTimer();
    startTimer();
}

function recordLap() {
    if (!isRunning) return;
    lapList.push(formatTime(elapsedTime));
    updateLapList();
}

function updateLapList() {
    const lapListElement = document.querySelector('.laps');
    lapListElement.innerHTML = lapList.map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`).join('');
}

function resetLaps() {
    lapList = [];
    updateLapList();
}

document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
document.getElementById('resetTimer').addEventListener('click', resetTimer);
document.getElementById('restartTimer').addEventListener('click', restartTimer);
document.getElementById('Lap').addEventListener('click', recordLap);
document.getElementById('resetLaps').addEventListener('click', resetLaps);