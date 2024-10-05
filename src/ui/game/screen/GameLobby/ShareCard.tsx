import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { ShareCardContent } from '../../component/ShareCardContent';
import { GameCardCentered } from '../../component/GameCard';
import { ShareCardProps } from './type';
import { RFC } from '@app/ui/type';


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
