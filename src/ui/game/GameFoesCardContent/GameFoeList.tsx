import { GameFoeListProps } from './type';
import { Stack } from '@mantine/core';
import { GameFoe } from '../GameFoe';
import { RFC } from '@app/ui/type';


export const GameFoeList: RFC<GameFoeListProps> = ({ foes }) => (
    <Stack
        justify='center'
        align='center'
        mt='xl'
        mb='xl'>
        {foes.map(player => (
            <GameFoe
                player={player}
                key={player.id} />
        ))}
    </Stack>
);
