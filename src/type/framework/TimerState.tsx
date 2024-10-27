import { TimerType } from '../../api/src/type';

export interface TimerState {
    timerType : TimerType;
    timeLeft  : number;
    gameId    : string;
}
