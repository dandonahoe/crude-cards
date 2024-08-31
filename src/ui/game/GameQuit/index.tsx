import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { Box, Center, Text } from '@mantine/core';
import { useDispatch } from '@app/client/hook';
import { GameButton } from '../GameButton';
import { RFC } from '@app/ui/type';


export const GameQuit : RFC = () => {

    const dispatch = useDispatch();

    const handleClick = () : CA => {
        dispatch(GameAction.leaveGame({}));

        console.log('Sent Message to Disconnect, Closing Popup Window')

        return dispatch(GameAction.closePopup());
    }

    return (
        <Box pb='xl'>
            <Text
                ta='center'
                fz='xl'
                pb='xl'
                fw={600}
                mb='md'>
                {'Double Checking'}
            </Text>
            <Center>
                <GameButton
                    onClick={handleClick}
                    text='Exit' />
            </Center>
        </Box>
    );
}

