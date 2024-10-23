import { createTheme, rem } from '@mantine/core';


export const GameThemeBlueSteel = createTheme({

    fontFamily : '\'Helvetica Neue Bold\', Arial, sans-serif',

    fontSizes : {
        xs : rem(16),
        sm : rem(24),
        md : rem(36),
        lg : rem(48),
        xl : rem(60),
    },

    headings : {
        sizes : {
            h1 : {
                fontSize : rem(72),
            },
        },
    },
});

