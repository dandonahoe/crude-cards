import { GameAction } from '../../../../client/action/game.action';
import { GameBoardContext } from '@app/ui/GameBoardContext';
import { GameBox, GameBoxCentered } from '../GameBox';
import { useDispatch } from '@app/client/hook';
import { GameTextSubtitle } from '../GameText';
import { GameButton } from '../GameButton';
import { useContext } from 'react';


export const GameQuit = () => {

    const dispatch = useDispatch();

    const { gameStateDTO : { game_code }} = useContext(GameBoardContext);

    const handleClick = () => {

        dispatch(GameAction.webLeaveGame({ game_code }));
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

