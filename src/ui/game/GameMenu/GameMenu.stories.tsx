/**
 * Storybook stories for GameMenu component
 *
 * Description:
 * This file contains Storybook stories for the GameMenu component,
 * showcasing different menu scenarios based on the game state and player context.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameMenu" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameMenu } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameMenu> = {
    title     : 'Game/GameMenu',
    component : GameMenu,
};

export default meta;

type Story = StoryObj<typeof GameMenu>;


// Story: Default Game Menu with all options
export const Default: Story = {
    render : () => <GameMenu />,
};

// Story: Game Menu with limited options (Home stage)
export const HomeStageMenu: Story = {
    render : () => {
        return <GameMenu />;
    },
};

// Story: Game Menu with a different player context
export const DifferentPlayerContext: Story = {
    render : () => {
        return <GameMenu />;
    },
};
