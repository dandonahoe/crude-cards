/* eslint-disable @typescript-eslint/no-explicit-any */


export interface ValidInvalid<T> {
    Valid   : {
        Value : T;
        List : T[];
    }
    Invalid : {
        Value : any;
        List : any[];
    }
}

export interface ValidInvalidDate extends ValidInvalid<Date> {
    Valid : {
        Value : Date,
        List  : Date[],

        EdgeCasesList : any[],
        InFutureList  : any[],
        InPastList    : any[],
    },
    Invalid : {
        StringList : any[];
        Value      : any;
        List       : any[],
    },
}


export interface ValidInvalidBoolean extends ValidInvalid<boolean> {
    Valid : {
        Value : boolean,
        List  : boolean[],
    },
    Invalid : {
        Value : any;
        List  : any[],
    },
}

export interface ValidInvalidJson extends ValidInvalid<string> {
    Valid : {
        Value : string,
        List  : string[],
    },
    Invalid : {
        Value      : any;
        List       : any[],
    },
}

export interface ValidInvalidString extends ValidInvalid<string> {
    Valid : {
        NotObjectStringList : string[];
        Value : string;
        Empty : string;
        List  : string[];
    }

    Invalid : {
        ThatAreNotObjectStringList : any[];
        UnconvertableToStringList  : any[];
        NumberStringList           : any[];
        Value                      : any;
        List                       : any[];
    };
}
export interface ValidInvalidNumber extends ValidInvalid<number> {
    Valid : {
        Value : number;
        List  : number[],

        BoundaryValueList : any[];
        DatabaseIdList    : any[];
        UncommonList      : any[];
        IntegerList       : any[];
        DatabaseId        : any;
    },
    Invalid : {
        BoundaryValueList : any[];
        DatabaseIdList    : any[];
        Value             : any;
        List              : any[],
    },
}
export interface MockDataHierarchy {
    Undefined  : undefined;
    Null       : null;

    SpecialCharacterList : string[];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    UnserializableList   : Function[];
    Boolean              : ValidInvalidBoolean;
    Number               : ValidInvalidNumber;
    String               : ValidInvalidString;
    Date                 : ValidInvalidDate;
    JSON                 : ValidInvalidJson;

    Service : {
        TestHash : string;
    },

    Misc : {
        Value : string;

        CircularReference : {
            Name : string;
            Self : any; // This is a circular reference
        };
    };
}

/* eslint-enable @typescript-eslint/no-explicit-any */
