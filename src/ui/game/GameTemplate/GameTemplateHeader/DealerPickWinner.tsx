import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameContext } from '../../GameContext';
import { GameBanner } from '../../GameBanner';
import { Stack } from '@mantine/core';
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
        <Stack
            justify='center'
            align='center'
            pb='xl'>
            <GameBanner
                subtitle={dealerDealtCard?.text ?? ''}
                color={CardColor.White}
                text='Pick a Winner' />
        </Stack>
    );


}
