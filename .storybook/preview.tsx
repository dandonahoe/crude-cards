import { GameTemplate } from '../src/ui/game/GameTemplate/index';
import { AppScript } from '../src/pages/AppContent/AppScript';
import {  Flex, rem } from '@mantine/core';
import { AppProvider } from '../src/client/AppProvider';

import type { Preview } from "@storybook/react";
import '@mantine/code-highlight/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import React from "react";

const preview: Preview = {
    decorators: [
        (Story, context) => (
            <AppProvider>
                <AppScript />
                <GameTemplate appId='app-alpha'>
                    <Flex justify='center' pt={rem(100)}>
                        <Story {...context} />
                    </Flex>
                </GameTemplate>
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
