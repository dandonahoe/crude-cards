/**
 * Storybook stories for GamePopup component
 *
 * Description:
 * This file contains Storybook stories for the GamePopup component,
 * showcasing different popup scenarios based on the popup type.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GamePopup" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GamePopup } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GamePopup> = {
    title     : 'Game/GamePopup',
    component : GamePopup,
};

export default meta;

type Story = StoryObj<typeof GamePopup>;

// Story: Default Game Popup displaying the scoreboard
export const ScoreboardPopup: Story = {
    render : () => {
        // Assume GamePopupType is set to Scoreboard in the global context
        return <GamePopup />;
    },
};

// Story: Game Popup displaying feedback form
export const FeedbackPopup: Story = {
    render : () => {
        // Assume GamePopupType is set to Feedback in the global context
        return <GamePopup />;
    },
};

// Story: Game Popup displaying settings
export const SettingsPopup: Story = {
    render : () => {
        // Assume GamePopupType is set to Settings in the global context
        return <GamePopup />;
    },
};

// Story: Game Popup displaying quit confirmation
export const QuitPopup: Story = {
    render : () => {
        // Assume GamePopupType is set to Quit in the global context
        return <GamePopup />;
    },
};

// Story: Game Popup displaying an error
export const ErrorPopup: Story = {
    render : () => {
        // Assume GamePopupType is set to an invalid or unexpected value
        return <GamePopup />;
    },
};
