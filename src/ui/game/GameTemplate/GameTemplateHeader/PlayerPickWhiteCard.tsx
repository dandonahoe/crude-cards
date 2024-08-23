import { GameContext } from '../../GameContext';
import { GameBanner } from '../../GameBanner';
import { Box } from '@mantine/core';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const PlayerPickWhiteCard : RFC = () => {

    const { isDealer, playerDealtCard, dealerDealtCard } = useContext(GameContext);

    if(isDealer)
        return (
            <GameBanner
                text='Waiting'
                subtitle='Players Picking Card'
                color='#fff' />
        );

    return (
        <Box pt='md'>
            {!playerDealtCard && !isDealer &&
                <Box mb='xl'>
                    <GameBanner
                        text='Play a Card'
                        subtitle={dealerDealtCard?.text ?? '[WHOOPS]'}
                        color='#fff' />
                </Box>
            }
            {playerDealtCard && !isDealer &&
                <Box
                    ml='xl'
                    mr='xl'
                    pb='lg'>
                    <GameBanner
                        text='Waiting'
                        subtitle='Players Picking Card'
                        color='#fff' />
                </Box>
            }
        </Box>
    );
}
