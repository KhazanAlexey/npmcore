import { TimerValueReturned } from '@/core/models';

const setZero = (num: number) => (num < 10 ? `0${num}` : num.toString());

export const parseTimeForTimer = (time: number, separator = ':'): TimerValueReturned => {
  const hours = Math.trunc(time / 3600);
  const min = Math.trunc((time - hours * 3600) / 60);
  const sec = time % 60;

  const fullString = [hours, min, sec].reduce((acc, cur) => {
    const sep = acc.length ? separator : '';
    return acc.concat(cur < 10 ? `${sep}0${cur}` : `${sep}${cur}`);
  }, '');

  return {
    fullString,
    secondString: setZero(sec),
    minutesString: setZero(min),
    hoursString: setZero(hours),
    secondsNumber: time,
  };
};
