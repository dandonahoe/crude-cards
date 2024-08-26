/**
 * Storybook stories for GameError component
 *
 * Description:
 * This file contains Storybook stories for the GameError component,
 * showcasing different error scenarios and how they are displayed in the UI.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameError" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameError } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameError> = {
    title     : 'Game/GameError',
    component : GameError,
};

export default meta;

type Story = StoryObj<typeof GameError>;

// Story: Default Game Error with a sample message
export const Default: Story = {
    args : {
        children : 'An unexpected error occurred. Please try again.',
    },
    render : args => <GameError {...args} />,
};

// Story: Game Error with a longer, more detailed message
export const DetailedError: Story = {
    args : {
        children : `A critical issue has occurred.
Please check your connection, refresh the page,
or contact support if the problem persists.`,
    },
    render : args => <GameError {...args} />,
};

// Story: Game Error with short message
export const ShortError: Story = {
    args : {
        children : 'Oops! Something went wrong.',
    },
    render : args => <GameError {...args} />,
};
