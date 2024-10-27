import seedrandom from 'seedrandom';

const rand = seedrandom('reliable');

export const SpecialId = {
    DefaultGameIdAlpha : 'default-game-id-alpha',
    DefaultGameIdBeta  : 'default-game-id-beta',
    DefaultGameId      : 'default-game-id',
    PlaceholderId      : 'special-placeholder',
    EmptyString        : '',
    RandomHash         : (prefix = '[rand]-') : string => `${prefix}_${rand()}`,
    DefaultJob         : 'default-job',
    CreateHash         : 'create-hash',
    InvalidId          : Number.NEGATIVE_INFINITY,
    DefaultId          : Number.NEGATIVE_INFINITY,
    Unknown            : 'Unknown',
    Null               : 'special-null',

    // if details is provided, output [invlaid-hash-details], otherwise [invalid-hash]
    InvalidHash : (details = '') : string =>
        `[invalid-hash${details ? `-${details}` : ''}]`,

} as const;
