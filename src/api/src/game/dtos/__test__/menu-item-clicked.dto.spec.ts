import { MenuItemClickedDTO } from '../menu-item-clicked.dto';
import { ZodError } from 'zod';


describe('MenuItemClickedDTO', () => {

    it('should create a valid instance with valid data', () => {
        const validData = new MenuItemClickedDTO('ABC', '550e8400-e29b-41d4-a716-446655440000', 'item123');

        expect(validData.game_code).toBe('ABC');
        expect(validData.player_id).toBe('550e8400-e29b-41d4-a716-446655440000');
        expect(validData.item_id).toBe('item123');
    });

    it('should create a valid instance with null values for game_code and player_id', () => {
        const validData = new MenuItemClickedDTO(null, null, 'item123');

        expect(validData.game_code).toBeNull();
        expect(validData.player_id).toBeNull();
        expect(validData.item_id).toBe('item123');
    });

    it('should throw ZodError for invalid game_code (not three letters)', () => {
        expect(() => {
            new MenuItemClickedDTO('ABCD', '550e8400-e29b-41d4-a716-446655440000', 'item123');
        }).toThrow(ZodError);
    });

    it('should throw ZodError for invalid player_id (not a UUIDv4)', () => {
        expect(() => {
            new MenuItemClickedDTO('ABC', 'invalid-uuid', 'item123');
        }).toThrow(ZodError);
    });

    it('should throw ZodError for empty item_id', () => {
        expect(() => {
            new MenuItemClickedDTO('ABC', '550e8400-e29b-41d4-a716-446655440000', '');
        }).toThrow(ZodError);
    });

    it('should create a valid default instance', () => {
        const defaultInstance = MenuItemClickedDTO.Default;

        expect(defaultInstance.game_code).toBeNull();
        expect(defaultInstance.player_id).toBeNull();
        expect(defaultInstance.item_id).toBe('defaultItemId');
    });

    it('should throw ZodError when an invalid default instance is attempted', () => {
        expect(() => {
            Object.assign(MenuItemClickedDTO.Default, { item_id : '' });
        }).toThrow(TypeError); // Frozen object modification error
    });
});
