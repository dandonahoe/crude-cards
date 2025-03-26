import { CardColor } from '../../../../../api/src/constant/card-color.enum';
import { GameBanner } from '@app/ui/game/component/GameBanner';
import { GameContext } from '@app/ui/game/GameContext';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const DealerPickBlackCard : RFC = () => {

    const { isDealer } = useContext(GameContext);

    if(!isDealer) return null;

    return (
        <GameBanner
            color={CardColor.White}
            subtitle='You Are Dealer'
            text='Pick a Card' />
    );
}
