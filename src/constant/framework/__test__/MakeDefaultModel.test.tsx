import { DefaultGeneric } from '@app/constant/default/DefaultGeneric';


describe('MakeModel', () => {
    it('should return the correct model with default values', () => {

        const model = DefaultGeneric;

        expect(model).toEqual(model);
    });
});
