let sessionTimer;

class Timer {
  constructor(minutes, secounds) {
    this.minutes = minutes;
    this.secounds = secounds;
    this.initialMinutes = minutes;
    this.initialSecounds = secounds;
    this.animationSecounds = (this.minutes * 60) + parseInt(this.secounds, 10);
    this.started = false;
    this.time = null;
    this.timerDisplay = document.getElementById('timerDisplay');
    this.phase = 'Work';
    this.breakMinutes = 5;
    this.breakSecounds = 0;
  }

  updateDisplay() {
    if (this.secounds < 10 && this.secounds.toString().length === 1) {
      this.timerDisplay.innerHTML = `${this.minutes}:0${this.secounds}`;
    } else {
      this.timerDisplay.innerHTML = `${this.minutes}:${this.secounds}`;
    }
    document.getElementById('phaseLable').innerHTML = `${this.phase} for:`;
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
        this.switchPhase();
      }
    }
  }

  start() {
    this.animationSecounds = (this.minutes * 60) + parseInt(this.secounds, 10);
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

  restartAnimation(element) {
    this.elementId = document.getElementById(element);
    this.elementId.style.animation = 'none';
    this.elementId.offsetHeight;
    this.elementId.style.animation = null;
  }

  switchColor() {
    const button = document.querySelectorAll('button');
    const input = document.querySelectorAll('input');
    if (this.phase === 'Work') {
      document.body.style['background-color'] = '#615192';
      document.getElementById('timerPie').style['background-color'] = '#261758';
      document.getElementById('innerCircle').style['background-color'] = '#615192';
      document.getElementById('spinner').style['background-color'] = '#13073A';
      document.getElementById('filler').style['background-color'] = '#13073A';
      document.getElementById('header').style.color = '#CCC3E8';
      document.getElementById('timerDisplay').style.color = '#CCC3E8';
      document.getElementById('phaseLable').style.color = '#CCC3E8';
      document.getElementById('workSetWrapper').style.color = '#CCC3E8';
      document.getElementById('breakSetWrapper').style.color = '#CCC3E8';
      for (let i = 0; i < button.length; i += 1) {
        button[i].style['background-color'] = '#13073A';
        button[i].style.color = '#CCC3E8';
      }
      for (let i = 0; i < input.length; i += 1) {
        input[i].style['background-color'] = '#261758';
        input[i].style.color = '#CCC3E8';
      }
    } else {
      document.body.style['background-color'] = '#AA3939';
      document.getElementById('timerPie').style['background-color'] = '#801515';
      document.getElementById('innerCircle').style['background-color'] = '#AA3939';
      document.getElementById('spinner').style['background-color'] = '#550000';
      document.getElementById('filler').style['background-color'] = '#550000';
      document.getElementById('header').style.color = '#FFAAAA';
      document.getElementById('timerDisplay').style.color = '#FFAAAA';
      document.getElementById('phaseLable').style.color = '#FFAAAA';
      document.getElementById('workSetWrapper').style.color = '#FFAAAA';
      document.getElementById('breakSetWrapper').style.color = '#FFAAAA';
      for (let i = 0; i < button.length; i += 1) {
        button[i].style['background-color'] = '#550000';
        button[i].style.color = '#FFAAAA';
      }
      for (let i = 0; i < input.length; i += 1) {
        input[i].style['background-color'] = '#801515';
        input[i].style.color = '#FFAAAA';
      }
    }
  }

  switchPhase() {
    if (this.phase === 'Work') {
      this.minutes = this.breakMinutes;
      this.secounds = this.breakSecounds;
      this.switchColor();
      this.restartAnimation('spinner');
      this.restartAnimation('filler');
      this.restartAnimation('mask');
      this.phase = 'Break';
      this.updateDisplay();
      clearInterval(this.time);
      this.start();
    } else {
      this.minutes = this.initialMinutes;
      this.secounds = this.initialSecounds;
      this.switchColor();
      this.restartAnimation('spinner');
      this.restartAnimation('filler');
      this.restartAnimation('mask');
      this.phase = 'Work';
      this.updateDisplay();
      clearInterval(this.time);
      this.start();
    }
  }
}


function startTimer() {
  const button = document.getElementById('timerButton');
  const timerMinutes = document.getElementById('Minutes').value;
  const timerSecounds = document.getElementById('Secounds').value;
  if (button.innerHTML === 'Start') {
    button.innerHTML = 'Pause';
    if (!sessionTimer) {
      sessionTimer = new Timer(timerMinutes, timerSecounds);
    }
    sessionTimer.breakMinutes = document.getElementById('breakMinutes').value;
    sessionTimer.breakSecounds = document.getElementById('breakSecounds').value;
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


function resetTimer() {
  sessionTimer.reset();
  document.getElementById('timerButton').innerHTML = 'Start';
  sessionTimer.restartAnimation('spinner');
  sessionTimer.restartAnimation('filler');
  sessionTimer.restartAnimation('mask');
  document.getElementById('spinner').style.webkitAnimationPlayState = 'paused';
  document.getElementById('filler').style.webkitAnimationPlayState = 'paused';
  document.getElementById('mask').style.webkitAnimationPlayState = 'paused';
  if (sessionTimer.phase === 'break') {
    sessionTimer.switchPhase();
  }
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
      case 'breakMinuteIncrement':
        document.getElementById('breakMinutes').stepUp();
        break;
      case 'breakSecoundIncrement':
        document.getElementById('breakSecounds').stepUp();
        break;
      case 'breakMinuteDecrement':
        document.getElementById('breakMinutes').stepDown();
        break;
      case 'breakSecoundDecrement':
        document.getElementById('breakSecounds').stepDown();
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
  sessionTimer.breakMinutes = document.getElementById('breakMinutes');
  sessionTimer.breakSecounds = document.getElementById('breakSecounds');
  sessionTimer.updateDisplay();
  resetTimer();
}

function init() {
  document.getElementById('timerButton').addEventListener('click', startTimer);
  document.getElementById('timerResetButton').addEventListener('click', resetTimer);
  document.getElementById('setButton').addEventListener('click', setTimer);
  document.querySelector('#workSetWrapper').addEventListener('click', changeTimer);
  document.querySelector('#breakSetWrapper').addEventListener('click', changeTimer);
  document.getElementById('spinner').style.webkitAnimationPlayState = 'paused';
  document.getElementById('filler').style.webkitAnimationPlayState = 'paused';
  document.getElementById('mask').style.webkitAnimationPlayState = 'paused';
}

window.addEventListener('load', init);
