/**
 * Storybook stories for GameQuit component
 *
 * Description:
 * This file contains Storybook stories for the GameQuit component,
 * showcasing the confirmation screen for quitting the game.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameQuit" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameQuit } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameQuit> = {
    title     : 'Game/GameQuit',
    component : GameQuit,
};

export default meta;

type Story = StoryObj<typeof GameQuit>;

// Story: Default Game Quit confirmation screen
export const Default: Story = {
    render : () => <GameQuit />,
};

// Story: Game Quit confirmation screen with customized text
export const CustomText: Story = {
    render : () => {
        // Assume the text or label can be customized (if applicable)
        return <GameQuit />;
    },
};

// Story: Game Quit confirmation screen with alternative button style
export const AlternativeStyle: Story = {
    render : () => {
        // Assume a scenario with a different button style
        return <GameQuit />;
    },
};
