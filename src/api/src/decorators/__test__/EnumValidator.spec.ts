import { EnumValidator } from "../EnumValidator";


// Example enum for testing
enum ExampleEnum {
    ValueA = 'ValueA',
    ValueB = 'ValueB',
    Unknown = 'Unknown',
}

// Test class using the EnumValidator
class TestClass {
    @EnumValidator(ExampleEnum, ExampleEnum.Unknown)
    public property!: ExampleEnum;
}

describe('EnumValidator', () => {

    it('should initialize the property with the default value', () => {
        const instance = new TestClass();
        expect(instance.property).toBe(ExampleEnum.Unknown);
    });

    it('should allow setting a valid enum value', () => {
        const instance = new TestClass();
        instance.property = ExampleEnum.ValueA;
        expect(instance.property).toBe(ExampleEnum.ValueA);

        instance.property = ExampleEnum.ValueB;
        expect(instance.property).toBe(ExampleEnum.ValueB);
    });

    it('should throw an error when setting an invalid enum value', () => {
        const instance = new TestClass();
        expect(() => {
            instance.property = 'InvalidValue' as ExampleEnum;
        }).toThrow(Error);
    });

    it('should set the property to undefined if undefined is provided', () => {
        const instance = new TestClass();
        instance.property = undefined as unknown as ExampleEnum;
        expect(instance.property).toBeUndefined();
    });

    it('should not throw an error when setting a valid value after an invalid attempt', () => {
        const instance = new TestClass();

        try {
            instance.property = 'InvalidValue' as ExampleEnum;
        } catch {
            // Intentionally left empty to handle the error
        }

        expect(() => {
            instance.property = ExampleEnum.ValueB;
        }).not.toThrow();
        expect(instance.property).toBe(ExampleEnum.ValueB);
    });

    it('should handle reassignment of the property to a valid value', () => {
        const instance = new TestClass();
        instance.property = ExampleEnum.ValueA;
        expect(instance.property).toBe(ExampleEnum.ValueA);

        instance.property = ExampleEnum.ValueB;
        expect(instance.property).toBe(ExampleEnum.ValueB);
    });

    it('should throw an error if attempting to assign a value of an incorrect type', () => {
        const instance = new TestClass();
        expect(() => {
            instance.property = 123 as unknown as ExampleEnum;
        }).toThrow(Error);
    });
});

