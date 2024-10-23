import { GameTextSubtitle, GameTextNeon, GameTextSmall } from '@app/ui/game/component/GameText';
import { selectIsPlayerWinner, selectWinner } from '@app/client/selector/game';
import { GameStackType } from '@app/ui/game/component/GameStack/type';
import { GameButton } from '@app/ui/game/component/GameButton';
import { GameStack } from '@app/ui/game/component/GameStack';
import { GameAction } from '@app/client/action/game.action';
import { GameContext } from '@app/ui/game/GameContext';
import { useSelector, useDispatch } from 'react-redux';
import { useContext } from 'react';


export const GameResultsHeader = () => {

    const isWinner = useSelector(selectIsPlayerWinner);
    const winner   = useSelector(selectWinner);

    const { isDealer } = useContext(GameContext);
    const dispatch = useDispatch();

    const handleNextHand = () => dispatch(GameAction.nextHand({}));

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
