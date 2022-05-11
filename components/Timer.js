import { useState, useEffect } from 'react';

const defaultRemainingTime = {
  hours: '00',
  minutes: '15',
  seconds: '00',
};

const Timer = ({ time }) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [timeLeft, setTimeLeft] = useState(time - 1);

  // useEffect with interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(timeLeft);
    }, 1000);
    return () => clearTimeout(intervalId);
  }, [timeLeft]);

  // calculate and return time left
  function getRemainingTime(timeLeft) {
    let minutes = 0;
    const hours = Math.floor(timeLeft / 3600).toString();
    if (timeLeft < 3600)
      minutes = Math.floor(60 - Math.abs(timeLeft - 3600) / 60).toString();
    else minutes = Math.floor(Math.abs(timeLeft - 3600) / 60).toString();
    let seconds = (timeLeft % 60).toString();

    setTimeLeft(timeLeft - 1);

    return {
      hours: padWithZeros(hours, 2),
      minutes: padWithZeros(minutes, 2),
      seconds: padWithZeros(seconds, 2),
    };
  }

  // set remaining time using useState
  function updateRemainingTime(timeLeft) {
    setRemainingTime(getRemainingTime(timeLeft));
  }

  // padding the time
  function padWithZeros(number, minLength) {
    const numberString = number.toString();
    if (numberString.length >= minLength) return numberString;
    return '0'.repeat(minLength - numberString.length) + numberString;
  }

  // const runCallback = (cb) => {
  //   return cb();
  // };

  // JSX
  return (
    <>
      {/* <div>
        {runCallback(() => {
          return timeLeft;
        })}
        {(() => {
          if (timeLeft < 3600) {
            //setShowScore(true);
            <Header showScore={true} />;
          }
        })()}
      </div> */}
      <div className="countdown-timer">
        <span className="two-numbers">{remainingTime.hours}</span>
        <span>:</span>
        <span className="two-numbers">{remainingTime.minutes}</span>
        <span>:</span>
        <span className="two-numbers">{remainingTime.seconds}</span>
      </div>
    </>
  );
};

export default Timer;
