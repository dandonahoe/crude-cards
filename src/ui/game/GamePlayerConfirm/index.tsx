import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameBox, GameBoxCentered } from '../GameBox';
import { CloseButton } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameCardDTO } from '../GameCard';


export const GamePlayerConfirm = () => {

    const handleClick = () : void => {
    }

    return (
        <GameBox>
            <CloseButton />
            <GameBanner
                subtitle='Confirm Your Choice'
                color={CardColor.Black}
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

