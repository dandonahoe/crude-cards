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
                color='#fff'
                subtitle='Waiting on Dealer'
                text='Judging' />
        );

    return (
        <Stack
            justify='center'
            align='center'
            pb='xl'>
            <GameBanner
                color='#fff'
                text='Pick a Winner'
                subtitle={dealerDealtCard?.text ?? ''} />
        </Stack>
    );


}
