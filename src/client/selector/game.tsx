import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { CoreAppRoot } from '../../type/framework/core/CoreAppRoot';
import { createSelector } from '@reduxjs/toolkit';
import { PlayerStatus } from '@app/ui/game/type';
import { intersection } from 'lodash';
import { selectState } from './common';


export const selectGameLookup = createSelector(
    selectState,
    state => state.game,
);

// Memoized selector to get a game by gameId
export const selectGameById = createSelector(
    (state: CoreAppRoot) => state.game,
    (_: CoreAppRoot, gameId: string) => gameId,

    (game, gameId) => {
        const selectedGame = game[gameId];

        if (!selectedGame) throw new Error('Game not found');

        return selectedGame;
    },
);

export const selectIsHostByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectCurrentPlayerByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(    state, gameId),

    (player, rootGameState) => player?.id
        ? player.id === rootGameState.host_player_id
        : false,
);


// Updated game state selector by gameId
export const selectGameStateByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameById(state, gameId),
    game => {
        const playerList = Object
            .keys(game.playerLookup)
            .map(key => game.playerLookup[key]);

        return {
            ...game.gameStateDTO,
            player_list : playerList,
        } as GameStateDTO;
    },
);


// Select card deck by gameId
export const selectCardDeckByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameById(state, gameId),

    game => game.cardDeck,
);

// Timer selector by gameId
export const selectTimerByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameById(state, gameId),

    game => game.timer,
);

// Player lookup selector by gameId
export const selectPlayerLookupByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameById(state, gameId),

    game => game.playerLookup,
);

// Previous hand dealer card by gameId
export const selectPreviousHandDealerCardByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameById(        state, gameId),
    (state: CoreAppRoot, gameId: string) => selectCardDeckByGameId(state, gameId),

    (game, cardDeck) =>
        cardDeck[game.previousHandDealerCardId!],
);

// Previous hand winner card by gameId
export const selectPreviousHandWinnerCardByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameById(        state, gameId),
    (state: CoreAppRoot, gameId: string) => selectCardDeckByGameId(state, gameId),

    (game, cardDeck) =>
        cardDeck[game.previousHandWinnerCardId!],
);

// Game end message by gameId
export const selectSessionEndMessageByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(state, gameId),

    gameState => gameState.game_end_message ?? '[NO MESSAGE]',
);

// Winner selector by gameId
export const selectWinnerByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectPlayerLookupByGameId(state, gameId),

    (gameState, playerLookup) => {

        if (!gameState?.winner_player_id)
            return null;

        return playerLookup ? playerLookup[gameState.winner_player_id] : null;
    },
);

// Check if current player is winner by gameId
export const selectIsPlayerWinnerByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(state, gameId),

    gameState =>
        gameState.winner_player_id === gameState.current_player_id,
);

export const selectWinnerCardByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectCardDeckByGameId( state, gameId),

    (gameState, cardDeck) => {

        if (!gameState.winner_card_id) return null;

        return cardDeck[gameState.winner_card_id];
    },
);

export const selectIsDealerByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(state, gameId),

    gameState => {
        if (!gameState.current_player_id || !gameState.dealer_id) return false;

        return gameState.current_player_id === gameState.dealer_id;
    },
);

export const selectSelectedCardsByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectCardDeckByGameId( state, gameId),

    (gameState, cardDeck) =>
        gameState.selected_card_id_list.map(card_id => cardDeck[card_id]),
);

export const selectFoesByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId( state, gameId),
    (state: CoreAppRoot, gameId: string) => selectPlayerListByGameId(state, gameId),

    (gameState, playerList) =>
        playerList.filter(player => player.id !== gameState.current_player_id),
);

export const selectDealerCardsByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectCardDeckByGameId( state, gameId),

    (gameState, cardDeck) =>
        gameState.dealer_card_id_list.map(card_id => cardDeck[card_id]),
);
// Dealer dealt card by gameId
export const selectDealerDealtCardByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectCardDeckByGameId( state, gameId),

    (gameState, cardDeck) => {
        if (!gameState.dealer_card_id) return null;

        return cardDeck[gameState.dealer_card_id];
    },
);


export const selectCurrentPlayerByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(   state, gameId),
    (state: CoreAppRoot, gameId: string) => selectPlayerLookupByGameId(state, gameId),

    (gameState, playerLookup) => {
        if (!gameState.current_player_id) return null;

        return playerLookup[gameState.current_player_id];
    },
);


export const selectPlayerDealtCardByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(    state, gameId),
    (state: CoreAppRoot, gameId: string) => selectCurrentPlayerByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectCardDeckByGameId(     state, gameId),

    (gameState, currentPlayer, cardDeck) => {
        const testing = intersection(
            currentPlayer?.card_id_list,
            gameState?.selected_card_id_list || [],
        );

        if (testing.length !== 1) return null;

        const playerSelectedCardId = testing[0];

        return cardDeck[playerSelectedCardId];
    },
);

// Player list by gameId
export const selectPlayerListByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(state, gameId),

    gameState =>
        gameState.player_list ?? [],
);

// All player statuses by gameId
export const selectAllPlayerStatusByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(   state, gameId),
    (state: CoreAppRoot, gameId: string) => selectPlayerListByGameId(  state, gameId),
    (state: CoreAppRoot, gameId: string) => selectPlayerLookupByGameId(state, gameId),

    (gameState, playerList, playerLookup) => playerList.map(player => {

        const isDone = intersection(
            player?.card_id_list,
            gameState?.selected_card_id_list || [],
        ).length > 0;

        const playerDTO = playerLookup[player.id!];

        return {
            isDone,
            player : playerDTO,
            score  : playerDTO.score,
            isWinner :
                player.id    === gameState.winner_player_id
                || player.id === gameState.champion_player_id,

        } as PlayerStatus;

    }).sort((a, b) => b.player.score - a.player.score),
);

// Player wait status by gameId
export const selectPlayerWaitStatusByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectAllPlayerStatusByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(      state, gameId),

    (allPlayerStatus, gameState) =>
        allPlayerStatus.filter(stat =>
            stat.player.id !== gameState?.dealer_id),
);

// Game champion by gameId
export const selectGameChampionByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(   state, gameId),
    (state: CoreAppRoot, gameId: string) => selectPlayerLookupByGameId(state, gameId),

    (gameState, playerLookup) => {

        if (!gameState?.champion_player_id)
            return null;

        return playerLookup[gameState.champion_player_id];
    },
);

// Player cards by gameId
export const selectPlayerCardsByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectCurrentPlayerByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectCardDeckByGameId(     state, gameId),

    (currentPlayer, cardDeck) =>
        currentPlayer?.card_id_list.map(card_id => cardDeck[card_id]) || [],
);

// Game complete status by gameId
export const selectGameCompleteByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectAllPlayerStatusByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectGameChampionByGameId(   state, gameId),
    (state: CoreAppRoot, gameId: string) => selectIsPlayerWinnerByGameId( state, gameId),

    (allPlayerStatus, gameChampion, isWinner) => ({
        allPlayerStatus,
        gameChampion,
        isWinner,
    }),
);

export const selectGameResultsByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectPreviousHandDealerCardByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectPreviousHandWinnerCardByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectSessionEndMessageByGameId(     state, gameId),
    (state: CoreAppRoot, gameId: string) => selectAllPlayerStatusByGameId(       state, gameId),
    (state: CoreAppRoot, gameId: string) => selectIsPlayerWinnerByGameId(        state, gameId),

    (previousHandDealerCard, previousHandWinnerCard, sessionEndMessage, allPlayerStatus, isPlayerWinner) => ({
        previousHandDealerCard,
        previousHandWinnerCard,
        sessionEndMessage,
        allPlayerStatus,
        isPlayerWinner,
    }),
);

export const selectGameWaitingPageByGameId = createSelector(
    (state: CoreAppRoot, gameId: string) => selectPlayerWaitStatusByGameId(state, gameId),
    (state: CoreAppRoot, gameId: string) => selectIsDealerByGameId(        state, gameId),
    (state: CoreAppRoot, gameId: string) => selectGameStateByGameId(       state, gameId),

    (playerStatusList, isDealer, gameState) => {

        const playersExceptDealer = playerStatusList.filter(
            playerStatus => playerStatus.player.id !== gameState.dealer_id,
        ) ?? [];

        return {
            playersExceptDealer,
            isDealer,
        };
    },
);

