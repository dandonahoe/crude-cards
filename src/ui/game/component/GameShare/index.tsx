import { GameShareButton } from './GameShareButton';
import { GameShareIcon } from './GameShareIcon';
import { Group } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameShare: RFC = () =>
    <Group fz='xs'>
        <GameShareIcon />
        <GameShareButton />
    </Group>;
