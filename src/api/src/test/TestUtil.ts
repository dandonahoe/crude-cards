import { z } from 'zod';

export const valueToString = (value: unknown): string => {
    // Handle null and undefined
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';

    // Handle functions
    if (typeof value === 'function') return '()';

    // Handle BigInt and symbols
    if (typeof value === 'bigint' || typeof value === 'symbol')
        return value.toString();

    // Handle circular references
    try {
        return JSON.stringify(value);
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Converting circular structure to JSON'))
            return '{}';

        throw error;
    }
};


const isoDateTimeRegex = /^(\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-][01]\d:[0-5]\d))$/;


export const zodIsoDateTimeString = () =>
    z.string().refine(val => isoDateTimeRegex.test(val), {
        message : "Invalid ISO 8601 date-time string",
    }).nullable();
