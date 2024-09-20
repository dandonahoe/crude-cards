import { createTheme, MantineColor, rem } from '@mantine/core';

export const AppTheme = createTheme({
    fontFamily : 'Helvetica Neue, sans-serif',

    fontSizes : {
        xs : rem(10),
        sm : rem(11),
        md : rem(14),
        lg : rem(16),
        xl : rem(20),
    },
    colors : {
        white : ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
        black : ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
    },
    components : {
        Text : {
            defaultProps : {
                color : 'white', // Default text color
                fw    : 600,    // Default font weight for text
            },
            styles : {
                root : {
                    // color : 'white', // Ensure text is white by default
                },
            },
        },
        Button : {
            defaultProps : {
                color : 'white', // Default button text color
            },
        },
        Box : {
            styles : (theme: { colors: { white: MantineColor[]; }; }) => ({
                root : {
                    color : theme.colors.white[0], // Apply default white text
                },
            }),
        },
        Heading : {
            defaultProps : {
                fw : 600, // Apply bold font weight to headings by default
            },
        },

    },
});
