export const InvalidList = [
    function() {},      // Empty function (truthy but may be considered invalid in specific type-checking scenarios)
    new Set(),          // Empty Set (truthy but might be considered invalid if expecting content)
    new Map(),          // Empty Map (truthy but might be considered invalid if expecting content)
    null,               // Represents an intentional absence of any value
    undefined,          // The default value of uninitialized variables
    NaN,                // Represents a value that is "Not a Number"
    Symbol(),           // Unique and immutable data type
    (function*() {})(), // Empty generator function
    new WeakMap(),      // Empty WeakMap
    new WeakSet(),      // Empty WeakSet
    // eslint-disable-next-line promise/avoid-new
    new Promise(() => {}),
    new WeakMap(),
];
