import { ScreenSize } from '../ScreenSize';


describe('ScreenSize', () => {
    it('should have the correct values', () => {
        expect(ScreenSize.Desktop).toEqual('Desktop');
        expect(ScreenSize.Tablet).toEqual('Tablet');
        expect(ScreenSize.Phone).toEqual('Phone');
    });
});
