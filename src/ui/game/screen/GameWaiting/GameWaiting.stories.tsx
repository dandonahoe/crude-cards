import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { PlayerDTO } from '../../../../api/src/game/dtos/player.dto';
import type { Meta, StoryObj } from '@storybook/react';
import { PlayerStatus } from '../../type';
import { GameWaiting } from '.';


const meta: Meta<typeof GameWaiting> = {
    title     : 'Screens/GameWaiting',
    component : GameWaiting,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample data to simulate players waiting for action
const samplePlayers: PlayerStatus[] = [
    { player : { ...PlayerDTO.Default, id : '1', username : 'Player 1' }, score : 3, isWinner : false, isDone : false },
    { player : { ...PlayerDTO.Default, id : '2', username : 'Player 2' }, score : 5, isWinner : true,  isDone : true },
];

export const DefaultWaiting: Story = {
    args : {
        dealerDealtCard     : { id : '1', text : 'Dealer Card', color : CardColor.Black },
        playerDealtCard     : { id : '2', text : 'Player Card', color : CardColor.White },
        gameState           : { game_stage : 'PlayerPickWhiteCard' }, // Simulate game stage
        playersExceptDealer : samplePlayers, // Sample player data
    },
};
