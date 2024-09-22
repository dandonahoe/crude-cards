import type { Meta, StoryObj } from '@storybook/react';
import { GameScoreboard } from './index'; // Import the GameScoreboard component
import { CardColor } from '../../../api/src/constant/card-color.enum'; // For text color


const meta: Meta<typeof GameScoreboard> = {
    title     : 'Game/GameScoreboard',
    component : GameScoreboard,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample player data for the scoreboard
const samplePlayers = [
    { player : { id : '1', username : 'Player 1' }, score : 3, isWinner : false, isDone : true },
    { player : { id : '2', username : 'Player 2' }, score : 5, isWinner : true, isDone : true },
    { player : { id : '3', username : 'Player 3' }, score : 1, isWinner : false, isDone : false },
];

export const DefaultScoreboard: Story = {
    args : {
        playerStatusList : samplePlayers, // Provide the sample player data
        shouldShowScore  : true, // Show the scores
        shouldShowDone   : true, // Indicate if players are done
        textColor        : CardColor.White, // Set text color to white
    },
};
