import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { TextInputDebounced } from '../TextInputDebounced';
import { useDispatch } from '../../../client/hook';
import { GameContext } from '../GameContext';
import { Stack, Text } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const UsernameCardContent: RFC = () => {

    const { gameState, currentPlayer } = useContext(GameContext);

    const dispatch = useDispatch();

    const handleTextUpdate = (
        updatedText: string,
    ): CA => dispatch(GameAction.updateUsername({
        username : updatedText,
    }))

    const handleTextInputBlur = (
        _value: string,
        _name: string,
    ): CA =>
        dispatch(GameAction.noOp());

    return (
        <Stack mb='xl'>
            <Text
                ta='left'
                fw={600}>
                {'Your Name'}
            </Text >
            {gameState.hand_number > 0 &&
                <Text>
                    {currentPlayer?.username}
                </Text>
            }
            {gameState.hand_number === 0 &&
                <TextInputDebounced
                    value={currentPlayer?.username ?? ''}
                    onBlur={handleTextInputBlur}
                    onChange={handleTextUpdate}
                    milliseconds={1500}
                    name='username'
                    size='md' />
            }
        </Stack>
    );
}
