import { Stack, Button } from '@mantine/core';
import { GameDeckLayout } from '../GameDeckLayout';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { RFC } from '@app/ui/type';

export const GameHomeLayout: RFC<{ children: React.ReactNode, onResize: () => void }> = ({ children, onResize }) => (
    <Stack
        justify='center'
        align='center'
        h='100vh'
        mt={60}
        ta='center'>
        <Button
            tabIndex={0}
            size='xs'
            variant='outline'
            c={CardColor.White}
            onClick={onResize}>
            {'Resize'}
        </Button>
        <GameDeckLayout
            color={CardColor.Black}
            cards={[]} />
    </Stack>
);
