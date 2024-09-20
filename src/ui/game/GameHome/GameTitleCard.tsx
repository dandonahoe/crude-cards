import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameTextTitle, GameTextSubtitle } from '../GameText';
import { GameBoxType } from '../GameBox/type';
import { GameCardStack } from '../GameCard';
import { GameTitleCardProps } from './type';
import { GameButton } from '../GameButton';
import { GameBox } from '../GameBox';


export const GameTitleCard = ({
    onStartGame,
}: GameTitleCardProps) =>
    <GameCardStack color={CardColor.Black}>
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
    </GameCardStack>
