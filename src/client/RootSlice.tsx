import { GamePopupType } from '../api/src/constant/game-popup-type.enum';
import { InitialState } from '@app/constant/framework/InitialState';
import { GameStateDTO } from '../api/src/game/dtos/game-state.dto';
import { ProjectName } from '@app/constant/framework/ProjectName';
import { GameStage } from '../api/src/constant/game-stage.enum';
import { PlayerDTO } from '../api/src/game/dtos/player.dto';
import { CardDTO } from '../api/src/game/dtos/card.dto';
import { GameAction } from './action/game.action';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';


const slice = createSlice({
    initialState : InitialState,
    reducers     : {},
    name         : ProjectName,

    extraReducers : builder => {

        builder.addCase(GameAction.resetGameState, state => {
            state.game.gameState = GameStateDTO.Default;
            state.game.popupType = null;
        });

        builder.addCase(GameAction.updateGameState, (state, { payload : gameStateString }) => {
            const gameState = JSON.parse(gameStateString) as GameStateDTO;

            const {
                new_deck_card_list, player_list,
                ...rootGameState
            } = gameState;

            if(rootGameState.game_stage === GameStage.Home) {
                state.game.previousHandDealerCardId = null;
                state.game.previousHandWinnerCardId = null;
                state.game.gameState = gameState;

                return;
            }

            const playerLookup = player_list.reduce((acc, player) => {

                acc[player.id!] = player;

                return acc;
            }, {} as {[key : string] : PlayerDTO});

            let newCardDeck : {[key : string] : CardDTO} | null = null;

            // Create a lookup table by card id for the new deck
            if(new_deck_card_list) {
                console.log('Update includes the deck adding it to the state', new_deck_card_list);

                newCardDeck = new_deck_card_list.reduce((acc, cardDTO) => {
                    acc[cardDTO.id!] = {
                        id    : cardDTO.id!,
                        color : cardDTO.color!,
                        text  : cardDTO.text!,
                    }

                    return acc;
                }, {} as {[key : string] : CardDTO});
            }

            // this lets the players stay on the results screen
            // while the session is being updated by the dealer
            // of the upcoming round
            if(gameState.game_stage === GameStage.GameResults) {
                console.log('updateGameState::Results Screen', gameState);

                // foofindme
                console.log('updateGameState::Results Screen', gameState);
                state.game.previousHandDealerCardId = gameState.dealer_card_id;
                state.game.previousHandWinnerCardId = gameState.winner_card_id;
            } else {
                console.log('updateGameState::Not on GameResults stage');
            }

            state.game.playerLookup  = playerLookup;

            state.game.gameState = {
                ...rootGameState,
                new_deck_card_list : null,
            };

            // keep it separate from the main game update since
            // it the update generally returns a null deck and
            // it would disappear if we just set it in the main update
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
                popupType : menuItemClicked.item_id as GamePopupType,
            };
        });

        builder.addCase(GameAction.closePopup, state => {
            state.game = {
                ...state.game,
                popupType : null,
            };
        });
    },
});

// eslint-disable-next-line import/no-default-export
export default slice;
