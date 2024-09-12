import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { GameBox, GameBoxCentered } from '../GameBox';
import { CloseButton } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameCard } from '../GameCard';
import { RFC } from '@app/ui/type';


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
            <GameCard
                card={{
                    ...CardDTO.Default,
                    color : CardColor.Black,
                    text  : 'Deal',
                }} />
            <GameBoxCentered size='lg'>
                <GameButton
                    onClick={handleConfirm}
                    text='Yep' />
            </GameBoxCentered>
        </GameBox>
    );
}

