import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameContext } from '../../GameContext';
import { GameBanner } from '../../GameBanner';
import { useContext } from 'react';


export const DealerPickBlackCard = () => {

    const { isDealer } = useContext(GameContext);

    if(!isDealer) return null;

    return (
        <GameBanner
            subtitle='You Are Dealer'
            text='Pick a Card'
            color={CardColor.White} />
    );
}
