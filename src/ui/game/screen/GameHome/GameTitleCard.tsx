import { GameTextTitle, GameTextSubtitle } from "../../component/GameText";
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameBoxType } from "../../component/GameBox/type";
import { GameCardStack } from "../../component/GameCard";
import { GameButton } from "../../component/GameButton";
import { GameBox } from "../../component/GameBox";
import { GameTitleCardProps } from "./type";


export const GameTitleCard = ({
    onStartGame,
}: GameTitleCardProps) =>
    <GameCardStack color={CardColor.Black}>
        <GameBox>
            <GameTextTitle>
                {'Crude Cards'}
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
    </GameCardStack>
