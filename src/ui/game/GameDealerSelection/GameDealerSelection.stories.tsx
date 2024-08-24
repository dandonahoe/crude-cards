/**
 * Storybook stories for GameDealerSelection component
 *
 * Description:
 * This file contains Storybook stories for the GameDealerSelection component,
 * showcasing different states of the dealer's card selection process.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameDealerSelection" to view these stories in the Storybook UI.
 */

import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { Meta, StoryObj } from '@storybook/react';
import { GameDealerSelection } from '.';


// Default export containing Storybook metadata
const meta: Meta<typeof GameDealerSelection> = {
    title     : 'Game/GameDealerSelection',
    component : GameDealerSelection,
};

export default meta;

type Story = StoryObj<typeof GameDealerSelection>;

// Mock data for dealer cards
const mockDealerCards: CardDTO[] = [
    { id : '1', text : 'First dealer card', color : CardColor.Black },
    { id : '2', text : 'Second dealer card', color : CardColor.Black },
    { id : '3', text : 'Third dealer card', color : CardColor.Black },
];

// Story: Default Game Dealer Selection with mock dealer cards
export const Default: Story = {
    args : {
        dealerCards : mockDealerCards,
    },
    render : () => <GameDealerSelection />,
};

// Story: Game Dealer Selection with no dealer cards
export const NoDealerCards: Story = {
    args : {
        dealerCards : [],
    },
    render : () => <GameDealerSelection />,
};

// Story: Game Dealer Selection with more dealer cards
export const MultipleDealerCards: Story = {
    args : {
        dealerCards : [
            ...mockDealerCards,
            { id : '4', text : 'Fourth dealer card', color : CardColor.Black },
            { id : '5', text : 'Fifth dealer card', color : CardColor.Black },
        ],
    },
    render : () => <GameDealerSelection />,
};
