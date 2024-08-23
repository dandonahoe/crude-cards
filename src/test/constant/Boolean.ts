export const BooleanValidList = [
    true,
    false,
];

export const BooleanInvalidList = [
    // Functions
    () => {},
    function namedFunc() {},

    // Numbers
    0,
    1,
    NaN,
    Infinity,
    -Infinity,
    2.5,
    -2.5,

    // Strings
    '',
    'true',
    'false',
    '1',
    '0',
    'boolean',

    // Objects
    {},
    { key : 'value' },
    new Date(),
    new Error(),

    // Arrays
    [],
    [true],
    [false],
    [1, 2, 3],

    // Null and Undefined
    null,
    undefined,

    // Symbols
    Symbol('symbol'),

    // BigInt
    BigInt(0),
    BigInt(1234),

    // Other
    /regex/,
];
