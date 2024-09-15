import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameText, GameTextCentered } from '../GameText/index';
import { GameCardContainer } from '../GameCardContainer';
import { PlayerWarningProps } from './type';
import { RFC } from '@app/ui/type';


export const PlayerWarning : RFC<PlayerWarningProps> = ({
    foeCount,
}) => {

    // todo - put this into settings

    if(foeCount < 3)
        return null;

    return (
        <GameCardContainer color={CardColor.Black}>
            <GameText>
                {'Minimum 3 Players'}
            </GameText>
            <GameTextCentered>
                {`Need ${3 - foeCount} more players`}
            </GameTextCentered>
        </GameCardContainer>
    );
}
