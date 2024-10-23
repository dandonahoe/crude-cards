import type { Meta, StoryObj } from '@storybook/react';
import { GamePlayerSelection } from '.'; // Import the GamePlayerSelection component
import { CardColor } from '../../../../api/src/constant/card-color.enum'; // For card color
import { CardDTO } from '../../../../api/src/game/dtos/card.dto'; // For card data

const meta: Meta<typeof GamePlayerSelection> = {
    title     : 'Components/GamePlayerSelection',
    component : GamePlayerSelection,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample card data for player selection
const samplePlayerCards: Partial<CardDTO>[] = [
    { ...CardDTO.Default, id : '1', text : 'Player Card 1', color : CardColor.White },
    { ...CardDTO.Default, id : '2', text : 'Player Card 2', color : CardColor.Black },
];

export const DefaultPlayerSelection: Story = {
    args : {
        playerCards   : samplePlayerCards, // Provide sample player cards
        onCardClicked : (id: string) => alert(`Player selected card ${id}`), // Simulate card selection
    },
};
