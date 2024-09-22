import type { Meta, StoryObj } from '@storybook/react';
import { GameLobby } from './index'; // Import the GameLobby component
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto'; // Import PlayerDTO

const meta: Meta<typeof GameLobby> = {
    title     : 'Game/GameLobby',
    component : GameLobby,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample players in the lobby
const samplePlayers: PlayerDTO[] = [
    { ...PlayerDTO.Default, id : '1', username : 'Player 1' },
    { ...PlayerDTO.Default, id : '2', username : 'Player 2' },
    { ...PlayerDTO.Default, id : '3', username : 'Player 3' },
];

export const DefaultLobby: Story = {
    args : {
        gameState           : { game_code : 'ABCD1234' }, // Sample game code
        playersExceptDealer : samplePlayers, // Sample players in the lobby
    },
};
