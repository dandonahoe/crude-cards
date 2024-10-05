import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { PlayerDTO } from '../../../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
import type { Meta, StoryObj } from '@storybook/react';
import { PlayerStatus } from '../../type';
import { GameResults } from '.';


const meta: Meta<typeof GameResults> = {
    title     : 'Screens/GameResults',
    component : GameResults,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample card data for the dealer's card and winner's card
const sampleDealerCard: Partial<CardDTO> = {
    ...CardDTO.Default,
    id    : '1',
    text  : 'Dealer Card',
    color : CardColor.Black,
};

const sampleWinnerCard: Partial<CardDTO> = {
    ...CardDTO.Default,
    id    : '2',
    text  : 'Winner Card',
    color : CardColor.White,
};

// Sample player status data for the scoreboard
const samplePlayerStatus: PlayerStatus[] = [
    { player : { ...PlayerDTO.Default, id : '1', username : 'Player 1' }, score : 3, isWinner : false, isDone : true },
    { player : { ...PlayerDTO.Default, id : '2', username : 'Player 2' }, score : 5, isWinner : true, isDone : true },
];

export const DefaultResults: Story = {
    args : {
        sessionEndMessage      : 'Congratulations to the winner!',
        previousHandDealerCard : sampleDealerCard, // The card chosen by the dealer
        previousHandWinnerCard : sampleWinnerCard, // The winning card
        allPlayerStatus        : samplePlayerStatus, // Player status for the scoreboard
        isPlayerWinner         : true, // Simulate that the current player is the winner
    },
};
