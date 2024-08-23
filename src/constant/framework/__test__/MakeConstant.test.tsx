import { localConstant } from '../MakeConstant';
import { Namespace } from '../Namespace';


describe('localConstant', () => {
    it('should return the correct constant', () => {
        const constant = localConstant(Namespace)('example');
        expect(constant).toEqual(`${Namespace}/example`);
    });

    it('should return the correct constant with a different namespace', () => {
        const constant = localConstant('AnotherNamespace')('example');
        expect(constant).toEqual('AnotherNamespace/example');
    });

    it('should return the correct constant with an empty namespace', () => {
        const constant = localConstant('')('example');
        expect(constant).toEqual('/example');
    });
});
