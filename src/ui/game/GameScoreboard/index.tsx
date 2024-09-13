import { selectAllPlayerStatus } from '../../../client/selector/game';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStatusTable } from '../GameStatusTable';
import { useSelector } from '@app/client/hook';
import { GameText } from '../GameText';
import { Stack } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameScoreboard : RFC = () => {

    const allPlayerStatus = useSelector(selectAllPlayerStatus);

    return (
        <Stack>
            <GameText size='sm'>
                {'3 Points to Win'}
            </GameText>
            <GameStatusTable
                textColor={CardColor.Black}
                playerStatusList={allPlayerStatus!}
                shouldShowScore={true}
                shouldShowDone={false} />
        </Stack>
    );
}

