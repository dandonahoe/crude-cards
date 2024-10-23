import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameText, GameTextCentered } from '../../component/GameText';
import { GameCardStack } from '../../component/GameCard';
import { PlayerWarningProps } from './type';
import { RFC } from '@app/ui/type';


export const PlayerWarning : RFC<PlayerWarningProps> = ({
    foeCount,
}) => {

    if(foeCount < 3) return null;

    return (
        <GameCardStack color={CardColor.Black}>
            <GameText>
                {'Minimum 3 Players'}
            </GameText>
            <GameTextCentered>
                {`Need ${3 - foeCount} more players`}
            </GameTextCentered>
        </GameCardStack>
    );
}
