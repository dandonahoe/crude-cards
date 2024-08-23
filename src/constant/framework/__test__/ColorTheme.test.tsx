import { ColorTheme } from '../ColorTheme';


describe('ColorTheme', () => {
    it('should have the correct values', () => {
        expect(ColorTheme.Light).toEqual('light');
        expect(ColorTheme.Dark).toEqual('dark');
    });
});
