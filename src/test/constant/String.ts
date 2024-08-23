export const StringsList = [
    'Escaped characters: \\' + '"\\n\\r\\t\\b\\f\\u2028\\u2029\\' + '\'',
    'String with special characters: $%^&*()_+-=[]{}|;:,.<>?/~',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    '日本語の文字列', // Japanese characters
    'Español es un idioma hermoso', // Spanish string
    'Plain String',
    'AnotherStringWithoutSpaces',
    'This is a very very very long string just to test the boundaries of what might be considered a normal string in this context.',
];

export const StringsInvalidList = [
    new WeakMap(),
    new WeakSet(),
    { object : 'This is not a string.' },
    ['This', 'is', 'an', 'array', 'not', 'a', 'string'],
    12345,
    null,
    undefined,
    Symbol('not a string'),
];

export const SpecialCharactersList = [
    '😀',
    '🙏',
    '🚀',  // Rocket emoji
    '🎉',  // Tada emoji
    '💻',  // Computer emoji
    '✨',  // Sparkles emoji
];

export const ValidNotObjectStringList = [
    'imma string',
    'hello',
    'null',
    '123',
    'I am not an object',
    'Neither am I',
    'Just another string',
    'True, False, Undefined',
];

export const UnconvertableToStringList = [
    () => {},
    function namedFunc() {},
    new Map([['a', 1], ['b', 2]]),
    new Set([1, 2, 3]),
    Symbol('unconvertable'),
];
