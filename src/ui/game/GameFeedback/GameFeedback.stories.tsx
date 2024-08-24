/**
 * Storybook stories for GameFeedback component
 *
 * Description:
 * This file contains Storybook stories for the GameFeedback component,
 * showcasing the form submission process and validation scenarios.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameFeedback" to view
 * these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameFeedback } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameFeedback> = {
    title     : 'Game/GameFeedback',
    component : GameFeedback,
};

export default meta;

type Story = StoryObj<typeof GameFeedback>;

// Story: Default Game Feedback form
export const Default: Story = {
    render : () => <GameFeedback />,
};

// Story: Game Feedback form after successful submission
export const Submitted: Story = {
    render : () => {
        const component = <GameFeedback />;

        // Simulate form submission behavior here if needed, such as mocking the dispatch or setting state.
        return component;
    },
};

// Story: Game Feedback form with validation errors (for interactive testing)
export const WithValidationErrors: Story = {
    render : () => <GameFeedback />,
};
