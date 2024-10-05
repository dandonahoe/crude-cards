import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
import type { Meta, StoryObj } from '@storybook/react';
import { GameDealerJudge } from '.';


const meta: Meta<typeof GameDealerJudge> = {
    component : GameDealerJudge,
    title     : 'Screens/GameDealerJudge',
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample cards to be judged
const sampleCards: CardDTO[] = [
    { id : '1', text : 'Card 1 Text', color : CardColor.Black },
    { id : '2', text : 'Card 2 Text', color : CardColor.White },
    { id : '3', text : 'Card 3 Text', color : CardColor.Black },
];

export const DealerJudging: Story = {
    args : {
        // Simulate a selection of cards for the dealer to judge
        cards         : sampleCards,
        onCardClicked : (id: string) => alert(`Card ${id} clicked!`), // Simulate card click action
    },
};
