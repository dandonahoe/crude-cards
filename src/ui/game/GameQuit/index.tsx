import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { GameBox, GameBoxCentered } from '../GameBox';
import { useDispatch } from '@app/client/hook';
import { GameTextSubtitle } from '../GameText';
import { GameButton } from '../GameButton';
import { RFC } from '@app/ui/type';


export const GameQuit : RFC = () => {

    const dispatch = useDispatch();

    const handleClick = () : CA => {
        dispatch(GameAction.leaveGame({}));

        return dispatch(GameAction.closePopup());
    }

    return (
        <GameBox size='lg'>
            <GameTextSubtitle>
                {'Double Checking'}
            </GameTextSubtitle>
            <GameBoxCentered>
                <GameButton
                    onClick={handleClick}
                    text='Exit' />
            </GameBoxCentered>
        </GameBox>
    );
}

