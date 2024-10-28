import { CardColor } from '../../../../../api/src/constant/card-color.enum';
import { GameStackType } from '../../../component/GameStack/type';
import { GameBoardContext } from '../../../../GameBoardContext';
import { GameBanner } from '@app/ui/game/component/GameBanner';
import { GameStack } from '@app/ui/game/component/GameStack';
import { useContext } from 'react';


export const DealerPickWinner = () => {

    const { dealerDealtCard, isDealer } = useContext(GameBoardContext);

    if(!isDealer)
        return (
            <GameBanner
                color={CardColor.White}
                subtitle='Waiting on Dealer'
                text='Judging' />
        );

    return (
        <GameStack type={GameStackType.Centered}>
            <GameBanner
                subtitle={dealerDealtCard?.text ?? ''}
                color={CardColor.White}
                text='Pick a Winner' />
        </GameStack>
    );
}
