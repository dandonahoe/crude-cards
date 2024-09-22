import type { Meta, StoryObj } from '@storybook/react';
import { GameStatusTable } from './index'; // Import the GameStatusTable component
import { PlayerStatus } from '../type'; // Import PlayerStatus type
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';

const meta: Meta<typeof GameStatusTable> = {
    title     : 'Game/GameStatusTable',
    component : GameStatusTable,
    tags      : ['autodocs'],
    argTypes  : {
        shouldShowScore : { control : 'boolean' }, // Control to toggle score visibility
        shouldShowDone  : { control : 'boolean' },  // Control to toggle "done" status visibility
        title           : { control : 'text' },              // Control for the table title
    },
};


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
        playerStatusList : samplePlayerStatuses,  // Sample player statuses
        shouldShowScore  : true,                   // Show player scores
        shouldShowDone   : true,                    // Show whether players are done
        title            : 'Game Status',                    // Title of the status table
    },
};

export const NoDoneColumn: Story = {
    args : {
        playerStatusList : samplePlayerStatuses,  // Sample player statuses
        shouldShowScore  : true,                   // Show player scores
        shouldShowDone   : false,                   // Hide "done" status column
        title            : 'Game Status (No Done Column)',   // Title of the status table
    },
};

export const NoScoreColumn: Story = {
    args : {
        playerStatusList : samplePlayerStatuses,  // Sample player statuses
        shouldShowScore  : false,                  // Hide player scores
        shouldShowDone   : true,                    // Show "done" status
        title            : 'Game Status (No Score Column)',  // Title of the status table
    },
};
