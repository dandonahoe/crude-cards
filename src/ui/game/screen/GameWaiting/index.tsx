import { selectGameWaitingPageByGameId } from '../../../../client/selector/game';
import { SpecialId } from '../../../../constant/framework/SpecialId';
import { GameStackType } from '../../component/GameStack/type';
import { GameBoardContext } from '../../../GameBoardContext';
import { StatusTableRenderer } from './StatusTableRenderer';
import { GameStack } from '../../component/GameStack';
import { useSelector } from '@app/client/hook';
import { DeckRenderer } from './DeckRenderer';
import { useContext } from 'react';


export const GameWaiting = () => {

    const {
        dealerDealtCard, playerDealtCard, gameStateDTO,
    } = useContext(GameBoardContext);

    const {
        playersExceptDealer, isDealer,
    } = useSelector(state => selectGameWaitingPageByGameId(state, SpecialId.DefaultGameCode));

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
                gameStage={gameStateDTO.game_stage} />
        </GameStack>
    );
};
