/**
 * Storybook stories for GamePlayerConfirm component
 *
 * Description:
 * This file contains Storybook stories for the GamePlayerConfirm component,
 * showcasing the confirmation screen when a player is choosing a card.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GamePlayerConfirm" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GamePlayerConfirm } from '../GamePlayerConfirm/index';


// Default export containing Storybook metadata
const meta: Meta<typeof GamePlayerConfirm> = {
    title     : 'Game/GamePlayerConfirm',
    component : GamePlayerConfirm,
};

export default meta;

type Story = StoryObj<typeof GamePlayerConfirm>;

// Story: Default Game Player Confirm screen
export const Default: Story = {
    render : () => <GamePlayerConfirm />,
};

// Story: Game Player Confirm screen with different card text
export const CustomCardText: Story = {
    render : () => <GamePlayerConfirm />,
};

// Story: Game Player Confirm screen with a long subtitle
export const LongSubtitle: Story = {
    render : () => <GamePlayerConfirm />,
};
