import { GameStateDTO } from '../../../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
import type { Meta, StoryObj } from '@storybook/react';
import { GameDebug } from '.';


const meta: Meta<typeof GameDebug> = {
    title     : 'Components/GameDebug',
    component : GameDebug,
    tags      : ['autodocs'],
    argTypes  : {
        isVisible : { control : 'boolean' }, // Control to toggle the debug visibility
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample debug data
const sampleDebugData = {
    dealerDealtCard : { ...CardDTO.Default, text : 'Dealer Card', color : 'Black' },
    playerDealtCard : { ...CardDTO.Default, text : 'Player Card', color : 'White' },
    currentPlayer   : { ...PlayerDTO.Default, username : 'Player 1' },
    gameState       : { ...GameStateDTO.Default, game_code : 'ABCD1234', game_stage : 'InProgress' },
    authToken       : 'sample-token',
    isDealer        : true,
    isHost          : false,
};

export const DebugVisible: Story = {
    args : {
        isVisible : true, // Show the debug information
        ...sampleDebugData, // Pass sample debug data
    },
};

export const DebugHidden: Story = {
    args : {
        isVisible : false, // Hide the debug information
        ...sampleDebugData, // Pass sample debug data
    },
};
