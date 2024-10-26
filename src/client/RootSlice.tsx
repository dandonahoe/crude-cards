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

        builder.addCase(GameAction.resetGameState, (state, { payload : gameId }) => {
            debugger;

            console.log(gameId);

            state.game[gameId] = {
                ...state.game[gameId],
                gameStateDTO : GameStateDTO.Default,
            }
        });

        builder.addCase(GameAction.updateGameState, (state, { payload : { gameStateString, gameId } }) => {

            const gameStateDTO = JSON.parse(gameStateString) as GameStateDTO;

            const {
                new_deck_card_list, player_list,
                ...rootGameState
            } = gameStateDTO;

            if(rootGameState.game_stage === GameStage.Home) {

                state.game[gameId].previousHandDealerCardId = null;
                state.game[gameId].previousHandWinnerCardId = null;
                state.game[gameId].gameStateDTO = gameStateDTO;

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
            if(gameStateDTO.game_stage === GameStage.GameResults) {
                console.log('updateGameState::Results Screen', gameStateDTO);

                // foofindme
                console.log('updateGameState::Results Screen', gameStateDTO);
                state.game[gameId].previousHandDealerCardId = gameStateDTO.dealer_card_id;
                state.game[gameId].previousHandWinnerCardId = gameStateDTO.winner_card_id;
            } else {
                console.log('updateGameState::Not on GameResults stage');
            }

            state.game[gameId].playerLookup  = playerLookup;

            state.game[gameId].gameStateDTO = {
                ...rootGameState,
                new_deck_card_list : null,
            };

            // keep it separate from the main game update since
            // it the update generally returns a null deck and
            // it would disappear if we just set it in the main update
            if(newCardDeck)
                state.game[gameId].cardDeck = newCardDeck;
        });

        // same thing, but doesnt trigger the counter loop again
        builder.addCase(GameAction.updateTimer, (state, { payload : startTimer }) => {
            state.game[startTimer.gameId].timer = startTimer;
        });

        builder.addCase(GameAction.menuItemClicked, (state, { payload : menuItemClicked }) => {
            debugger;

            state.popupType = menuItemClicked.item_id;
        });

        builder.addCase(GameAction.closePopup, state => {
            state.popupType = GamePopupType.Closed;
        });
    },
});

// eslint-disable-next-line import/no-default-export
export default slice;
