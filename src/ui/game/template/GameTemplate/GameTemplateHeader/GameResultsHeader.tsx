import { selectIsPlayerWinnerByGameId, selectWinnerByGameId } from '../../../../../client/selector/game';
import { GameTextSubtitle, GameTextNeon, GameTextSmall } from '@app/ui/game/component/GameText';
import { SpecialId } from '../../../../../constant/framework/SpecialId';
import { GameStackType } from '@app/ui/game/component/GameStack/type';
import { GameBoardContext } from '../../../../GameBoardContext';
import { GameButton } from '@app/ui/game/component/GameButton';
import { GameStack } from '@app/ui/game/component/GameStack';
import { GameAction } from '@app/client/action/game.action';
import { useSelector, useDispatch } from '@app/client/hook';
import { useContext } from 'react';


export const GameResultsHeader = () => {

    const isWinner = useSelector(state => selectIsPlayerWinnerByGameId(state, SpecialId.DefaultGameCode));
    const winner   = useSelector(state => selectWinnerByGameId(state, SpecialId.DefaultGameCode));

    const { isDealer, gameStateDTO : { game_code } } = useContext(GameBoardContext);
    const dispatch = useDispatch();

    const handleNextHand = () => dispatch(GameAction.webNextHand({
        game_code,
    }));

    return (
        <GameStack>
            <GameTextSubtitle>
                {'WINNER IS'}
            </GameTextSubtitle>
            <GameTextNeon>
                {isWinner
                    ? 'YOU!'
                    : winner?.username
                }
            </GameTextNeon>
            {!isDealer &&
                <GameTextSmall>
                    {'Waiting on Dealer'}
                </GameTextSmall>
            }
            {isDealer &&
                <GameStack type={GameStackType.Centered}>
                    <GameButton
                        onClick={handleNextHand}
                        text='Next' />
                </GameStack>
            }
        </GameStack>
    );
}
