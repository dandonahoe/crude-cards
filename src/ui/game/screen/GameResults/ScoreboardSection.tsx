import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameStatusTable } from '../../component/GameStatusTable';
import { GameCardStack } from '../../component/GameCard';
import { GameBox } from '../../component/GameBox';
import { ScoreboardSectionProps } from './type';
import { Text } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const ScoreboardSection: RFC<ScoreboardSectionProps> = ({
    playerStatus,
}) =>
    <GameBox>
        <GameCardStack color={CardColor.Black}>
            <Text
                fz='sm'
                ta='center'>{"3 Points to Win"}</Text>
            <GameStatusTable
                title='Scoreboard'
                playerStatusList={playerStatus}
                shouldShowDone={false}
                shouldShowScore={true}/>
        </GameCardStack>
    </GameBox>
