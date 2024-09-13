import { RFC } from '@app/ui/type';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardContainer } from '../GameCardContainer';
import { PlayerWarningProps } from './type';
import { Text } from '@mantine/core';


export const PlayerWarning : RFC<PlayerWarningProps> = ({
    foeCount,
}) => (
    foeCount < 3 ? (
        <GameCardContainer color={CardColor.Black}>
            <Text
                fw={600}
                mb='xl'>{'Minimum 3 Players'}</Text>
            <Text
                ta='center'
                fz='sm'
                fw={600}>{`Need ${3 - foeCount} more players`}</Text>
        </GameCardContainer>
    ) : null
);
