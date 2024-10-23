import { CardColor } from '../../../../../api/src/constant/card-color.enum';
import { GameBanner } from '@app/ui/game/component/GameBanner';
import { shouldPlayCard, isPlayerWaiting } from './Logic';
import { GameBox } from '@app/ui/game/component/GameBox';
import { GameContext } from '@app/ui/game/GameContext';
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
