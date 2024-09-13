import { selectGameWaitingPage } from '../../../client/selector/game';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { GameStackType } from '../GameStack/type';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { StatusTable } from './StatusTable';
import { DealerDeck } from './DealerDeck';
import { PlayerDeck } from './PlayerDeck';
import { GameStack } from '../GameStack';
import { useContext } from 'react';


export const GameWaiting = () => {

    const { dealerDealtCard, playerDealtCard, gameState } = useContext(GameContext);
    const { isDealer, playersExceptDealer } = useSelector(selectGameWaitingPage);

    if(!dealerDealtCard || !playerDealtCard)
        return console.error('Dealer has not dealt a card', {
            isDealer, dealerDealtCard, playerDealtCard });

    return (
        <GameStack type={GameStackType.Centered}>
            {isDealer
                ? <DealerDeck dealerDealtCard={dealerDealtCard} />
                : (<PlayerDeck
                        dealerDealtCard={dealerDealtCard}
                        playerDealtCard={playerDealtCard} />)
            }
            {gameState.game_stage === GameStage.PlayerPickWhiteCard &&
                <StatusTable playerStatusList={playersExceptDealer} />
            }
        </GameStack>
    );
};
