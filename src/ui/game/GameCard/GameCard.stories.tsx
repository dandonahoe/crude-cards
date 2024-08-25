/**
 * Storybook stories for GameCard component
 *
 * Description:
 * This file contains Storybook stories for the GameCard component. Each story represents
 * a different state or variation of the component. Storybook helps in testing and showcasing
 * the component's appearance and behavior in isolation.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameCard" to view these stories in the Storybook UI.
 */

import { CardColor } from '../../../api/src/constant/card-color.enum';
import { Meta, StoryObj } from '@storybook/react';
import { GameCard } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameCard> = {
    title     : 'Game/GameCard',
    component : GameCard,
    argTypes  : {
        onClick : { action : 'clicked' },
    },
};

export default meta;

type Story = StoryObj<typeof GameCard>;

// Sample data for GameCard stories
const sampleCardBlack = {
    id    : 'black-id',
    color : CardColor.Black,
    text  : 'This is a sample <strong>black</strong> card.',
};

const sampleCardWhite = {
    id    : 'white-id',
    color : CardColor.White,
    text  : 'This is a sample <strong>white</strong> card.',
};

// Story: Default GameCard (white card)
export const Default: Story = {
    args : {
        card : sampleCardWhite,
    },
};

// Story: Hovered GameCard (black card) with click interaction enabled
export const Hovered: Story = {
    args : {
        card    : sampleCardBlack,
        onClick : () => console.log('Black card clicked!'),
    },
};

// Story: GameCard with missing text
export const MissingText: Story = {
    args : {
        card : {
            id    : 'missing-text-id',
            color : CardColor.White,
            text  : null,
        },
    },
};
