const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timer = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const changeBodyBg = () => {
  body.style.backgroundColor = getRandomHexColor();
  //   console.log(`running timer [${timer}]`);
};
const clickStart = e => {
  changeBodyBg();
  timer = setInterval(changeBodyBg, 1000);
  //   console.log(`starting timer [${timer}]`);
  btnStart.disabled = true;
  btnStop.disabled = false;
};
const clickStop = e => {
  //   console.log(`clearing timer [${timer}]`);
  clearInterval(timer);
  btnStart.disabled = false;
  btnStop.disabled = true;
};
btnStop.disabled = true;
btnStart.addEventListener('click', clickStart);
btnStop.addEventListener('click', clickStop);
