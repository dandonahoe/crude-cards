/**
 * Storybook stories for GameDebug component
 *
 * Description:
 * This file contains Storybook stories for the GameDebug component, showcasing different states of the game debug information.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameDebug" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameDebug } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameDebug> = {
    title     : 'Game/GameDebug',
    component : GameDebug,
};

export default meta;

type Story = StoryObj<typeof GameDebug>;

// Story: Default Game Debug
export const Default: Story = {
    render : () => <GameDebug />,
};

// Story: Game Debug with some error in game state
export const WithError: Story = {
    render : () => <GameDebug />,
};

// Story: Game Debug showing dealer and player details
export const DealerAndPlayerDetails: Story = {
    render : () => <GameDebug />,
};
