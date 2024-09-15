import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameAction } from '../../../../client/action/game.action';
import { selectIsHost } from '../../../../client/selector/game';
import { CA } from '../../../../constant/framework/CoreAction';
import { GameStackType } from '../../GameStack/type';
import { GameContext } from '../../GameContext';
import { useDispatch } from '@app/client/hook';
import { GameBanner } from '../../GameBanner';
import { GameButton } from '../../GameButton';
import { GameStack } from '../../GameStack';
import { useSelector } from 'react-redux';
import { Center } from '@mantine/core';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const LobbyHeader: RFC = () => {

    const { gameState } = useContext(GameContext);
    const dispatch = useDispatch();

    const handleStartGame = (): CA => dispatch(GameAction.startGame({}));

    const isHost = useSelector(selectIsHost);

    const playerCount   = gameState.player_list.length;
    const needMoreCount = 3 - playerCount;

    let subtitleMessage = undefined;

    if (gameState.game_stage === GameStage.DealerPickBlackCard)
        subtitleMessage = 'Dealer is Starting';

    else if (playerCount < 3)
        subtitleMessage = `Need ${needMoreCount} More Player${needMoreCount > 1 ? 's' : ''} to Start`;

    else if (playerCount >= 3 && isHost)
        subtitleMessage = 'Players Ready';

    else if (playerCount >= 3)
        subtitleMessage = 'Waiting on Host to Start';

    return (
        <GameStack type={GameStackType.Centered}>
            <GameBanner
                subtitle={subtitleMessage}
                color={CardColor.White}
                text='Lobby12' />
            {isHost && gameState.player_list.length >= 3 &&
                <Center m='xl'>
                    <GameButton
                        onClick={handleStartGame}
                        text='Start' />
                </Center>
            }
        </GameStack>
    );
}
