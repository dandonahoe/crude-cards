export const InvalidDatabaseIdList = [
    Infinity,
    -Infinity,
    null,
    -1,
    3.14,                // Floating point number
    NaN,
    'string',            // String data type
    {},                  // Empty object
    [],                  // Empty array
    true,                // Boolean data type
    new Date(),          // Date object
    () => {},            // Function
    Number.MAX_SAFE_INTEGER + 1, // A number beyond safe integer limits
    -Number.MAX_SAFE_INTEGER - 1, // Negative beyond safe integer limits
    '',                  // Empty string
    '   ',               // String with just spaces
    '1a',                // String with letters and numbers
    '-5',                // Negative string number
    '3.14',              // String representation of a float
    'Infinity',          // String of infinity
    '-Infinity',         // String of negative infinity
    'NaN',               // String of NaN
];

export const ValidDatabaseIdList = [
    1,
    2,
    3,
    4,
    100,
    500,
    1000,
    99999,
    1234567890,
    Number.MAX_SAFE_INTEGER - 10, // A number close to the max safe integer
    0,                            // Zero could be considered valid in some systems
    '1',                          // String representation
    '2',
    '3',
    '1000',
    '1234567890',
    '10',                          // Leading zeros might be valid but could be a potential mistake
    '0010',
    '00000000000123',
];

export const ValidNumbersList = [
    123.456,
    1000,
    Math.PI,
    0,
    -123.456,
    1e+308,              // Maximum float
    -1e+308,             // Minimum float
    Number.MAX_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    0.0000000001,        // Very small number
    -0.0000000001,       // Negative very small number
    1e-308,              // Minimum positive floatz
    -1e-308,             // Minimum negative float
    Math.sqrt(2),        // Square root of 2
    Math.sqrt(3),        // Square root of 3
    Math.E,              // Euler's number
    -Math.E,             // Negative Euler's number
];

