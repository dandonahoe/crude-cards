import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { GameCardContainer } from '../GameCardContainer';
import { ShareCardContent } from '../ShareCardContent';
import { ShareCardProps } from './type';
import { RFC } from '../../type';


export const ShareCard: RFC<ShareCardProps> = ({ gameStage }) => {

    if (gameStage === GameStage.DealerPickBlackCard)
        return null;

    return (
        <GameCardContainer
            color={CardColor.Black}
            isClickable={true}>
            <ShareCardContent />
        </GameCardContainer>
    );
};
