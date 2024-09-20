import { selectGameWaitingPage } from '../../../client/selector/game';
import { StatusTableRenderer } from './StatusTableRenderer';
import { GameStackType } from '../GameStack/type';
import { useSelector } from '@app/client/hook';
import { DeckRenderer } from './DeckRenderer';
import { GameContext } from '../GameContext';
import { GameStack } from '../GameStack';
import { useContext } from 'react';


export const GameWaiting = () => {

    const { dealerDealtCard, playerDealtCard, gameState } = useContext(GameContext);
    const { playersExceptDealer, isDealer } = useSelector(selectGameWaitingPage);

    if(!dealerDealtCard || !playerDealtCard) {
        console.error('dealerDealtCard or playerDealtCard is not defined', {
            dealerDealtCard, playerDealtCard });

        return null;
    }

    return (
        <GameStack type={GameStackType.Centered}>
            <DeckRenderer
                playerDealtCard={playerDealtCard}
                dealerDealtCard={dealerDealtCard}
                isDealer={isDealer} />
            <StatusTableRenderer
                playersExceptDealer={playersExceptDealer}
                gameStage={gameState.game_stage} />
        </GameStack>
    );
};
