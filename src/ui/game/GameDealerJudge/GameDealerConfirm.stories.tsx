/**
 * Storybook stories for GameDealerJudge component
 *
 * Description:
 * This file contains Storybook stories for the GameDealerJudge component, showcasing different states of the dealer's card judging process.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameDealerJudge" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameDealerJudge } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameDealerJudge> = {
    title     : 'Game/GameDealerJudge',
    component : GameDealerJudge,
};

export default meta;

type Story = StoryObj<typeof GameDealerJudge>;

// Mock data for the selected cards
const mockSelectedCards = [
    { id : '1', text : 'First card', color : 'black' },
    { id : '2', text : 'Second card', color : 'white' },
    { id : '3', text : 'Third card', color : 'black' },
];

// Story: Default Game Dealer Judge with mock selected cards
export const Default: Story = {
    args : {
        selectedCards : mockSelectedCards,
    },
    render : () => <GameDealerJudge />,
};

// Story: Game Dealer Judge with no selected cards
export const NoSelectedCards: Story = {
    args : {
        selectedCards : [],
    },
    render : () => <GameDealerJudge />,
};

// Story: Game Dealer Judge with more cards
export const MultipleCards: Story = {
    args : {
        selectedCards : [
            ...mockSelectedCards,
            { id : '4', text : 'Fourth card', color : 'white' },
            { id : '5', text : 'Fifth card', color : 'black' },
        ],
    },
    render : () => <GameDealerJudge />,
};
