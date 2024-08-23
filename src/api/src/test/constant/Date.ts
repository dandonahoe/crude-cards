// Base variable definitions
export const DatesValidList = [
    new Date('Thu Oct 06 2023 00:00:00 GMT+0000'),
    new Date('2023-10-06T12:34:56.789+00:00'),
    new Date(0),                                  // Unix Epoch
    new Date(1640995200000),                      // Start of 2022 in milliseconds since Unix Epoch
    new Date(Date.UTC(2022, 0)),                  // Using Date.UTC
    new Date('2022'),                            // Just the year
    new Date('2022-01'),                         // Year and month
    new Date('2000-02-29'),                      // Valid leap year
    new Date('2022-11-30T23:59:59.999Z'),        // Milliseconds before next day
    new Date('2023-02-28T12:34:56.789Z'),        // Not a leap year
];

export const DatesInvalidStringList = [
    '01-01-2022 25:00:00',                        // Invalid hour
    '01-01-2022 00:60:00',                        // Invalid minute
    '2022-02-30',                                // Invalid day for February
    '2022-13-01',                                // Invalid month
    'Not a Date',                                // Random string
    '2022-00-00',                                // Invalid day and month
    '2020-02-30',                                // Invalid leap year day
    '30-02-2022',                                // Invalid day before month format
];

export const DatesInvalidList = DatesInvalidStringList.map(date => new Date(date));

// Additional array types:

export const DatesEdgeCasesList = [
    new Date(Number.MAX_SAFE_INTEGER),           // Maximum safe integer time
    new Date(Number.MIN_SAFE_INTEGER),           // Minimum safe integer time
    new Date(8640000000000000),                  // Max date range in JS
    new Date(-8640000000000000),                 // Min date range in JS
    new Date('0000-01-01T00:00:00Z'),            // Start of the Common Era
    new Date('-0001-12-31T23:59:59.999Z'),       // Milliseconds before the Common Era
];

export const DatesInFutureList = [
    new Date('9999-12-31'),                      // Distant future date
    new Date('2100-01-01'),                      // Start of 22nd century
    new Date('2500-05-05'),                      // Arbitrary future date
    new Date('5000-12-25'),                      // Far future Christmas
];

export const DatesInPastList = [
    new Date('0001-01-01'),                      // Distant past date
    new Date('1900-01-01'),                      // Start of 20th century
    new Date('1776-07-04'),                      // Independence Day for the USA
    new Date('1492-10-12'),                      // Columbus reached the New World
];

