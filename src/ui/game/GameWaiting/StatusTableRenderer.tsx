import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStatusTable } from '../GameStatusTable';
import { StatusTableRendererProps } from './type';
import { GameCardChildren } from '../GameCard';


export const StatusTableRenderer: React.FC<StatusTableRendererProps> = ({
    gameStage, playersExceptDealer,
}) => {

    if (gameStage !== GameStage.PlayerPickWhiteCard)
        return null;

    return (
        <GameCardChildren color={CardColor.Black}>
            <GameStatusTable
                playerStatusList={playersExceptDealer}
                shouldShowScore={false}
                shouldShowDone={true}
                title='Waiting on Players'/>
        </GameCardChildren>
    );
};
