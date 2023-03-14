//
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnBaseDelay = document.querySelector('[name=delay]');
const btnDelayPerPromise = document.querySelector('[name=step]');
const btnPromisesAmount = document.querySelector('[name=amount]');
const btnCreate = document.querySelector('.form button');
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(
      () => {
        if (shouldResolve) {
          // Fulfill
          resolve({ position, delay });
        } else {
          // Reject
          reject({ position, delay });
        }
      },
      delay,
      position
    );
  });
}
const onSuccess = ({ position, delay }) => {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
    timeout: 2500,
  });
};
const onReject = ({ position, delay }) => {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
    timeout: 2500,
  });
};
btnCreate.addEventListener('click', e => {
  e.preventDefault();
  for (let i = 0; i < Number(btnPromisesAmount.value); i++) {
    // console.log(i);
    let delay =
      Number(btnDelayPerPromise.value) * i + Number(btnBaseDelay.value);
    let timer = null;
    createPromise(i, delay).then(onSuccess).catch(onReject);
  }

  //
});
