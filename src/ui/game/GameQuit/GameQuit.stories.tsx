import type { Meta, StoryObj } from '@storybook/react';
import { GameQuit } from './index'; // Import the GameQuit component

const meta: Meta<typeof GameQuit> = {
    title     : 'Game/GameQuit',
    component : GameQuit,
    tags      : ['autodocs'],
    argTypes  : {
        onClick : { action : 'clicked' }, // Use action to log the "Exit" button click in Storybook
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const QuitConfirmation: Story = {
    args : {
        onClick : () => alert('Game Exit Confirmed'), // Simulate the exit action
    },
};
