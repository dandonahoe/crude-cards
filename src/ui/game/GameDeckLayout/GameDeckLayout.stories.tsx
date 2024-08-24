/**
 * Storybook stories for GameDeckLayout component
 *
 * Description:
 * This file contains Storybook stories for the GameDeckLayout component,
 * showcasing different deck layouts based on varying factors like card overlap and wiggle.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameDeckLayout" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameDeckLayout } from '.';
import { CardColor } from '../../../api/src/constant/card-color.enum';

// Default export containing Storybook metadata
const meta: Meta<typeof GameDeckLayout> = {
    title     : 'Game/GameDeckLayout',
    component : GameDeckLayout,
};

export default meta;

type Story = StoryObj<typeof GameDeckLayout>;

// Mock data for cards
const mockCards = [
    <div key='1'>{"Card 1"}</div>,
    <div key='2'>{"Card 2"}</div>,
    <div key='3'>{"Card 3"}</div>,
];

// Story: Default Game Deck Layout with white cards
export const Default: Story = {
    args : {
        cards : mockCards,
        color : CardColor.White,
    },
    render : args => <GameDeckLayout {...args} />,
};

// Story: Game Deck Layout with black cards
export const BlackCards: Story = {
    args : {
        cards : mockCards,
        color : CardColor.Black,
    },
    render : args => <GameDeckLayout {...args} />,
};

// Story: Game Deck Layout with custom wiggle and overlap factors
export const CustomWiggleAndOverlap: Story = {
    args : {
        cards                : mockCards,
        verticleWiggleFactor : 80,
        cardOverlapFactor    : 30,
        wiggleFactor         : 12,
        tiltFactor           : 10,
    },
    render : args => <GameDeckLayout {...args} />,
};
