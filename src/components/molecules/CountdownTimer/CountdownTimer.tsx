import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export const CountdownTimer = () => {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={30}
      colors={['#99f553', '#ffdb1f', '#ff8f1f', '#A30000']}
      colorsTime={[25, 20, 10, 0]}>
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );
};
