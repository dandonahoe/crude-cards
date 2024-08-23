import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {

    // Inject the Zod schema to validate the data.
    public constructor(private schema: ZodSchema<unknown>) {}

    /**
     * Transforms and validates the incoming request data based on the metadata type.
     * Uses Zod schema for validation and throws a BadRequestException if validation fails.
     *
     * @param value    - The value to be validated (body, query, or param).
     * @param metadata - Provides metadata about the current validation context.
     *
     * @returns The validated and transformed value.
     * @throws BadRequestException if validation fails.
     */
    public transform(value: any, metadata: ArgumentMetadata) {
        try {
            // Apply Zod schema validation based on the metadata type (body, query, or param).
            if (['body', 'query', 'param'].includes(metadata.type))
                return this.schema.parse(value);

            // Return the original value if the metadata type is not body, query, or param.
            return value;
        } catch (error) {
            // Wrap the validation error into a NestJS BadRequestException.
            throw new BadRequestException(error);
        }
    }
}
