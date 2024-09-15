import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { GameBox, GameBoxCentered } from '../GameBox';
import { CloseButton } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameCard, GameCardCentered } from '../GameCard';
import { RFC } from '@app/ui/type';
import { GameText } from '../GameText';


export const GameDealerConfirm : RFC = () => {

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

