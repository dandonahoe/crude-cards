import { CA } from '../../../constant/framework/CoreAction';
import { GameAction } from '@app/client/action/game';
import { Box, Center, Text } from '@mantine/core';
import { useDispatch } from '@app/client/hook';
import { GameButton } from '../GameButton';
import { RFC } from '@app/ui/type';


export const GameQuit : RFC = () => {

    const dispatch = useDispatch();

    const handleClick = () : CA =>
        dispatch(GameAction.exitGame({}));

    return (
        <Box pb='xl'>
            <Text
                ta='center'
                fz='xl'
                mb='md'>
                {'You Sure?'}
            </Text>
            <Center>
                <GameButton
                    onClick={handleClick}
                    text='Quit' />
            </Center>
        </Box>
    );
}

