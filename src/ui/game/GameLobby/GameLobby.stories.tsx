/**
 * Storybook stories for GameLobby component
 *
 * Description:
 * This file contains Storybook stories for the GameLobby component,
 * showcasing different lobby scenarios based on the number of players.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameLobby" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameLobby } from '.';
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';

// Default export containing Storybook metadata
const meta: Meta<typeof GameLobby> = {
    title     : 'Game/GameLobby',
    component : GameLobby,
};

export default meta;

type Story = StoryObj<typeof GameLobby>;

// Mock data for foes
const mockFoes = [
    { ...PlayerDTO.Default, id : '1', username : 'Player1' },
    { ...PlayerDTO.Default, id : '2', username : 'Player2' },
];

// Story: Default Game Lobby with no players
export const NoPlayers: Story = {
    args : {
        foes : [],
    },
    render : () => <GameLobby />,
};

// Story: Game Lobby with a few players
export const FewPlayers: Story = {
    args : {
        foes : mockFoes,
    },
    render : () => <GameLobby />,
};

// Story: Game Lobby with more players
export const MultiplePlayers: Story = {
    args : {
        foes : [
            ...mockFoes,
            { ...PlayerDTO.Default, id : '3', username : 'Player3' },
            { ...PlayerDTO.Default, id : '4', username : 'Player4' },
        ],
    },
    render : () => <GameLobby />,
};
