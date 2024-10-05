import { v4 as uuidv4 } from 'uuid';


/**
 * Generates a random hash of the specified length using UUID.
 *
 * @param length - The desired length of the hash.
 * @returns A random hash string of the specified length.
 * @throws Will throw an error if the length is not a non-negative integer or exceeds the maximum possible length.
 */
export const generateRandomHash = (length: number): string => {
    // Validate input length
    if (typeof length !== 'number' || !Number.isInteger(length) || length < 0)
        throw new Error('Invalid length: must be a non-negative integer');

    // Generate a UUID, remove hyphens, and transform to uppercase in one step
    const uuidWithoutHyphens = uuidv4().replace(/-/g, '').toUpperCase();

    // Check if the requested length is greater than the available length of the UUID without hyphens
    if (length > uuidWithoutHyphens.length)
        throw new Error('Length of the hash is greater than the length of the UUID');

    // Return the substring of the desired length
    return uuidWithoutHyphens.substring(0, length);
};


/*
* Display a success message in ASCII art.
*/
export const displaySuccess = (): void => {
    console.log('');
    console.log('\x1b[38;2;255;0;0m     .oooooo.   oooo          \x1b[0m');
    console.log('\x1b[38;2;255;64;0m    d8P\'  `Y8b  `888        \x1b[0m');
    console.log('\x1b[38;2;255;128;0m   888      888  888  oooo  \x1b[0m');
    console.log('\x1b[38;2;255;191;0m   888      888  888 .8P\'  \x1b[0m');
    console.log('\x1b[38;2;255;255;0m   888      888  888888.    \x1b[0m');
    console.log('\x1b[38;2;191;255;0m   `88b    d88\'  888 `88b. \x1b[0m');
    console.log('\x1b[38;2;128;255;0m    `Y8bood8P\'  o888o o888o\x1b[0m');
    console.log('');
};
