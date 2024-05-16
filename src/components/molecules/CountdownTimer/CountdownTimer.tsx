import { FC } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface ICountdownTimer {
  duration: number;
  isPlaying: boolean;
}

export const CountdownTimer: FC<ICountdownTimer> = ({
  duration,
  isPlaying
}: ICountdownTimer) => {
  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={duration}
      colors={['#99f553', '#ffdb1f', '#ff8f1f', '#A30000']}
      colorsTime={[
        Math.floor((3 / 4) * duration),
        Math.floor((2 / 4) * duration),
        Math.floor((1 / 4) * duration),
        0
      ]}>
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );
};
