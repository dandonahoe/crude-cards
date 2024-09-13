import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardContainer } from '../GameCardContainer';
import { GameStatusTable } from '../GameStatusTable';
import { ScoreboardSectionProps } from './type';
import { Text } from '@mantine/core';
import { GameBox } from '../GameBox';
import { RFC } from '@app/ui/type';


export const ScoreboardSection: RFC<ScoreboardSectionProps> = ({
    playerStatus,
}) =>
    <GameBox>
        <GameCardContainer color={CardColor.Black}>
            <Text
                fz='sm'
                ta='center'>{"3 Points to Win"}</Text>
            <GameStatusTable
                title='Scoreboard'
                playerStatusList={playerStatus}
                shouldShowDone={false}
                shouldShowScore={true}/>
        </GameCardContainer>
    </GameBox>
