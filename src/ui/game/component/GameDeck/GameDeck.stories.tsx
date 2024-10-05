import type { Meta, StoryObj } from '@storybook/react';
import { GameDeck } from '.'; // Import the GameDeck component
import { CardColor } from '../../../../api/src/constant/card-color.enum'; // For card color
import { CardDTO } from '../../../../api/src/game/dtos/card.dto'; // Import CardDTO

const meta: Meta<typeof GameDeck> = {
    title     : 'Components/GameDeck',
    component : GameDeck,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample cards for the deck
const sampleCards: CardDTO[] = [
    { ...CardDTO.Default, id : '1', text : 'Card 1', color : CardColor.Black },
    { ...CardDTO.Default, id : '2', text : 'Card 2', color : CardColor.White },
    { ...CardDTO.Default, id : '3', text : 'Card 3', color : CardColor.Black },
];

export const DefaultDeck: Story = {
    args : {
        cards         : sampleCards, // Provide the sample cards to the deck
        onCardClicked : (id: string) => alert(`Card ${id} clicked!`), // Simulate clicking on a card
    },
};
