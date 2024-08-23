
import { v4 as uuidv4 } from 'uuid';
import { generateRandomHash, displaySuccess } from '../util';

jest.mock('uuid', () => ({
    v4 : jest.fn(),
}));

describe('Utility Functions', () => {
    describe('generateRandomHash', () => {
        it('should throw an error if the length is not a non-negative integer', () => {
            expect(() => generateRandomHash(-1)).toThrow('Invalid length: must be a non-negative integer');
            expect(() => generateRandomHash(1.5)).toThrow('Invalid length: must be a non-negative integer');
            expect(() => generateRandomHash(NaN)).toThrow('Invalid length: must be a non-negative integer');
        });

        it('should throw an error if the requested length exceeds the UUID length without hyphens', () => {
            (uuidv4 as jest.Mock).mockReturnValue('12345678-1234-1234-1234-123456789012');

            // UUID without hyphens has length 32
            expect(() => generateRandomHash(33)).toThrow('Length of the hash is greater than the length of the UUID');
        });

        it('should return a random hash of the specified length', () => {
            (uuidv4 as jest.Mock).mockReturnValue('12345678-1234-1234-1234-123456789012');

            const result = generateRandomHash(10);

            expect(result).toBe('1234567812');
            expect(result).toHaveLength(10);
        });

        it('should return the full UUID without hyphens if the length is 32', () => {
            (uuidv4 as jest.Mock).mockReturnValue('12345678-1234-1234-1234-123456789012');

            const result = generateRandomHash(32);

            expect(result).toBe('12345678123412341234123456789012');
            expect(result).toHaveLength(32);
        });
    });

    describe('displaySuccess', () => {
        it('should print the success message in ASCII art', () => {
            console.log = jest.fn(); // Mock the console.log

            displaySuccess();

            expect(console.log).toHaveBeenCalledTimes(9); // There are 8 console.log calls
            expect(console.log).toHaveBeenCalledWith('\x1b[38;2;255;0;0m     .oooooo.   oooo          \x1b[0m');
            // Add more expectations for each line if necessary
        });
    });
});
