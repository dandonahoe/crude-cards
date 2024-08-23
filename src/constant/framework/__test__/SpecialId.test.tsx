import { SpecialId } from '../SpecialId';


describe('SpecialId', () => {
    it('should have the correct values', () => {
        expect(SpecialId.InvalidString).toEqual('special-invalid');
        expect(SpecialId.PlaceholderId).toEqual('special-placeholder');
        expect(SpecialId.EmptyString).toEqual('');
        expect(typeof SpecialId.RandomHash()).toEqual('string');
        expect(SpecialId.DefaultJob).toEqual('default-job');
        expect(SpecialId.CreateHash).toEqual('create-hash');
        expect(SpecialId.InvalidId).toEqual(Number.NEGATIVE_INFINITY);
        expect(SpecialId.DefaultId).toEqual(Number.NEGATIVE_INFINITY);
        expect(SpecialId.Unknown).toEqual('Unknown');
        expect(SpecialId.Null).toEqual('special-null');
    });

    it('should generate a random hash with a prefix', () => {
        const prefix = '[rand]-';
        const randomHash = SpecialId.RandomHash(prefix);
        expect(randomHash.startsWith(prefix)).toBeTruthy();
    });
});
