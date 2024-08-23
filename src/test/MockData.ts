/* eslint-disable @typescript-eslint/no-explicit-any */

import { InvalidDatabaseIdList, ValidDatabaseIdList, ValidNumbersList } from './constant/Number';
import { BooleanValidList, BooleanInvalidList } from './constant/Boolean';
import { JSONValidList, JSONInvalidList } from './constant/JSON';
import { UnserializableList } from './constant/Unserializable';
import { InvalidList } from './constant/Invalid';
import { MockDataHierarchy } from './type';
import {
    DatesInvalidStringList, DatesEdgeCasesList, DatesInFutureList,
    DatesInvalidList,       DatesInPastList,    DatesValidList,
} from './constant/Date';
import {
    SpecialCharactersList, StringsInvalidList, StringsList,
    UnconvertableToStringList, ValidNotObjectStringList,
} from './constant/String';


// Structured MockData using the base variables
export const MockData : MockDataHierarchy = {

    Undefined : undefined,
    Null      : null,

    Service : {
        TestHash : 'test-hash-beep-boop-123',
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
            Empty               : '',
        },

        Invalid : {
            Value : StringsInvalidList[0] as unknown as string,
            List  : StringsInvalidList,

            UnconvertableToStringList,

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

/* eslint-enable @typescript-eslint/no-explicit-any */

