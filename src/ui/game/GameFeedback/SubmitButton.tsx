import { Group } from '@mantine/core';
import { GameButton } from '../GameButton';

export const SubmitButton = () =>
    <Group
        justify='center'
        align='center'
        tabIndex={0}
        mt='md'>
        <GameButton text='Submit' />
    </Group>
