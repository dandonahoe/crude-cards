import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameBox, GameBoxCentered } from "../../component/GameBox";
import { GameBanner } from "../../component/GameBanner";
import { GameButton } from "../../component/GameButton";
import {GameCardDTO } from "../../component/GameCard";
import { CloseButton } from "@mantine/core";


export const GamePlayerConfirm = () => {

    const handleClick = () : void => {}

    return (
        <GameBox>
            <CloseButton />
            <GameBanner
                subtitle='Confirm Your Choice'
                color={CardColor.Black}
                text='Play this?' />
            <GameCardDTO
                id='example-1'
                card={{
                    color : CardColor.Black,
                    text  : 'Doing the Hustle',
                    id    : 'example-1',
                }} />
            {/* <GameCardDTO
                id='example-1'
                card={{
                    color : CardColor.Black,
                    text  : 'Doing the Hustle',
                }} /> */}
            <GameCardDTO
                id='example-2'
                card={{
                    id    : 'example-2',
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

