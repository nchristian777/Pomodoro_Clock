let sessionTimer;

class Timer {
  constructor(minutes, secounds) {
    this.minutes = minutes;
    this.secounds = secounds;
    this.initialMinutes = minutes;
    this.initialSecounds = secounds;
    this.animationSecounds = (this.minutes * 60) + secounds;
    this.started = false;
    this.time = null;
    this.timerDisplay = document.getElementById('timerDisplay');
  }

  updateDisplay() {
    this.timerDisplay.innerHTML = `${this.minutes}:${this.secounds}`;
  }

  countDown() {
    if (this.started === true) {
      if (this.secounds > 0) {
        this.secounds -= 1;
        this.updateDisplay();
      } else if (this.minutes > 0) {
        this.secounds = 59;
        this.minutes -= 1;
        this.updateDisplay();
      } else {
        this.timerDisplay.innerHTML = 'Done';
        this.started = false;
      }
    }
  }

  start() {
    this.started = true;
    this.time = setInterval(this.countDown.bind(this), 1000);
    document.getElementById('spinner').style['animation-duration'] = `${this.animationSecounds}s`;
    document.getElementById('filler').style['animation-duration'] = `${this.animationSecounds}s`;
    document.getElementById('mask').style['animation-duration'] = `${this.animationSecounds}s`;
    document.getElementById('spinner').style.webkitAnimationPlayState = 'running';
    document.getElementById('filler').style.webkitAnimationPlayState = 'running';
    document.getElementById('mask').style.webkitAnimationPlayState = 'running';
  }

  reset() {
    this.started = false;
    clearInterval(this.time);
    this.secounds = this.initialSecounds;
    this.minutes = this.initialMinutes;
    this.updateDisplay();
    document.getElementById('spinner').style.webkitAnimationPlayState = 'paused';
    document.getElementById('filler').style.webkitAnimationPlayState = 'paused';
    document.getElementById('mask').style.webkitAnimationPlayState = 'paused';
  }

  pause() {
    this.started = false;
    clearInterval(this.time);
    document.getElementById('spinner').style.webkitAnimationPlayState = 'paused';
    document.getElementById('filler').style.webkitAnimationPlayState = 'paused';
    document.getElementById('mask').style.webkitAnimationPlayState = 'paused';
  }
}


function startTimer() {
  const button = document.getElementById('timerButton');
  if (button.innerHTML === 'Start') {
    button.innerHTML = 'Pause';
    if (!sessionTimer) { sessionTimer = new Timer(25, 0); }
    sessionTimer.updateDisplay();
    sessionTimer.start();
  } else if (button.innerHTML === 'Pause') {
    button.innerHTML = 'Resume';
    sessionTimer.pause();
  } else {
    button.innerHTML = 'Pause';
    sessionTimer.start();
  }
}

function restartAnimation(element) {
  const elementId = document.getElementById(element);
  elementId.style.animation = 'none';
  elementId.offsetHeight = elementId.offsetHeight;
  elementId.style.animation = null;
}

function resetTimer() {
  sessionTimer.reset();
  document.getElementById('timerButton').innerHTML = 'Start';
  restartAnimation('spinner');
  restartAnimation('filler');
  restartAnimation('mask');
  document.getElementById('spinner').style.webkitAnimationPlayState = 'paused';
  document.getElementById('filler').style.webkitAnimationPlayState = 'paused';
  document.getElementById('mask').style.webkitAnimationPlayState = 'paused';
}

function changeTimer(selected) {
  if (selected.target !== selected.currentTarget) {
    switch (selected.target.id) {
      case 'minuteIncrement':
        document.getElementById('Minutes').stepUp();
        break;
      case 'secoundIncrement':
        document.getElementById('Secounds').stepUp();
        break;
      case 'minuteDecrement':
        document.getElementById('Minutes').stepDown();
        break;
      case 'secoundDecrement':
        document.getElementById('Secounds').stepDown();
        break;
      default:
        break;
    }
  }
  selected.stopPropagation();
}

function setTimer() {
  const inputSecounds = document.getElementById('Secounds').value;
  const inputMinutes = document.getElementById('Minutes').value;
  sessionTimer = new Timer(inputMinutes, inputSecounds);
  sessionTimer.updateDisplay();
  resetTimer();
}

function init() {
  document.getElementById('timerButton').addEventListener('click', startTimer);
  document.getElementById('timerResetButton').addEventListener('click', resetTimer);
  document.getElementById('setButton').addEventListener('click', setTimer);
  document.querySelector('.setWrapper').addEventListener('click', changeTimer);
  document.getElementById('spinner').style.webkitAnimationPlayState = 'paused';
  document.getElementById('filler').style.webkitAnimationPlayState = 'paused';
  document.getElementById('mask').style.webkitAnimationPlayState = 'paused';
}

window.addEventListener('load', init);
