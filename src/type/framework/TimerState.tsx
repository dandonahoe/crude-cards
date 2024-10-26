import { TimerType } from '../../api/src/type';

export interface TimerState {
    timerType : TimerType | null;
    timeLeft  : number;
    gameId    : string;
}
