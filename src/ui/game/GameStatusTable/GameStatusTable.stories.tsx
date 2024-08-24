import { CardColor } from '../../../api/src/constant/card-color.enum';
import { Meta, StoryObj } from '@storybook/react';
import { GameStatusTable } from '.';
import { PlayerStatus } from '../type';


// Set up default exports for Storybook
const meta: Meta<typeof GameStatusTable> = {
  title     : 'Components/Game/GameStatusTable',
  component : GameStatusTable,
};

export default meta;

type Story = StoryObj<typeof GameStatusTable>;

const mockPlayerStatusList = [
  {
    player   : { username : 'Player 1' },
    isDone   : true,
    isWinner : false,
    score    : 2,
  },
  {
    player   : { username : 'Player 2' },
    isDone   : true,
    isWinner : true,
    score    : 3,
  },
  {
    player   : { username : 'Player 3' },
    isDone   : false,
    isWinner : false,
    score    : 1,
  },
] as PlayerStatus[];

// Default story showing player statuses with both score and "done" columns enabled
export const Default: Story = {
  args : {
    playerStatusList : mockPlayerStatusList,
    title            : 'Current Status',
    shouldShowScore  : true,
    shouldShowDone   : true,
    textColor        : CardColor.White,
  },
};

// Story without showing the "done" status column
export const WithoutDoneColumn: Story = {
  args : {
    playerStatusList : mockPlayerStatusList,
    title            : 'Status Without Done Column',
    shouldShowScore  : true,
    shouldShowDone   : false,
    textColor        : CardColor.White,
  },
};

// Story without showing the score column
export const WithoutScoreColumn: Story = {
  args : {
    playerStatusList : mockPlayerStatusList,
    title            : 'Status Without Score Column',
    shouldShowScore  : false,
    shouldShowDone   : true,
    textColor        : CardColor.White,
  },
};

// Story with custom text color and without title
export const CustomTextColor: Story = {
  args : {
    playerStatusList : mockPlayerStatusList,
    title            : '',
    shouldShowScore  : true,
    shouldShowDone   : true,
    textColor        : CardColor.Black,
  },
};

// Story with no data (empty playerStatusList)
export const NoPlayers: Story = {
  args : {
    playerStatusList : [],
    title            : 'No Players Yet',
    shouldShowScore  : true,
    shouldShowDone   : true,
    textColor        : CardColor.White,
  },
};
