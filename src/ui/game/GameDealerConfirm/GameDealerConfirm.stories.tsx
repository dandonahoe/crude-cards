/**
 * Storybook stories for GameDealerConfirm component
 *
 * Description:
 * This file contains Storybook stories for the GameDealerConfirm component, showcasing different states of the dealer confirmation process.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameDealerConfirm" to view these stories in the Storybook UI.
 */

import { AppProvider } from '@app/client/AppProvider';
import { Meta, StoryObj } from '@storybook/react';
import { GameDealerConfirm } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameDealerConfirm> = {
    title      : 'Game/GameDealerConfirm',
    component  : GameDealerConfirm,
    decorators : [Story => <AppProvider><Story /></AppProvider>],
};

export default meta;

type Story = StoryObj<typeof GameDealerConfirm>;

// Story: Default Game Dealer Confirm
export const Default: Story = {
    render : () => <GameDealerConfirm />,
};

// Story: Game Dealer Confirm with a different card color
export const AlternateColor: Story = {
    render : () => (
        <GameDealerConfirm />
    ),
};

// Story: Game Dealer Confirm with a longer subtitle
export const LongSubtitle: Story = {
    render : () => (
        <GameDealerConfirm />
    ),
};
