
import nextJest from 'next/jest.js';


const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir : './',
});


const config = {

    // Add more setup options before each test is run
    setupFilesAfterEnv : [
        '<rootDir>/jest.setup.ts',
    ],

    preset : 'ts-jest',

    modulePathIgnorePatterns : [
        '<rootDir>/.next',

        // Don't run the backend tests
        '<rootDir>/src/api',
    ],

    testEnvironmentOptions : {
    },

    collectCoverage   : true,
    coverageDirectory : 'artifact/coverage',

    coverageReporters : [
        'html',
        'text',
        'lcov',
    ],

    transformIgnorePatterns : [
        'node_modules/(?!@ngrx|(?!uuid)|ng-dynamic|uuid)',
    ],

    clearMocks : true,

    moduleNameMapper : {
        '^@app/client' : [
            'src/client/index.tsx',
        ],
        '^@app/server' : [
            'src/server/index.tsx',
        ],
        '^@app/ui' : [
            'src/ui/index.tsx',
        ],
        '^@app/server/(.*)$' : [
            'src/server/$1',
        ],
        '^@app/shared/(.*)$' : [
            'src/shared/$1',
        ],
        '^@app/api/(.*)$' : [
            'src/pages/api/$1',
        ],
        '^@app/(.*)$' : [
            '<rootDir>/src/core/$1',
            '<rootDir>/src/$1',
        ],
    },
};

// createJestConfig is exported this way to ensure that next/jest
// can load the Next.js config which is async
const jestConfig = createJestConfig(config);

// eslint-disable-next-line import/no-default-export
export default jestConfig;


