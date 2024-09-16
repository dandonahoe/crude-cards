import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameBox, GameBoxCentered } from '../GameBox';
import { GameCardCentered } from '../GameCard';
import { CloseButton } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameText } from '../GameText';


export const GameDealerConfirm = () => {

    const handleConfirm = () : void =>{
    }

    return (
        <GameBox>
            <CloseButton />
            <GameBanner
                subtitle='You Are Dealer'
                color={CardColor.Black}
                text='Deal this?' />
            <GameCardCentered color={CardColor.Black}>
                <GameText>
                    {'Deal'}
                </GameText>
            </GameCardCentered>
            <GameBoxCentered size='lg'>
                <GameButton
                    onClick={handleConfirm}
                    text='Yep' />
            </GameBoxCentered>
        </GameBox>
    );
}

