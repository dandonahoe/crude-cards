import type { Meta, StoryObj } from '@storybook/react';
import { GameWiggleBox } from '.';

const meta: Meta<typeof GameWiggleBox> = {
    title     : 'Components/GameWiggleBox',
    component : GameWiggleBox,
    tags      : ['autodocs'],
    argTypes  : {
        verticleWiggleFactor : { control : 'number' },  // Control for vertical wiggle factor
        cardOverlapFactor    : { control : 'number' },     // Control for card overlap factor
        wiggleFactor         : { control : 'number' },          // Control for wiggle factor
        tiltFactor           : { control : 'number' },            // Control for tilt factor
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultWiggle: Story = {
    args : {
        verticleWiggleFactor : 50,
        cardOverlapFactor    : 40,
        wiggleFactor         : 6,
        tiltFactor           : 8,
        index                : 0,
        children             : <div>{"This is a wiggling box!"}</div>, // Child content to demonstrate the effect
    },
};
