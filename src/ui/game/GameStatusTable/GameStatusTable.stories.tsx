import { CardColor } from '../../../api/src/constant/card-color.enum';
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';
import type { Meta, StoryObj } from '@storybook/react';
import { GameStatusTable } from './index';
import { PlayerStatus } from '../type';


const meta: Meta<typeof GameStatusTable> = {

    component : GameStatusTable,
    title     : 'Game/GameStatusTable',
    tags      : ['autodocs'],

    argTypes : {
        shouldShowScore : { control : 'boolean' },
        shouldShowDone  : { control : 'boolean' },
        title           : { control : 'text'    },
    },
}


export default meta;

type Story = StoryObj<typeof meta>;

// Sample player statuses
const samplePlayerStatuses: PlayerStatus[] = [
    {  player : { ...PlayerDTO.Default, id : '1', username : 'Player 1' }, score : 3, isWinner : false, isDone : true  },
    {  player : { ...PlayerDTO.Default, id : '2', username : 'Player 2' }, score : 5, isWinner : true,  isDone : true  },
    {  player : { ...PlayerDTO.Default, id : '3', username : 'Player 3' }, score : 2, isWinner : false, isDone : false },
];

export const DefaultStatusTable: Story = {
    args : {
        playerStatusList : samplePlayerStatuses,
        shouldShowScore  : true,
        shouldShowDone   : true,
        textColor        : CardColor.White,
        title            : 'Game Status 123',
    },
}

export const NoDoneColumn: Story = {
    args : {
        playerStatusList : samplePlayerStatuses,
        shouldShowScore  : true,
        shouldShowDone   : false,
        textColor        : CardColor.White,
        title            : 'Game Status (No Done Column)',
    },
}

export const NoScoreColumn: Story = {
    args : {
        playerStatusList : samplePlayerStatuses,
        shouldShowScore  : false,
        shouldShowDone   : true,
        textColor        : CardColor.White,
        title            : 'Game Status (No Score Column)',

    },
}
