import { selectIsPlayerWinner, selectWinner } from '@app/client/selector/game';
import { GameTextNeon, GameTextSmall, GameTextSubtitle } from '../../GameText';
import { useDispatch, useSelector } from '../../../../client/hook';
import { GameAction } from '../../../../client/action/game.action';
import { GameStackType } from '../../GameStack/type';
import { GameContext } from '../../GameContext';
import { GameButton } from '../../GameButton'
import { GameStack } from '../../GameStack';
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
