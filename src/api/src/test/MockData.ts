import { BooleanValidList, BooleanInvalidList } from './constant/Boolean';
import { WebSocketEventType } from './../constant/websocket-event.enum';
import { GamePopupType } from './../constant/game-popup-type.enum';
import { JSONValidList, JSONInvalidList } from './constant/JSON';
import { UnserializableList } from './constant/Unserializable';
import { PlayerType } from './../constant/player-type.enum';
import { GameStage } from './../constant/game-stage.enum';
import { CardColor } from '../constant/card-color.enum';
import { EmailValidList } from './constant/Email';
import { InvalidList } from './constant/Invalid';
import { MockDataHierarchy } from './type';
import {
    InvalidDatabaseIdList, ValidDatabaseIdList, ValidNumbersList,
} from './constant/Number';
import {
    DatesInvalidStringList, DatesEdgeCasesList, DatesInFutureList,
    DatesInvalidList, DatesInPastList, DatesValidList,
} from './constant/Date';
import {
    InvalidAlphaNumeric,
    SpecialCharactersList, StringsInvalidList, StringsList,
    UnconvertableToStringList, ValidAlphaNumeric, ValidNotObjectStringList,
} from './constant/String';
import {
    InvalidSimilarUUIDv4List, InvalidUUIDList, InvalidUUIDv4ObjectsList,
    NonUUIDStringsList, SpecialCharactersUUIDList, ValidUUIDv4List,
} from './constant/UUID';


// Structured MockData using the base variables
export const MockData: MockDataHierarchy = {

    Undefined : undefined,
    Null      : null,

    Service : {
        TestHash : 'test-hash-beep-boop-123',
    },

    UUID : {
        Valid : {
            List  : ValidUUIDv4List,
            Value : ValidUUIDv4List[0],
        },
        Invalid : {
            List                     : InvalidUUIDList as string[],
            Value                    : InvalidUUIDList[0] as string,
            InvalidSimilarUUIDv4List,
            InvalidUUIDv4ObjectsList : InvalidUUIDv4ObjectsList as string[],
            NonUUIDStringsList,
            SpecialCharactersUUIDList,
        },
    },

    Email : {
        Valid : {
            List  : EmailValidList,
            Value : EmailValidList[0],
        },
        Invalid : {
            List  : StringsInvalidList,
            Value : StringsInvalidList[0],
        },
    },

    GamePopupType : {
        Valid : {
            List : [
                GamePopupType.Scoreboard,
                GamePopupType.Feedback,
                GamePopupType.Settings,
                GamePopupType.Unknown,
                GamePopupType.Leave,
            ],
            Value : GamePopupType.Feedback,
        },
        Invalid : {
            List  : StringsInvalidList,
            Value : 'FU',
        },
    },

    GameStage : {
        Valid : {
            List : [
                GameStage.PlayerPickWhiteCard,
                GameStage.DealerPickBlackCard,
                GameStage.DealerPickWinner,
                GameStage.GameComplete,
                GameStage.GameResults,
                GameStage.Unknown,
                GameStage.Lobby,
                GameStage.Home,
            ],
            Value : GameStage.PlayerPickWhiteCard,
        },
        Invalid : {
            List  : StringsInvalidList,
            Value : 'FU',
        },
    },
    CardColor : {
        Valid : {
            List : [
                CardColor.Black,
                CardColor.White,
                CardColor.Unknown,
            ],
            Value : CardColor.Black,
        },
        Invalid : {
            List : [...new Set([
                ...InvalidDatabaseIdList,
                ...StringsInvalidList,
                ...DatesInvalidList,
            ])],
            Value : DatesInvalidStringList[0],
        },
    },
    PlayerType : {
        Valid : {
            List : [
                PlayerType.Player,
                PlayerType.Unknown,
                PlayerType.Visitor,
            ],
            Value : PlayerType.Player,
        },
        Invalid : {
            List  : StringsInvalidList,
            Value : 'FU',
        },
    },
    WebSocketEventType : {
        Valid : {
            List : [
                WebSocketEventType.UpdatePlayerValidation,
                WebSocketEventType.DealerPickBlackCard,
                WebSocketEventType.DealerPickWinner,
                WebSocketEventType.PlayerSelectCard,
                WebSocketEventType.MenuItemClicked,
                WebSocketEventType.UpdateUsername,
                WebSocketEventType.SubmitFeedback,
                WebSocketEventType.UpdateGame,
                WebSocketEventType.CreateGame,
                WebSocketEventType.StartGame,
                WebSocketEventType.LeaveGame,
                WebSocketEventType.NextHand,
                WebSocketEventType.JoinGame,
            ],
            Value : WebSocketEventType.JoinGame,
        },
        Invalid : {
            List  : StringsInvalidList,
            Value : 'FU',
        },
    },

    Date : {
        Valid : {
            EdgeCasesList : DatesEdgeCasesList,
            InFutureList  : DatesInFutureList,
            InPastList    : DatesInPastList,
            Value         : DatesValidList[0],
            List          : DatesValidList,
        },

        Invalid : {
            StringList : DatesInvalidStringList,
            Value      : DatesInvalidList[0],
            List       : DatesInvalidList,
        },
    },
    Boolean : {
        Valid : {
            Value : BooleanValidList[0],
            List  : BooleanValidList,
        },
        Invalid : {
            Value : BooleanInvalidList[0],
            List  : BooleanInvalidList,
        },
    },
    JSON : {
        Valid : {
            Value : JSONValidList[0],
            List  : JSONValidList,
        },

        Invalid : {
            Value : JSONInvalidList[0],
            List  : JSONInvalidList,
        },
    },

    Number : {
        Valid : {
            Value : ValidNumbersList[0],
            List  : ValidNumbersList,

            IntegerList : [
                '1e5',
                5,
                3,
            ],

            DatabaseId : 123,

            UncommonList : [
                -Infinity,
                Infinity,
            ],

            BoundaryValueList : [
                Number.POSITIVE_INFINITY,
                Number.NEGATIVE_INFINITY,
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
                -Infinity,
                Infinity,
            ],

            DatabaseIdList : ValidDatabaseIdList,
        },

        Invalid : {
            BoundaryValueList : [],
            DatabaseIdList    : InvalidDatabaseIdList,
            Value             : InvalidList[0],
            List              : InvalidList,
        },
    },

    String : {
        Valid : {
            NotObjectStringList : ValidNotObjectStringList,
            Value               : JSONValidList[0],
            List                : StringsList,
            ValidAlphaNumeric,
            Empty               : '',
        },

        Invalid : {
            Value                      : StringsInvalidList[0] as unknown as string,
            InvlidAlphaNumeric         : InvalidAlphaNumeric,
            UnconvertableToStringList,
            List                       : StringsInvalidList,
            ThatAreNotObjectStringList : [
                ...ValidNumbersList.map(num => num.toString()),
                '"string"',
                '"null"',
            ],
            NumberStringList : [
                '1,234',
                '1.2.3',
            ],
        },
    },

    SpecialCharacterList : SpecialCharactersList,

    Misc : {
        Value : JSONValidList[0],

        CircularReference : {
            Name : 'Bozo the Clown',
            Self : null,  // Placeholder, will be set later
        },
    },

    UnserializableList,
} as const;

MockData.Misc.CircularReference.Self = MockData.Misc.CircularReference;


