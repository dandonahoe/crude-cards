import { GameAction } from '../../../client/action/game.action';
import { GameBox, GameBoxCentered } from '../GameBox';
import { useDispatch } from '@app/client/hook';
import { GameTextSubtitle } from '../GameText';
import { GameButton } from '../GameButton';


export const GameQuit = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(GameAction.leaveGame({}));
        dispatch(GameAction.closePopup());
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

