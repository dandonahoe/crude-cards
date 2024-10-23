import { GameAction } from '../../../../client/action/game.action';
import { CA } from '../../../../constant/framework/CoreAction';
import { TextInputDebounced } from '../TextInputDebounced';
import { GameContext } from '../../GameContext';
import { useDispatch } from '@app/client/hook';
import { GameStack } from '../GameStack';
import { GameText } from '../GameText';
import { useContext } from 'react';


export const UsernameCardContent = () => {

    const { gameState, currentPlayer } = useContext(GameContext);
    const dispatch = useDispatch();

    const handleTextUpdate = (updatedText: string): CA =>
        dispatch(GameAction.updateUsername({ username : updatedText }));

    const handleTextInputBlur = (): CA => dispatch(GameAction.noOp());

    return (
        <GameStack>
            <GameText>
                {'Your Name'}
            </GameText>
            {gameState.hand_number > 0 ?
                <GameText>{currentPlayer?.username}</GameText>
             :
                <TextInputDebounced
                    value={currentPlayer?.username ?? ''}
                    onBlur={handleTextInputBlur}
                    onChange={handleTextUpdate}
                    milliseconds={1500}
                    name='username'
                    size='md'/>
            }
        </GameStack>
    );
};
