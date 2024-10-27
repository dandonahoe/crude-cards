import { selectGameById, selectIsDealerByGameId, selectCurrentPlayerByGameId, selectGameStateByGameId } from '../../../../client/selector/game';
import { useSelector } from '../../../../client/hook';
import { GameBoardContext } from './GameBoardContext';
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


const isDebugOverlayVisible = Env.getBoolean('NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE');


export const GameBoard : RFC<Props> = ({ id : gameId }) => {

    const { isDebugging } = useContext(AppContext);

    debugger;

    const currentPlayer = useSelector(state => selectCurrentPlayerByGameId(state, gameId));
    const game          = useSelector(state => selectGameById(state, gameId));

    const dealerDealtCard = useSelector(state => selectDealerDealtCard(state, gameId));
    const playerDealtCard = useSelector(state => selectPlayerDealtCard(state, gameId));
    const dealerCards     = useSelector(state => selectDealerCards(    state, gameId));
    const playerCards     = useSelector(state => selectPlayerCards(    state, gameId));
    const gameState       = useSelector(state => selectGameStateByGameId(      state, gameId));

    // const currentPlayer   = useSelector(selectCurrentPlayer  );
    // const popupType       = useSelector(selectPopupType      );
    // const isDealer        = useSelector(selectIsDealer       );
    // game.gameStateDTO

    const isDealer = useSelector(state => selectIsDealerByGameId(state, gameId));

    return (
        <GameBoardContext.Provider
            value={{
                gameState, isDealer, headerHeight,
                currentPlayer, dealerCards, playerCards,
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

