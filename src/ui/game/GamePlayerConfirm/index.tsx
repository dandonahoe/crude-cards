import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameBox, GameBoxCentered } from '../GameBox';
import { CloseButton } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameCardDTO } from '../GameCard';
import { RFC } from '@app/ui/type';


export const GamePlayerConfirm : RFC = () => {

    const handleClick = () : void => {
    }

    return (
        <GameBox>
            <CloseButton />
            <GameBanner
                color={CardColor.Black}
                subtitle='Confirm Your Choice'
                text='Play this?' />
            <GameCardDTO
                card={{
                    color : CardColor.Black,
                    text  : 'Doing the Hustle',
                }} />
            <GameCardDTO
                card={{
                    color : CardColor.Black,
                    text  : 'Doing the Hustle',
                }} />
            <GameBoxCentered>
                <GameButton
                    onClick={handleClick}
                    text='Yep' />
            </GameBoxCentered>
        </GameBox>
    );
}

