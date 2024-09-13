import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { GameCardContainer } from '../GameCardContainer';
import { ShareCardContent } from '../ShareCardContent';
import { ShareCardProps } from './type';
import { RFC } from '../../type';


// I dont know if I like this or hate this
export const ShareCard : RFC<ShareCardProps> = ({
    gameStage,
}) =>
    gameStage !== GameStage.DealerPickBlackCard
        ?
            <GameCardContainer
                color={CardColor.Black}
                isClickable={true}>
                <ShareCardContent />
            </GameCardContainer>
         : null;
