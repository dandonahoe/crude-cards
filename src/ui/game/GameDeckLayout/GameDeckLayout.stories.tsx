import type { Meta, StoryObj } from '@storybook/react';
import { GameDeckLayout } from './index'; // Import the GameDeckLayout component
import { GameWiggleBox } from '../GameWiggleBox'; // For individual card wiggle box
import { CardColor } from '../../../api/src/constant/card-color.enum'; // For card color
import { CardDTO } from '../../../api/src/game/dtos/card.dto'; // For card data

const meta: Meta<typeof GameDeckLayout> = {
    title     : 'Game/GameDeckLayout',
    component : GameDeckLayout,
    tags      : ['autodocs'],
    argTypes  : {
        verticleWiggleFactor : { control : 'number' },
        cardOverlapFactor    : { control : 'number' },
        wiggleFactor         : { control : 'number' },
        tiltFactor           : { control : 'number' },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample cards for the deck layout
const sampleCards: Partial<CardDTO>[] = [
    { ...CardDTO.Default, id : '1', text : 'Card 1', color : CardColor.Black },
    { ...CardDTO.Default, id : '2', text : 'Card 2', color : CardColor.White },
    { ...CardDTO.Default, id : '3', text : 'Card 3', color : CardColor.Black },
];

export const DefaultDeckLayout: Story = {
    args : {
        verticleWiggleFactor : 50,
        cardOverlapFactor    : 40,
        wiggleFactor         : 6,
        tiltFactor           : 8,
        cards                : sampleCards.map((card, index) => (
            <GameWiggleBox
                key={index}
                index={index}
                uniqueKey={`card-${index}`}
                cardOverlapFactor={40}
                wiggleFactor={6}
                tiltFactor={8}>
                <div>{card.text}</div>
            </GameWiggleBox>
        )),
        id : 'deck-layout-1',
    },
};
