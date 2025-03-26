import type { Meta, StoryObj } from '@storybook/react';
import { GameQuit } from '.';


const meta: Meta<typeof GameQuit> = {
    title     : 'Components/GameQuit',
    component : GameQuit,
    tags      : ['autodocs'],
    argTypes  : {
        onClick : { action : 'clicked' },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const QuitConfirmation: Story = {
    args : {
        onClick : () => alert('Game Exit Confirmed'), // Simulate the exit action
    },
};
