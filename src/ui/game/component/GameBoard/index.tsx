import { useSelector } from '../../../../client/hook';
import { GameBoardContext } from '../../../GameBoardContext';
import { GameStackType } from '../GameStack/type';
import { AppContext } from '../../../AppContext';
import { GameStack } from '../GameStack';
import { GameDebug } from '../GameDebug';
import { GameView } from '../GameView';
import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';
import { Env } from '@app/Env';
import {
    selectPlayerDealtCardByGameId, selectIsDealerByGameId,
    selectCurrentPlayerByGameId, selectGameStateByGameId,
    selectPlayerCardsByGameId, selectDealerCardsByGameId,
    selectDealerDealtCardByGameId, selectGameById,
} from '../../../../client/selector/game';


const isDebugOverlayVisible = Env.getBoolean('NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE');


export const GameBoard : RFC<Props> = ({ id : gameId }) => {

    const { isDebugging } = useContext(AppContext);

    const currentPlayer   = useSelector(state => selectCurrentPlayerByGameId(  state, gameId));
    const dealerDealtCard = useSelector(state => selectDealerDealtCardByGameId(state, gameId));
    const playerDealtCard = useSelector(state => selectPlayerDealtCardByGameId(state, gameId));
    const dealerCards     = useSelector(state => selectDealerCardsByGameId(    state, gameId));
    const playerCards     = useSelector(state => selectPlayerCardsByGameId(    state, gameId));
    const gameStateDTO    = useSelector(state => selectGameStateByGameId(      state, gameId));
    const isDealer        = useSelector(state => selectIsDealerByGameId(       state, gameId));
    const game            = useSelector(state => selectGameById(               state, gameId));
    const headerHeight    = 0;

    return (
        <GameBoardContext.Provider
            value={{
                currentPlayer, dealerCards, playerCards,
                gameStateDTO, isDealer, headerHeight,
                dealerDealtCard, playerDealtCard,
            }}>
            <GameStack type={GameStackType.FullHeightCentered}>
                <GameText>
                    {game.gameId}
                </GameText>
                <GameView gameId={gameId} />
                <GameDebug isVisible={isDebugOverlayVisible || isDebugging} />
            </GameStack>
        </GameBoardContext.Provider>
    );
};

