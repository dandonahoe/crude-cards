import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { isPlayerWaiting, shouldPlayCard } from './Logic';
import { GameContext } from '../../GameContext';
import { GameBanner } from '../../GameBanner';
import { GameBox } from '../../GameBox';
import { useContext } from 'react';


export const PlayerPickWhiteCard = () => {

    const { isDealer, playerDealtCard, dealerDealtCard } = useContext(GameContext);

    if(isDealer)
        return (
            <GameBanner
                subtitle='Players Picking Card'
                color={CardColor.White}
                text='Waiting' />
        );

    return (
        <GameBox>
            {shouldPlayCard(playerDealtCard, isDealer) &&
                <GameBox size='lg'>
                    <GameBanner
                        text='Play a Card'
                        subtitle={dealerDealtCard?.text ?? '[WHOOPS]'}
                        color={CardColor.White} />
                </GameBox>
            }
            {isPlayerWaiting(playerDealtCard, isDealer) &&
                <GameBox size='lg'>
                    <GameBanner
                        text='Waiting'
                        subtitle='Players Picking Card'
                        color={CardColor.White} />
                </GameBox>
            }
        </GameBox>
    );
}
