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
import { DefaultGameState } from '../constant/framework/GameState';


const slice = createSlice({
    initialState : InitialState,
    reducers     : {},
    name         : ProjectName,

    extraReducers : builder => {

        builder.addCase(GameAction.resetGameState, (state, { payload : gameId }) => {
            state.game[gameId] = {
                ...state.game[gameId],
                gameStateDTO : GameStateDTO.Default,
            }
        });

        builder.addCase(GameAction.updateGameState, (state, { payload : gameStateString }) => {
            debugger;

            const gameStateDTO = JSON.parse(gameStateString) as GameStateDTO;

            if(!gameStateDTO.game_code)
                throw new Error('gameStateDTO.game_code is null');

            const {
                new_deck_card_list, player_list,
                ...rootGameState
            } = gameStateDTO;

            const gameCode = gameStateDTO.game_code

            if(!state.game[gameCode]) {
                debugger;

                state.game[gameCode] = DefaultGameState;
            }


            if(rootGameState.game_stage === GameStage.Home) {

                state.game[gameCode].previousHandDealerCardId = null;
                state.game[gameCode].previousHandWinnerCardId = null;

                state.game[gameCode].gameStateDTO = gameStateDTO;

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
                state.game[gameCode].previousHandDealerCardId = gameStateDTO.dealer_card_id;
                state.game[gameCode].previousHandWinnerCardId = gameStateDTO.winner_card_id;
            } else {
                console.log('updateGameState::Not on GameResults stage');
            }

            state.game[gameCode].playerLookup  = playerLookup;

            state.game[gameCode].gameStateDTO = {
                ...rootGameState,
                new_deck_card_list : null,
            };

            // keep it separate from the main game update since
            // it the update generally returns a null deck and
            // it would disappear if we just set it in the main update
            if(newCardDeck)
                state.game[gameCode].cardDeck = newCardDeck;
        });

        // same thing, but doesnt trigger the counter loop again
        builder.addCase(GameAction.updateTimer, (state, { payload : startTimer }) => {

            if(    state.game[startTimer.gameId].timer.gameId    === startTimer.gameId
                && state.game[startTimer.gameId].timer.timerType === startTimer.timerType
                && state.game[startTimer.gameId].timer.timeLeft  === startTimer.timeLeft)
                return;

            state.game[startTimer.gameId] = {
                ...state.game[startTimer.gameId],
                timer : startTimer,
            };
        });

        builder.addCase(GameAction.menuItemClicked, (state, { payload : menuItemClicked }) => {
            state.popupType = menuItemClicked.item_id;
        });

        builder.addCase(GameAction.closePopup, state => {
            state.popupType = GamePopupType.Closed;
        });
    },
});

// eslint-disable-next-line import/no-default-export
export default slice;
