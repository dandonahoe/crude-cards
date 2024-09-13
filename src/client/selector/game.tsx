import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../api/src/game/dtos/player.dto';
import { createSelector } from '@reduxjs/toolkit';
import { PlayerStatus } from '@app/ui/game/type';
import { selectState } from './common';
import { intersection } from 'lodash';


export const selectGame = createSelector(
    selectState,
    state => state.game,
);

export const selectCardDeck = createSelector(
    selectGame,
    game => game.cardDeck,
);

export const selectTimer = createSelector(
    selectGame,
    game => game.timer,
);

export const selectPlayerLookup = createSelector(
    selectGame,
    game => game.playerLookup,
);

export const selectPreviousHandDealerCard = createSelector(
    selectGame, selectCardDeck,
    (game, cardDeck) => cardDeck[game.previousHandDealerCardId!],
);

export const selectPreviousHandWinnerCard = createSelector(
    selectGame, selectCardDeck,
    (game, cardDeck) => cardDeck[game.previousHandWinnerCardId!],
);

export const selectGameState = createSelector(
    selectGame,
    game => {
        const player_list = Object
            .keys(game.playerLookup)
            .map(key => game.playerLookup[key]);

        return {
            ...game.gameState,
            player_list,
        } as GameStateDTO;
    },
);

export const selectCurrentPlayer = createSelector(
    selectGameState, selectPlayerLookup,
    (gameState, playerLookup) => {

        if(!gameState.current_player_id)
            return null;

        return (playerLookup[gameState.current_player_id] ?? null) as PlayerDTO;
    },
);

export const selectSessionEndMessage = createSelector(
    selectGameState,
    gameState => gameState.game_end_message ?? '[NO MESSAGE]',
);

export const selectWinner = createSelector(
    selectGameState, selectPlayerLookup,
    (gameState, playerLookup) => {

        if(!gameState.winner_player_id)
            return null;

        return playerLookup[gameState.winner_player_id];
    },
);

export const selectIsPlayerWinner = createSelector(
    selectGameState,
    gameState => gameState.winner_player_id === gameState.current_player_id,
);


export const selectWinnerCard = createSelector(
    selectGameState, selectCardDeck,
    (gameState, cardDeck) => {

        if(!gameState.winner_card_id)
            return null;

        return cardDeck[gameState.winner_card_id];
    },
);

export const selectPopupType = createSelector(
    selectGame,
    game => game.popupType,
);

export const selectIsDealer = createSelector(
    selectGameState,
    rootGameState =>
        rootGameState.current_player_id && rootGameState.dealer_id
        ? rootGameState.current_player_id === rootGameState.dealer_id
        : false,
);

export const selectIsHost = createSelector(
    selectCurrentPlayer, selectGameState,
    (player, rootGameState) =>
        player?.id
            ? player?.id === rootGameState.host_player_id
            : false,
);

export const selectDealerDealtCard = createSelector(
    selectGameState, selectCardDeck,
    (gameState, cardDeck) => {

        if(!gameState.dealer_card_id)
            return null;

        return cardDeck[gameState.dealer_card_id];
    },
);

export const selectPlayerDealtCard = createSelector(
    selectGameState, selectCurrentPlayer, selectCardDeck,
    (gameState, currentPlayer, cardDeck) => {

        const testing = intersection(
            currentPlayer?.card_id_list,
            gameState.selected_card_id_list,
        );

        if(testing.length !== 1)
            return null;

        const playerSelectedCardId = testing[0]

        return cardDeck[playerSelectedCardId];
    },
);

export const selectPlayerList = createSelector(
    selectGameState,
    gameState => gameState.player_list,
);


export const selectFoes = createSelector(
    selectGameState, selectPlayerList,
    (gameState, playerList) =>
        playerList.filter(player =>
            player.id !== gameState.current_player_id),
);


export const selectAllPlayerStatus = createSelector(
    selectGameState, selectPlayerList, selectPlayerLookup,
    (gameState, playerList, playerLookup) =>
        playerList.map(player => {

            const isDone = intersection(
                player?.card_id_list,
                gameState.selected_card_id_list,
            ).length > 0;

            const playerDTO = playerLookup[player.id!];

            return {
                isWinner : player.id === gameState.winner_player_id || player.id === gameState.champion_player_id,
                player   : playerDTO,
                score    : playerDTO.score,
                isDone,
            } as PlayerStatus;

        }).sort((a, b) =>
            b.player.score - a.player.score,
        ));

export const selectPlayerWaitStatus = createSelector(
    selectAllPlayerStatus, selectGameState,
    (allPlayerStatus, gameState) =>
        allPlayerStatus.filter(stat =>
            stat.player.id !== gameState.dealer_id));

export const selectGameChampion = createSelector(
    selectGameState, selectPlayerLookup,
    (gameState, playerLookup) => {

        if(!gameState.champion_player_id)
            return null;

        return playerLookup[gameState.champion_player_id];
    },
);

export const selectPlayerCards = createSelector(
    selectCurrentPlayer, selectCardDeck,
    (currentPlayer, cardDeck) => {

        if(!currentPlayer?.card_id_list)
            return [];

        return currentPlayer?.card_id_list.map(
            card_id => cardDeck[card_id]);
    },
);

export const selectGameComplete = createSelector(
    selectAllPlayerStatus, selectGameChampion, selectIsPlayerWinner,
    (allPlayerStatus, gameChampion, isWinner) => ({
        allPlayerStatus,
        gameChampion,
        isWinner,
    }),
);

export const selectSelectedCards = createSelector(
    selectGameState, selectCardDeck,
    (gameState, cardDeck) => gameState.selected_card_id_list.map(
        card_id => cardDeck[card_id]),
);

export const selectDealerCards = createSelector(
    selectGameState, selectCardDeck,
    (gameState, cardDeck) => gameState.dealer_card_id_list.map(
        card_id => cardDeck[card_id]),
);
