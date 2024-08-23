import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { selectIsHost } from '../../../../client/selector/game';
import { CA } from '../../../../constant/framework/CoreAction';
import { GameAction } from '@app/client/action/game';
import { GameContext } from '../../GameContext';
import { useDispatch } from '@app/client/hook';
import { GameBanner } from '../../GameBanner';
import { GameButton } from '../../GameButton';
import { Center, Stack } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const LobbyHeader: RFC = () => {

    const { gameState } = useContext(GameContext);

    const isHost = useSelector(selectIsHost);

    let subtitleMessage = undefined;

    const dispatch = useDispatch();

    const handleStartGame = (): CA =>
        dispatch(GameAction.startGame({}));

    const playerCount = gameState.player_list.length;
    const needMoreCount = 3 - playerCount;

    if (gameState.game_stage === GameStage.DealerPickBlackCard)
        subtitleMessage = 'Dealer is Starting';
    else if (playerCount < 3)
        subtitleMessage = `Need ${needMoreCount} More Player${needMoreCount > 1 ? 's' : ''} to Start`;
    else if (playerCount >= 3 && isHost)
        subtitleMessage = 'Players Ready';
    else if (playerCount >= 3)
        subtitleMessage = 'Waiting on Host to Start';

    return (
        <Stack>
            <GameBanner
                subtitle={subtitleMessage}
                text='Lobby'
                color='#fff' />
            {isHost && gameState.player_list.length >= 3 &&
                <Center m='xl'>
                    <GameButton
                        onClick={handleStartGame}
                        text='Start' />
                </Center>
            }
        </Stack>
    );
}
