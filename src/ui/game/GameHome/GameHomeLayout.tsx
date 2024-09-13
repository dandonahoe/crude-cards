import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameDeckLayout } from '../GameDeckLayout';
import { Stack, Button } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameHomeLayout: RFC<{ onResize: () => void }> = ({ onResize }) => (
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
