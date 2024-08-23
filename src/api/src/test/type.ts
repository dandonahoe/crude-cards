import { PlayerType } from './../constant/player-type.enum';
import { WebSocketEventType } from './../constant/websocket-event.enum';
import { GameStage } from './../constant/game-stage.enum';
import { GamePopupType } from './../constant/game-popup-type.enum';
import { CardColor } from '../constant/card-color.enum';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ValidInvalid<T> {
    Valid: {
        Value: T;
        List: T[];
    }
    Invalid: {
        Value: any;
        List: any[];
    }
}

export interface ValidInvalidDate extends ValidInvalid<Date> {
    Valid: {
        Value: Date,
        List: Date[],

        EdgeCasesList: any[],
        InFutureList: any[],
        InPastList: any[],
    },
    Invalid: {
        StringList: any[];
        Value: any;
        List: any[],
    },
}

export interface ValidInvalidUUID extends ValidInvalid<string> {
    Valid: {
        Value: string;
        List: string[];
    },
    Invalid: {
        Value: string;
        List: string[];

        SpecialCharactersUUIDList: string[];
        InvalidSimilarUUIDv4List: string[];
        InvalidUUIDv4ObjectsList: string[];
        NonUUIDStringsList: string[];
    },
}

export interface ValidInvalidEmail extends ValidInvalid<string> {
    Valid: {
        Value: string;
        List: string[];
    },
    Invalid: {
        Value: string;
        List: string[];
    },
}


export interface ValidInvalidBoolean extends ValidInvalid<boolean> {
    Valid: {
        Value: boolean;
        List: boolean[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface ValidInvalidJson extends ValidInvalid<string> {
    Valid: {
        Value: string,
        List: string[],
    },
    Invalid: {
        Value: any;
        List: any[],
    },
}


export interface ValidInvalidString extends ValidInvalid<string> {
    Valid: {
        NotObjectStringList: string[];
        ValidAlphaNumeric: any[];
        List: string[];
        Value: string;
        Empty: string;
    }

    Invalid: {

        ThatAreNotObjectStringList: any[];
        UnconvertableToStringList: any[];
        InvlidAlphaNumeric: any[];
        NumberStringList: any[];
        List: any[];
        Value: any;
    };
}
export interface ValidInvalidNumber extends ValidInvalid<number> {
    Valid: {
        Value: number;
        List: number[],

        BoundaryValueList: any[];
        DatabaseIdList: any[];
        UncommonList: any[];
        IntegerList: any[];
        DatabaseId: any;
    },
    Invalid: {
        BoundaryValueList: any[];
        DatabaseIdList: any[];
        Value: any;
        List: any[],
    },
}

export interface ValidInvalidCardColor extends ValidInvalid<CardColor> {
    Valid: {
        Value: CardColor;
        List: CardColor[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface ValidInvalidGamePopupType extends ValidInvalid<GamePopupType> {
    Valid: {
        Value: GamePopupType;
        List: GamePopupType[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface ValidInvalidGameStage extends ValidInvalid<GameStage> {
    Valid: {
        Value: GameStage;
        List: GameStage[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface ValidInvalidPlayerType extends ValidInvalid<PlayerType> {
    Valid: {
        Value: PlayerType;
        List: PlayerType[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface ValidInvalidWebSocketEventType extends ValidInvalid<WebSocketEventType> {
    Valid: {
        Value: WebSocketEventType;
        List: WebSocketEventType[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface MockDataHierarchy {
    Undefined: undefined;
    Null: null;

    SpecialCharacterList: string[];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    UnserializableList: Function[];
    Boolean: ValidInvalidBoolean;
    Number: ValidInvalidNumber;
    String: ValidInvalidString;
    Date: ValidInvalidDate;
    JSON: ValidInvalidJson;

    CardColor: ValidInvalidCardColor;
    GamePopupType: ValidInvalidGamePopupType;
    GameStage: ValidInvalidGameStage;

    PlayerType: ValidInvalidPlayerType;
    WebSocketEventType: ValidInvalidWebSocketEventType;

    Service: {
        TestHash: string;
    },

    UUID: ValidInvalidUUID,
    Email: ValidInvalidEmail,

    Misc: {
        Value: string;

        CircularReference: {
            Name: string;
            Self: any; // This is a circular reference
        };
    };
}

/* eslint-enable @typescript-eslint/no-explicit-any */
