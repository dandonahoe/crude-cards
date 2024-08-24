/**
 * Storybook stories for GameJudgeConfirm component
 *
 * Description:
 * This file contains Storybook stories for the GameJudgeConfirm component,
 * showcasing different scenarios for the judge confirmation process.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameJudgeConfirm" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameJudgeConfirm } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameJudgeConfirm> = {
    title     : 'Game/GameJudgeConfirm',
    component : GameJudgeConfirm,
};

export default meta;

type Story = StoryObj<typeof GameJudgeConfirm>;

// Story: Default Game Judge Confirm screen
export const Default: Story = {
    render : () => <GameJudgeConfirm />,
};

// Story: Game Judge Confirm with different card texts
export const CustomCards: Story = {
    render : () => <GameJudgeConfirm />,
};

// Story: Game Judge Confirm with a long subtitle
export const LongSubtitle: Story = {
    render : () => <GameJudgeConfirm />,
};
