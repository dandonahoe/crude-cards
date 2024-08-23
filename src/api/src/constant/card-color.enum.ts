import deepFreeze from 'deep-freeze-strict';


export enum CardColor {
    Unknown = 'unknown',
    Black   = 'black',
    White   = 'white',
}

deepFreeze(CardColor);
