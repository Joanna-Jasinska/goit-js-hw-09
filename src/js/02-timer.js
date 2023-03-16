import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
let timer = null;
let countdownDate = new Date();
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');
const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    countdownDate = selectedDates[0];
    if (validateDate(countdownDate)) {
      resetTimer();
      // update(1, '??');
      update(1, '00');
    } else {
      update(1, '00');
      if (timer) {
        clearInterval(timer);
        btnStart.innerText = 'Start';
        timer = null;
      }
      // window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
    }
  },
});

const validateDate = (date = new Date()) => {
  const now = new Date();
  let valid = Number(date) > Number(now);
  btnStart.disabled = !valid;
  return valid;
};
const setTimer = e => {
  if (timer) {
    clearInterval(timer);
    btnStart.innerText = 'Start';
    // update(1, '??');
    update(1, '00');
    timer = null;
  } else {
    update();
    timer = setInterval(update, 1000);
    btnStart.innerText = 'Stop';
  }
};
const resetTimer = () => {
  if (timer) {
    clearInterval(timer);
    btnStart.innerText = 'Start';
    timer = null;
  }
};
function convertMs(ms) {
  if (Number(ms) < 100) {
    resetTimer();
    validateDate();
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = String(Math.floor(ms / day)).padStart(2, 0);
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, 0);
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(
    2,
    0
  );
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, 0);
  return { days, hours, minutes, seconds };
}
const update = (pause = false, symbol = '00') => {
  if (pause) {
    daysDisplay.innerHTML = symbol;
    hoursDisplay.innerHTML = symbol;
    minutesDisplay.innerHTML = symbol;
    secondsDisplay.innerHTML = symbol;
    return;
  }
  let timeDifference = Number(countdownDate) - Number(new Date());
  let countdown = convertMs(timeDifference);
  daysDisplay.innerHTML = countdown.days;
  hoursDisplay.innerHTML = countdown.hours;
  minutesDisplay.innerHTML = countdown.minutes;
  secondsDisplay.innerHTML = countdown.seconds;
};
btnStart.addEventListener('click', setTimer);
// fp.destroy();
