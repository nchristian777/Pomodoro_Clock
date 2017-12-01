let sessionTimer;

class Timer {
  constructor(minutes, secounds) {
    this.minutes = minutes;
    this.secounds = secounds;
    this.started = false;
    this.time = null;
  }

  countDown() {
    const timerDisplay = document.getElementById('timerDisplay');
    if (this.started === true) {
      if (this.secounds > 0) {
        this.secounds -= 1;
        timerDisplay.innerHTML = `${this.minutes} : ${this.secounds}`;
      } else if (this.minutes > 0) {
        this.secounds = 59;
        this.minutes -= 1;
        timerDisplay.innerHTML = `${this.minutes} : ${this.secounds}`;
      } else {
        timerDisplay.innerHTML = 'Done';
        this.started = false;
      }
    }
  }

  start() {
    this.started = true;
    this.time = setInterval(this.countDown.bind(this), 1000);
  }

  stop() {
    this.started = false;
    clearInterval(this.time);
  }
}


function startTimer() {
  const button = document.getElementById('timerButton');
  if (button.innerHTML === 'Start') {
    button.innerHTML = 'Stop';
    sessionTimer = new Timer(25, 0);
    sessionTimer.start();
  } else {
    button.innerHTML = 'Start';
    sessionTimer.stop();
  }
}

function init() {
  document.getElementById('timerButton').addEventListener('click', startTimer);
}

window.addEventListener('load', init);
