import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameStatusTable } from '../../component/GameStatusTable';
import { GameCardChildren } from '../../component/GameCard';
import { StatusTableRendererProps } from './type';


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
