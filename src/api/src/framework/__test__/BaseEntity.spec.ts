import { BaseEntity } from '../BaseEntity';


describe('BaseEntity', () => {
    it('should initialize with default values', async () => {
        const entity = new BaseEntity();

        expect(entity.id).toBeUndefined();
        expect(entity.created_by).toBeNull();
        expect(entity.created_at).toBeNull();
        expect(entity.updated_at).toBeNull();
        expect(entity.title).toBeNull();
    });

    it('should allow setting properties', async () => {
        const entity = new BaseEntity();
        entity.created_by = '123e4567-e89b-12d3-a456-426614174000';
        entity.title = 'Test Title';

        expect(entity.created_by).toBe('123e4567-e89b-12d3-a456-426614174000');
        expect(entity.title).toBe('Test Title');
    });
});
