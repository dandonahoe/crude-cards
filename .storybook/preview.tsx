import { AppProvider } from '../src/client/AppProvider';
import { Notifications } from '@mantine/notifications';
import { AppTheme } from '../src/client/AppTheme';
import type { Preview } from "@storybook/react";
import { MantineProvider } from '@mantine/core';
import React from "react";

const preview: Preview = {
    decorators: [
        (Story, context) => (
            <div style={{ margin: '3em',  padding : '3em', backgroundColor: '#f00' }} >

                <AppProvider>
                    <MantineProvider theme={AppTheme} >
                        <Notifications />
                        {'Uhhhhh'}
                        <Story {...context} />
                    </MantineProvider>
                </AppProvider>
            </div>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
