import type { Meta, StoryObj } from '@storybook/react';
import { GameComplete } from './index'; // Import the GameComplete component
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto'; // For player data

const meta: Meta<typeof GameComplete> = {
    title     : 'Game/GameComplete',
    component : GameComplete,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample game complete state
const sampleGameState = {
    allPlayerStatus : [
        { player : { ...PlayerDTO.Default, id : '1', username : 'Player 1' }, score : 3, isWinner : true },
        { player : { ...PlayerDTO.Default, id : '2', username : 'Player 2' }, score : 1, isWinner : false },
    ],
    gameChampion : { ...PlayerDTO.Default, username : 'Player 1' },
    isWinner     : true,
};

export const DefaultComplete: Story = {
    args : {
        gameCompleteState : sampleGameState, // Pass the sample game completion data
    },
};
