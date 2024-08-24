import { Text, rem } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameFoe : RFC<Props> = ({
    player,
}) =>
    <Text
        fw={600}
        fz={rem(20)}>
        {player.username}
    </Text>
