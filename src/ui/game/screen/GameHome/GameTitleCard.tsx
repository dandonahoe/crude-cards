import { GameTextTitle, GameTextSubtitle } from "../../component/GameText";
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameBoxType } from "../../component/GameBox/type";
import { GameCard } from "../../component/GameCard";
import { GameButton } from "../../component/GameButton";
import { GameBox } from "../../component/GameBox";
import { GameTitleCardProps } from "./type";
import { GameCardType } from "../../type";
import { nanoid } from '@reduxjs/toolkit';


export const GameTitleCard = ({
    onStartGame,
}: GameTitleCardProps) =>
    <GameCard
        cardType={GameCardType.Children}
        color={CardColor.Black}
        id={nanoid()}>
        <GameBox>
            <GameTextTitle>
                {'CrudeCards'}
            </GameTextTitle>
            <GameTextSubtitle>
                {'A Party Game for Terrible People.'}
            </GameTextSubtitle>
        </GameBox>
        <GameBox type={GameBoxType.Centered}>
            <GameButton
                onClick={onStartGame}
                text='Go' />
        </GameBox>
    </GameCard>
