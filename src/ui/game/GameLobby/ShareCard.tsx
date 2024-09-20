import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { ShareCardContent } from '../ShareCardContent';
import { GameCardCentered } from '../GameCard';
import { ShareCardProps } from './type';
import { RFC } from '../../type';


export const ShareCard: RFC<ShareCardProps> = ({
    gameStage,
}) => {

    if (gameStage === GameStage.DealerPickBlackCard)
        return null;

    return (
        <GameCardCentered color={CardColor.Black}>
            <ShareCardContent />
        </GameCardCentered>
    );
};
