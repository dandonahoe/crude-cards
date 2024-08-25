import { GameTemplate } from '../src/ui/game/GameTemplate/index';
import { AppScript } from '../src/pages/AppContent/AppScript';
import '@mantine/code-highlight/styles.css';
import { AppProvider } from '../src/client/AppProvider';
import { AppTheme } from '../src/client/AppTheme';
import type { Preview } from "@storybook/react";
import { MantineProvider } from '@mantine/core';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import React from "react";
import '@mantine/core/styles.css';

const preview: Preview = {
    decorators: [
        (Story, context) => (
            <AppProvider>
                <AppScript />
                <MantineProvider theme={AppTheme} >
                    <GameTemplate appId='app-alpha'>
                        <Story {...context} />
                    </GameTemplate>
                </MantineProvider>
            </AppProvider>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                // color: /(background|color)$/i,
                // date: /Date$/i,
            },
        },
    },
};

export default preview;
