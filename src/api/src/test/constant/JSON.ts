/* eslint-disable max-len */

export const JSONValidList = [
    // Simple JSON strings
    '{}',
    '[]',

    // Disabling the insane parts of the json spec


    // Nested structures
    '{"description": "A JSON string with various data types", "data": {"boolean": true, "integer": 42, "float": 3.14159265359, "nullValue": null, "array": [1, 2, 3], "nestedObject": {"key1": "value1", "key2": "value2"}}}',
    '{"employees": [{"firstName": "Alice", "lastName": "Smith"}, {"firstName": "Bob", "lastName": "Johnson"}]}',

    // Arrays
    '[1,2,3]',
    '["a", "b", "c"]',
    '[null, false, {"key": "value"}]',

    // Special characters
    '{"specialChars": "!@#$%^&*()_-+={}[]|\':;<>,.?~"}',

    // Escaped characters
    '{"text": "This is a string with an escaped \\"double quote\\"."}',
];

export const JSONInvalidList = [
    // Incomplete or malformed structures
    '{"key": "value"',
    '{key: "value"}',
    '{"key": value}',
    '{"key": "value", }',

    // Using JavaScript-specific data structures and functions
    '{"key": new Map([["a", 1], ["b", 2]])}',
    '[new Map([["a", 1], ["b", 2]])]',
    '{"key": function() { return "value"; }}',
    '{"key": undefined}',

    // Other invalid JSON patterns
    'true, false',
    '{"key": "value" "key2": "value2"}',
    '42.42.42',

    // Edge cases
    '',
    'undefined',
    'NaN',
    'Infinity',
    '-Infinity',

    '"hello"',
    '42',
    'null',
    'true',
    'false',
];

/* eslint-enable max-len */
