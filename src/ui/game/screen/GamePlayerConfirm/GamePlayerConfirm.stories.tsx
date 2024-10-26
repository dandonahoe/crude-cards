import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
import type { Meta, StoryObj } from '@storybook/react';
import { GamePlayerConfirm } from '.';


const meta: Meta<typeof GamePlayerConfirm> = {
    title     : 'Screens/GamePlayerConfirm',
    component : GamePlayerConfirm,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample card data
const sampleCard: Partial<CardDTO> = {
    ...CardDTO.Default,
    text  : 'Doing the Hustle',
    color : CardColor.Black,
};

export const DefaultConfirmation: Story = {
    args : {
        card    : sampleCard, // Card to confirm
        onClick : () => alert('Card Confirmed!'), // Simulate card confirmation
    },
};
