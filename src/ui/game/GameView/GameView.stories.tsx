import type { Meta, StoryObj } from '@storybook/react';
import { GameView } from './index'; // Import the GameView component
import { GameStage } from '../../../api/src/constant/game-stage.enum'; // Import GameStage enum
import { CardDTO } from '../../../api/src/game/dtos/card.dto'; // Import card data
import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto'; // Import game state data
import { CardColor } from '../../../api/src/constant/card-color.enum';

const meta: Meta<typeof GameView> = {
    title     : 'Game/GameView',
    component : GameView,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample dealer and player cards
const sampleDealerCard: Partial<CardDTO> = {
    ...CardDTO.Default,
    id    : '1',
    text  : 'Dealer Card',
    color : CardColor.Black,
};

const samplePlayerCard: Partial<CardDTO> = {
    ...CardDTO.Default,
    id    : '2',
    text  : 'Player Card',
    color : CardColor.White,
};

// Sample game state for the lobby
const lobbyGameState: Partial<GameStateDTO> = {
    ...GameStateDTO.Default,
    game_code  : 'ABCD1234',
    game_stage : GameStage.Lobby,
};

export const LobbyView: Story = {
    args : {
        dealerDealtCard : sampleDealerCard,     // Provide dealer card
        playerDealtCard : samplePlayerCard,     // Provide player card
        gameState       : lobbyGameState,             // Set game state to Lobby
        isDealer        : false,                       // Current player is not the dealer
    },
};

export const GameInProgressView: Story = {
    args : {
        dealerDealtCard : sampleDealerCard,     // Provide dealer card
        playerDealtCard : samplePlayerCard,     // Provide player card
        gameState       : { ...GameStateDTO.Default, game_stage : GameStage.PlayerPickWhiteCard },
        // Set game state to "PlayerPickWhiteCard"
        isDealer        : true,                        // Current player is the dealer
    },
};

export const GameResultsView: Story = {
    args : {
        dealerDealtCard : sampleDealerCard,     // Provide dealer card
        playerDealtCard : samplePlayerCard,     // Provide player card
        gameState       : { ...GameStateDTO.Default, game_stage : GameStage.GameResults }, // Set game state to "GameResults"
        isDealer        : false,                       // Current player is not the dealer
    },
};
