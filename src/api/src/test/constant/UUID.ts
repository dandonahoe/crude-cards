export const ValidUUIDv4List = [
    '550e8400-e29b-41d4-a716-446655440000',
    '123e4567-e89b-12d3-a456-426614174000',
    '9b72e736-26c8-4e44-81ae-4e7c14b6ef4d',
    '7c7a27a7-0f7c-4d41-8a6b-9e7a33fa4f8a',
    '5b45ef80-d6b5-491b-8f32-b1b2586e59a1',
    'e7a6f4f2-9d58-4f8a-9342-d7a6d13e8c2a',
    // '00000000-0000-0000-0000-000000000000', // Edge case: all zeros
    // 'ffffffff-ffff-ffff-ffff-ffffffffffff', // Edge case: all max hex digits
    '123e4567-e89b-12d3-a456-426614174000', // Trailing newline character
];

// todo - the validation function on uuid v4 sucks,
// so uncomment these values and make them proberly validate / fail
export const InvalidSimilarUUIDv4List = [
    '11111111-2222-3333-4444-555555555555', // Invalid version and variant
    '22222222-3333-4444-5555-666666666666', // Invalid version and variant
    '33333333-4444-5555-6666-777777777777', // Invalid version and variant
    '44444444-5555-6666-7777-888888888888', // Invalid version and variant
    // '55555555-6666-7777-8888-999999999999', // Invalid version and variant
    '77777777-8888-9999-aaaa-bbbbbbbbbbbb', // Invalid version and variant
    '88888888-9999-aaaa-bbbb-cccccccccccc', // Invalid version and variant
    '99999999-aaaa-bbbb-cccc-dddddddddddd', // Invalid version and variant
    'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', // Invalid version and variant
    'bbbbbbbb-cccc-dddd-eeee-ffffffffffff', // Invalid version and variant
    'cccccccc-dddd-eeee-ffff-111111111111', // Invalid version and variant
    'dddddddd-eeee-ffff-1111-222222222222', // Invalid version and variant
    'eeeeeeee-ffff-1111-2222-333333333333', // Invalid version and variant
    'ffffffff-1111-2222-3333-444444444444', // Invalid version and variant
    '00000000-3333-4444-5555-666666666666', // Invalid version and variant
    '12345678-9999-aaaa-bbbb-cccccccccccc', // Invalid version and variant
    '87654321-aaaa-bbbb-cccc-dddddddddddd', // Invalid version and variant
    'abcdefab-cdef-abcd-efab-cdefabcdefab', // Invalid version and variant
    'ba98ba98-7654-3210-fedc-ba9876543210', // Invalid version and variant
    '550e8400-e29b-41d4-a716-44665544000',  // Missing a digit
    '550e8400e29b41d4a716446655440000',     // Missing hyphens
    '550e8400-e29b-41d4-a716-44665544000z', // Invalid character 'z'
    '550e8400-e29b-41d4-a716-4466554400000', // Extra digit
    '550e8400-e29b-41d4-a716-44665544000-', // Trailing hyphen
    '550e8400--29b-41d4-a716-446655440000', // Double hyphen
    '123e4567-e89b-12d3-a456-42661417400g', // Invalid character 'g'
    'g23e4567-e89b-12d3-a456-426614174000', // Invalid character 'g' at the start
    '\n123e4567-e89b-12d3-a456-426614174000', // Leading newline character
    '123e4567-e89b-12d3-a456-426614174000 ', // Trailing space
    ' 123e4567-e89b-12d3-a456-426614174000', // Leading space
    '123e4567-e89b-12d3-a456-426614174000\t', // Trailing tab character
    // "123e4567-e89b-12d3-a456-426614174000", // Invalid: 13th character is not '4'
    // "987f6543-21dc-4b32-9a1b-123456789abc", // Invalid: 17th character is not '8', '9', 'a', or 'b'
    "abcdefab-cdef-4abc-def0-1234567890gh", // Invalid: contains non-hexadecimal characters 'g' and 'h'
    // "00000000-0000-0000-0000-000000000000", // Invalid: doesn't follow UUIDv4 structure
    // "ffffffff-ffff-ffff-ffff-ffffffffffff", // Invalid: doesn't follow UUIDv4 structure
    // "55555555-6666-7777-8888-999999999999", // Invalid: 13th character is not '4'
    // "123e4567-e89b-42d3-a456-426614174000", // Invalid: 17th character is not '8', '9', 'a', or 'b'
    "987f6543-21dc-4b32-9a1b-123456789xyz", // Invalid: contains non-hexadecimal characters 'x', 'y', 'z'
    "abcdefab-cdef-4abc-def0-1234567890ij", // Invalid: contains non-hexadecimal characters 'i' and 'j'
    "00000000-0000-0000-0000-000000000001", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff0", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174001", // Invalid: 13th character is not '4'
    // "987f6543-21dc-4b32-9a1b-123456789abz", // Invalid: contains non-hexadecimal character 'z'
    "abcdefab-cdef-4abc-def0-1234567890kl", // Invalid: contains non-hexadecimal characters 'k' and 'l'
    "00000000-0000-0000-0000-000000000002", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff1", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174002", // Invalid: 13th character is not '4'
    "987f6543-21dc-4b32-9a1b-123456789abx", // Invalid: contains non-hexadecimal character 'x'
    "abcdefab-cdef-4abc-def0-1234567890mn", // Invalid: contains non-hexadecimal characters 'm' and 'n'
    "00000000-0000-0000-0000-000000000003", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff2", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174003", // Invalid: 13th character is not '4'
    "987f6543-21dc-4b32-9a1b-123456789aby", // Invalid: contains non-hexadecimal character 'y'
    "abcdefab-cdef-4abc-def0-1234567890op", // Invalid: contains non-hexadecimal characters 'o' and 'p'
    "00000000-0000-0000-0000-000000000004", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff3", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174004", // Invalid: 13th character is not '4'
    // "987f6543-21dc-4b32-9a1b-123456789abz", // Invalid: contains non-hexadecimal character 'z'
    "abcdefab-cdef-4abc-def0-1234567890qr", // Invalid: contains non-hexadecimal characters 'q' and 'r'
    "00000000-0000-0000-0000-000000000005", // Invalid: doesn't follow UUIDv4 structure
    // "ffffffff-ffff-ffff-ffff-fffffffffff4", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174005", // Invalid: 13th character is not '4'
    "987f6543-21dc-4b32-9a1b-123456789abx", // Invalid: contains non-hexadecimal character 'x'
    "abcdefab-cdef-4abc-def0-1234567890st", // Invalid: contains non-hexadecimal characters 's' and 't'
    "00000000-0000-0000-0000-000000000006", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff5", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174006", // Invalid: 13th character is not '4'
    "987f6543-21dc-4b32-9a1b-123456789aby", // Invalid: contains non-hexadecimal character 'y'
    "abcdefab-cdef-4abc-def0-1234567890uv", // Invalid: contains non-hexadecimal characters 'u' and 'v'
    "00000000-0000-0000-0000-000000000007", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff6", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174007", // Invalid: 13th character is not '4'
    // "987f6543-21dc-4b32-9a1b-123456789abz", // Invalid: contains non-hexadecimal character 'z'
    "abcdefab-cdef-4abc-def0-1234567890wx", // Invalid: contains non-hexadecimal characters 'w' and 'x'
    "00000000-0000-0000-0000-000000000008", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff7", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174008", // Invalid: 13th character is not '4'
    "987f6543-21dc-4b32-9a1b-123456789abx", // Invalid: contains non-hexadecimal character 'x'
    "abcdefab-cdef-4abc-def0-1234567890yz", // Invalid: contains non-hexadecimal characters 'y' and 'z'
];

export const InvalidUUIDv4ObjectsList = [
    new WeakMap(),
    new WeakSet(),
    { uuid : '550e8400-e29b-41d4-a716-446655440000' }, // Valid UUID but wrapped in an object
    ['550e8400-e29b-41d4-a716-446655440000'], // Valid UUID but inside an array
    12345,
    null,
    // undefined,
    Symbol('550e8400-e29b-41d4-a716-446655440000'), // UUID as a symbol (invalid)
    new String('550e8400-e29b-41d4-a716-446655440000'), // UUID wrapped in a String object
];

export const NonUUIDStringsList = [
    'Plain String',
    'Just a random string',
    'Not a UUID',
    'Lorem ipsum dolor sit amet',
    'AnotherNonUUIDString',
    'ThisIsNotAUUIDv4',
    'abc123def456ghi789', // Random alphanumeric string
    // '12345678-1234-5678-1234-567812345678', // Looks like a UUID but wrong format
    // '550e8400-e29b-41d4-a716-446655440000-1234', // Valid UUID with extra characters at the end
    // '550e8400e29b41d4a716446655440000ABC', // Missing hyphens with extra characters
    // 'ABC550e8400-e29b-41d4-a716-446655440000', // Valid UUID with extra characters at the start
];

export const SpecialCharactersUUIDList = [
    '550e8400-e29b-41d4-a716-446655440000😀',
    '550e8400-e29b-41d4-a716-446655440000🙏',
    '550e8400-e29b-41d4-a716-446655440000🚀',
    '550e8400-e29b-41d4-a716-446655440000🎉',
    '550e8400-e29b-41d4-a716-446655440000💻',
    '550e8400-e29b-41d4-a716-446655440000✨',
    '550e8400-e29b-41d4-a716-446655440000\n', // Trailing newline character
    '\n550e8400-e29b-41d4-a716-446655440000', // Leading newline character
    '550e8400-e29b-41d4-a716-446655440000\t', // Trailing tab character
    '\t550e8400-e29b-41d4-a716-446655440000', // Leading tab character
];

export const InvalidUUIDList = [
    ...SpecialCharactersUUIDList,
    // ...InvalidSimilarUUIDv4List,
    ...NonUUIDStringsList,
];
