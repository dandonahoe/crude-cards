import { nanoid } from '@reduxjs/toolkit';


export const SpecialId = {
    InvalidString : 'special-invalid',
    PlaceholderId : 'special-placeholder',
    EmptyString   : '',
    RandomHash    : (prefix = '[rand]-') : string => `${prefix}${nanoid()}`,
    DefaultJob    : 'default-job',
    CreateHash    : 'create-hash',
    InvalidId     : Number.NEGATIVE_INFINITY,
    DefaultId     : Number.NEGATIVE_INFINITY,
    Unknown       : 'Unknown',
    Null          : 'special-null',
} as const;
