import { useEffect, useState } from 'react';
import { TimerValueReturned } from '../models/common';
import {getCookie, removeCookie, setCookie} from "@/core/services";
import { TIMER_KEY } from '../constants';
import {SETTINGS} from "@/core/settings";
import { parseTimeForTimer } from '../utils/functions/parseTimeForTimer';



export interface UseTimerProps {
  initialTime: number;
  timerName: string;
  separator?: string;
  step?: number;
  isUseUnmount?: boolean;
}

export interface UseTimerResponse {
  timerValue: TimerValueReturned;
  isShowTimer: boolean;
  showTimer: (isClear?: boolean) => Promise<unknown>;
  hideTimer: (isClear?: boolean) => Promise<unknown>;
}

export type UseTimer = (props: UseTimerProps) => UseTimerResponse;

const defaultTimerValues = {
  secondString: '',
  hoursString: '',
  secondsNumber: 0,
  minutesString: '',
  fullString: '',
};

export const useTimer: UseTimer = (props) => {
  const { initialTime, separator, step = 1000, timerName, isUseUnmount = true } = props;

  const [isShowTimer, setIsShowTimer] = useState<boolean>(true);

  const getSeconds = () => {
    const memorizedSeconds = getCookie(`${TIMER_KEY}_${timerName}`);
    const isHasMemorisedSeconds = typeof memorizedSeconds === 'number';

    return isHasMemorisedSeconds ? memorizedSeconds : SETTINGS.isDevelop ? 5 : initialTime;
  };

  const [timerValue, setTimerValue] = useState<TimerValueReturned>(defaultTimerValues);

  const updateTimer = (seconds: number) => {
    const timerData = parseTimeForTimer(seconds, separator);
    setTimerValue(timerData);
    setCookie(`${TIMER_KEY}_${timerName}`, seconds);
  };

  useEffect(() => {
    setTimerValue(parseTimeForTimer(getSeconds(), separator));

    return () => {
      isUseUnmount && removeCookie(`${TIMER_KEY}_${timerName}`);
    };
  }, []);

  useEffect(() => {
    if (!isShowTimer) return;

    let seconds = getSeconds();
    if (seconds <= 0) return setIsShowTimer(false);

    const intervalId = setInterval(() => {
      if (seconds <= 0) {
        setIsShowTimer(false);
      } else {
        seconds = seconds - step / 1000;
        updateTimer(seconds);
      }
    }, step);

    return () => {
      clearInterval(intervalId);
    };
  }, [isShowTimer]);

  const toggleTimer = (isClear = true, isShow: boolean) =>
    new Promise((resolve) => {
      isClear && removeCookie(`${TIMER_KEY}_${timerName}`);
      setTimerValue(isShow ? parseTimeForTimer(getSeconds(), separator) : defaultTimerValues);
      setIsShowTimer(isShow);
      resolve('');
    });

  const showTimer = (isClear?: boolean) => toggleTimer(isClear, true);

  const hideTimer = (isClear?: boolean) => toggleTimer(isClear, false);

  return {
    timerValue,
    isShowTimer,
    showTimer,
    hideTimer,
  };
};
