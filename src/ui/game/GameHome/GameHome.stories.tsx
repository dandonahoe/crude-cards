import type { Meta, StoryObj } from '@storybook/react';
import { GameHome } from './index'; // Import the GameHome component

const meta: Meta<typeof GameHome> = {
    title     : 'Game/GameHome',
    component : GameHome,
    tags      : ['autodocs'],
    argTypes  : {
        onStartGame : { action : 'start game clicked' }, // Action to simulate game start
        onJoinGame  : { action : 'join game clicked' },  // Action to simulate joining a game
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultHome: Story = {
    args : {
        onStartGame : () => alert('Game started!'), // Simulate starting the game
        onJoinGame  : () => alert('Joined game with code!'), // Simulate joining the game
    },
};
