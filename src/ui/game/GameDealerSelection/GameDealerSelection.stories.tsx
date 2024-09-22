import type { Meta, StoryObj } from '@storybook/react';
import { GameDealerSelection } from './index'; // Import the GameDealerSelection component
import { CardColor } from '../../../api/src/constant/card-color.enum'; // For card color
import { CardDTO } from '../../../api/src/game/dtos/card.dto'; // Import CardDTO


const meta: Meta<typeof GameDealerSelection> = {
    title     : 'Game/GameDealerSelection',
    component : GameDealerSelection,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample dealer cards
const dealerCards: Partial<CardDTO>[] = [
    { ...CardDTO.Default, id : '1', text : 'Dealer Card 1', color : CardColor.Black },
    { ...CardDTO.Default, id : '2', text : 'Dealer Card 2', color : CardColor.White },
];

export const DealerSelectsCard: Story = {
    args : {
        dealerCards, // Dealer's available cards
        onCardClicked : (id: string) => alert(`Dealer selected card ${id}`), // Simulate card click
    },
};
