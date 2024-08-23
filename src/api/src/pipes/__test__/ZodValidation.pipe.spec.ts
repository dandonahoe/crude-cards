import { ZodValidationPipe } from '../ZodValidation.pipe';
import { BadRequestException } from '@nestjs/common';
import { AuthDTO } from '../../game/dtos/auth.dto';

describe('ZodValidationPipe', () => {
    let pipe: ZodValidationPipe;

    beforeEach(() => {
        pipe = new ZodValidationPipe(AuthDTO.Schema);
    });

    it('should pass with valid UUIDv4', () => {
        const validData = {
            auth_token : '550e8400-e29b-41d4-a716-446655440000', // Valid UUIDv4
        };

        expect(pipe.transform(validData, { type : 'body' })).toEqual(validData);
    });

    it('should pass with undefined auth_token', () => {
        const validData = {};

        expect(pipe.transform(validData, { type : 'body' })).toEqual(validData);
    });

    it('should throw BadRequestException for invalid UUID', () => {
        const invalidData = {
            auth_token : 'invalid-uuid', // Invalid UUID string
        };

        expect(() => pipe.transform(invalidData, { type : 'body' })).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for additional fields', () => {
        const invalidData = {
            auth_token : '550e8400-e29b-41d4-a716-446655440000', // Valid UUIDv4
            extraField : 'extraValue', // This field is not allowed by the schema
        };

        expect(() => pipe.transform(invalidData, { type : 'body' })).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for null value on auth_token', () => {
        const invalidData = {
            auth_token : null, // Should be a valid UUID or undefined, not null
        };

        expect(() => pipe.transform(invalidData, { type : 'body' })).toThrow(BadRequestException);
    });
});
