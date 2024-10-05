import { PropsWithChildren } from 'react';


export type Props = PropsWithChildren;

export interface TimerSymbolProps {
    timeLeft : number;
}

export interface TimerSymbolProps {
    timeLeft : number;
    color    : string;
}

export interface TimeConfig {
    jiggleClass : string;
    timeLeft    : number;
    color       : string;

}
