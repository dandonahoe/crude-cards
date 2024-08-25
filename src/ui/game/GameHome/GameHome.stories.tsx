/**
 * Storybook stories for GameHome component
 *
 * Description:
 * This file contains Storybook stories for the GameHome component,
 * showcasing different home page states, including starting a new game and joining by code.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameHome" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameHome } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameHome> = {
    title     : 'Game/GameHome',
    component : GameHome,
};

export default meta;

type Story = StoryObj<typeof GameHome>;

// Story: Default Game Home screen
export const Default: Story = {
    render : () => <GameHome />,
};

// Story: Game Home screen with pre-filled game code
export const PrefilledGameCode: Story = {
    render : () => {
        // Simulating state with a pre-filled game code
        const component = <GameHome />;

        // Normally, this state would be internal to the component.
        return component;
    },
};

// Story: Game Home screen with a mobile view
export const MobileView: Story = {
    render : () => <GameHome />,
};
