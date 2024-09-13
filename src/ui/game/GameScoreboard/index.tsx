import { selectAllPlayerStatus } from '../../../client/selector/game';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStatusTable } from '../GameStatusTable';
import { useSelector } from '@app/client/hook';
import { GameStack } from '../GameStack';
import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';


export const GameScoreboard : RFC = () => {

    const allPlayerStatus = useSelector(selectAllPlayerStatus);

    return (
        <GameStack>
            <GameText size='sm'>
                {'3 Points to Win'}
            </GameText>
            <GameStatusTable
                textColor={CardColor.Black}
                playerStatusList={allPlayerStatus!}
                shouldShowScore={true}
                shouldShowDone={false} />
        </GameStack>
    );
}

