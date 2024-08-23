import { BooleanInvalidList, BooleanValidList } from './Boolean';
import { StringsInvalidList } from './String';
import { ValidUUIDv4List } from "./UUID";

// Base variable definitions
export const EmailValidList = [
    // Correct format: standard email addresses
    "example@example.com", // Standard format with common domain
    "user.name+tag+sorting@example.com", // Using '+' symbol and dots in local part
    "user_name@sub.example.co.uk", // Subdomain and country code TLD
    "firstname.lastname@example.com", // Local part with dot separator
    "email@domain.com", // Simple valid email
    "1234567890@example.com", // Numerical local part
    "email@subdomain.example.com", // Subdomain usage
    "email@[123.123.123.123]", // IP address as domain
    "\"email\"@example.com", // Quoted local part
    "email@domain-one.com", // Hyphen in domain
    "_______@example.com", // Underscore in local part
    "email@domain.name", // Domain with .name TLD
    "email@domain.co.jp", // Country code TLD
    "firstname-lastname@example.com", // Hyphen in local part
];

// Base variable definitions
export const EmailInvalidList = [
    ...ValidUUIDv4List,
    ...BooleanValidList,
    ...BooleanInvalidList,
    ...StringsInvalidList,

    // Testing various invalid formats
    "plainaddress", // Missing '@' symbol
    "@missingusername.com", // Missing local part
    "username@.com.my", // Leading dot in domain
    "username@sub..example.com", // Consecutive dots in domain
    "username@-example.com", // Domain starts with a hyphen
    "username@example.com.", // Trailing dot in domain
    "username.@example.com", // Trailing dot in local part
    "username@example..com", // Consecutive dots in domain
    "Abc.example.com", // Missing '@'
    "A@b@c@example.com", // Multiple '@' symbols
    "a\"b(c)d,e:f;g<h>i[j\\k]l@example.com", // Special characters in local part not allowed outside quotes
    "just\"not\"right@example.com", // Quotes must be properly closed
    "this is\"not\\allowed@example.com", // Spaces and backslashes in local part
    "this\\ still\\\"not\\\\allowed@example.com", // Misplaced escape characters
    "john..doe@example.com", // Double dot in local part
    "john.doe@example..com", // Double dot in domain part
    ".username@yahoo.com", // Local part starts with dot
    "username@yahoo.com.", // Domain ends with dot
    "username@yahoo..com", // Consecutive dots in domain
    "username@yahoo.c", // Single character TLD
    "username@yahoo.corporate", // Long TLD without a period
];
