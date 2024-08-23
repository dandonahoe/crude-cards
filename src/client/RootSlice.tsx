import { GamePopupType } from '../api/src/constant/game-popup-type.enum';
import { InitialState } from '@app/constant/framework/InitialState';
import { GameStateDTO } from '../api/src/game/dtos/game-state.dto';
import { ProjectName } from '@app/constant/framework/ProjectName';
import { GameStage } from '../api/src/constant/game-stage.enum';
import { PlayerDTO } from '../api/src/game/dtos/player.dto';
import { CardDTO } from '../api/src/game/dtos/card.dto';
import { createSlice } from '@reduxjs/toolkit';
import { GameAction } from './action/game';

import _ from 'lodash';


const slice = createSlice({
    initialState : InitialState,
    reducers     : {},
    name         : ProjectName,

    extraReducers : builder => {
        builder.addCase(GameAction.exitGame, state => {
            state.game.gameState = GameStateDTO.Default;
            state.game.popupTypeId = null;
        });

        builder.addCase(GameAction.updateGameState, (state, { payload : gameStateString }) => {
            const gameState = JSON.parse(gameStateString) as GameStateDTO;

            const {
                player_list, new_deck_card_list,
                ...rootGameState
            } = gameState;

            const playerLookup = player_list.reduce((acc, player) => {

                acc[player.id!] = player;

                return acc;
            }, {} as {[key : string] : PlayerDTO});

            let newCardDeck : {[key : string] : CardDTO} | null = null;

            // Create a lookup table by card id for the new deck
            if(new_deck_card_list)
                newCardDeck = new_deck_card_list.reduce((acc, cardDTO) => {
                    acc[cardDTO.id!] = {
                        id    : cardDTO.id!,
                        color : cardDTO.color!,
                        text  : cardDTO.text!,
                    }

                    return acc;
                }, {} as {[key : string] : CardDTO});

            // this lets the players stay on the results screen
            // while the session is being updated by the dealer
            // of the upcoming round
            if(gameState.game_stage === GameStage.GameResults) {
                state.game.previousHandDealerCardId = gameState.dealer_card_id;
                state.game.previousHandWinnerCardId = gameState.winner_card_id;
            }

            state.game.playerLookup  = playerLookup;
            state.game.gameState = {
                ...rootGameState,
                new_deck_card_list : null,
            };

            if(newCardDeck)
                state.game.cardDeck = newCardDeck;
        });

        // same thing, but doesnt trigger the counter loop again
        builder.addCase(GameAction.updateTimer, (state, { payload : startTimer }) => {
            state.game.timer = startTimer;
        });

        builder.addCase(GameAction.menuItemClicked, (state, { payload : menuItemClicked }) => {
            state.game = {
                ...state.game,
                popupTypeId : menuItemClicked.item_id as GamePopupType,
            };
        });

        builder.addCase(GameAction.closePopup, state => {
            state.game = {
                ...state.game,
                popupTypeId : null,
            };
        });
    },
});

// eslint-disable-next-line import/no-default-export
export default slice;
