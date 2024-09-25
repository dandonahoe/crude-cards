import type { Meta, StoryObj } from '@storybook/react';
import { GameText } from '.';

const meta = {
    title     : 'Game/GameText',
    component : GameText,
    tags      : ['autodocs'],
    argTypes  : {
    },
    args : {
    },
} satisfies Meta<typeof GameText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary : Story = {
    args : {
        children : 'CrudeCards Text', // Example ReactNode as a string
    },
};
