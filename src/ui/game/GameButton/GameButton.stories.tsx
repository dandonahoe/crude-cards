import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GameButton } from '.';

const meta = {
    title     : 'Game/GameButton',
    component : GameButton,
    tags      : ['autodocs'],
    argTypes  : {
    },

    args : {
        onClick : fn(),
    },
} satisfies Meta<typeof GameButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
    args : {

        text : 'Imma FIrst OnE',
    },
};

export const Secondary: Story = {
    args : {
        text : 'SeCond OnE',
    },
};
