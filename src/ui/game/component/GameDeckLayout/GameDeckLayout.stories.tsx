import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
import type { Meta, StoryObj } from '@storybook/react';
import { GameWiggleBox } from '../GameWiggleBox';
import { Text } from '@mantine/core';
import { GameDeckLayout } from '.';


const meta: Meta<typeof GameDeckLayout> = {
    title     : 'Components/GameDeckLayout',
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
                cardOverlapFactor={40}
                id={`card-${index}`}
                wiggleFactor={6}
                tiltFactor={8}
                index={index}
                key={index}>
                <Text>
                    {card.text}
                </Text>
            </GameWiggleBox>
        )),
        id : 'deck-layout-1',
    },
};
