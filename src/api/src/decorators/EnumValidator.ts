import deepFreeze from 'deep-freeze-strict';

export function EnumValidator<T extends Record<string, unknown>>(
    enumType: T, defaultValue: T[keyof T]) {
    return function (target: any, propertyKey: string) {
        const privatePropertyKey = `_${propertyKey}`;

        // Initialize the private property with the default value
        Object.defineProperty(target, privatePropertyKey, {
            value        : defaultValue,
            writable     : true,
            enumerable   : false,
            configurable : false,
        });

        Object.defineProperty(target, propertyKey, {
            get () {
                return this[privatePropertyKey];
            },
            set (newValue: T[keyof T] | undefined) {
                if (newValue !== undefined && !Object.values(enumType).includes(newValue))
                    throw new Error(`Invalid value for ${propertyKey}: ${newValue}`);

                Object.defineProperty(this, privatePropertyKey, {
                    value        : newValue,
                    writable     : true, // Keep writable for the setter to function
                    enumerable   : false,
                    configurable : false,
                });
            },
            enumerable   : true,
            configurable : false,
        });

        deepFreeze(target[privatePropertyKey]);

    };
}
