import { useTimer } from "@/core/hooks";
import {Button} from "@/lib";

const timerStyle = {
  color: 'red',
  fontWeight: 'bold',
  margin: '0 5px',
};

export const Other = () => {
  const timer = useTimer({
    initialTime: 120,
    timerName: 'example_timer',
  });

  const timer2 = useTimer({
    initialTime: 60,
    timerName: 'example_timer_2',
    isUseUnmount: false,
  });

  const showFirstTimer = () => timer.showTimer();
  const showSecondTimer = () => timer2.showTimer();

  return (
    <div className='container container-main'>
      <h1 className='title'>Other</h1>
      <div>
        <h3>
          <strong>Unmount enable</strong>
        </h3>
        <p>Timer: {timer.timerValue.fullString}</p>
        <p>
          Timer: {timer.timerValue.hoursString}-{timer.timerValue.minutesString}-
          {timer.timerValue.secondString}
        </p>
        <p style={{ fontSize: '22px' }}>
          Timer:
          <span style={timerStyle}>{timer.timerValue.minutesString}</span>:
          <span style={timerStyle}>{timer.timerValue.secondString}</span>
        </p>
        <br />
        <Button
          classes={{ root: 'btn btn-main' }}
          disabled={timer.isShowTimer}
          type='button'
          onClick={showFirstTimer}
        >
          Reset timer 1
        </Button>
      </div>
      <hr />
      <div>
        <h3>
          <strong>Unmount disable</strong>
        </h3>
        <p>Timer: {timer2.timerValue.fullString}</p>
        <p>
          Timer: {timer2.timerValue.hoursString}-{timer2.timerValue.minutesString}-
          {timer2.timerValue.secondString}
        </p>
        {timer2.isShowTimer ? (
          <p style={{ fontSize: '22px' }}>
            Timer:
            <span style={timerStyle}>{timer2.timerValue.minutesString}</span>:
            <span style={timerStyle}>{timer2.timerValue.secondString}</span>
          </p>
        ) : (
          <p>hidden timer</p>
        )}
        <br />
        <Button
          classes={{ root: 'btn btn-main' }}
          disabled={timer2.isShowTimer}
          type='button'
          onClick={showSecondTimer}
        >
          Reset timer 2
        </Button>
      </div>
    </div>
  );
};
