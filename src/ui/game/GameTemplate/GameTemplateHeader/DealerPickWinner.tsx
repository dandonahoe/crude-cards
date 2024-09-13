import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameStackType } from '../../GameStack/type';
import { GameContext } from '../../GameContext';
import { GameBanner } from '../../GameBanner';
import { GameStack } from '../../GameStack';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const DealerPickWinner : RFC = () => {

    const { dealerDealtCard, isDealer } = useContext(GameContext);

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
