import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameAction } from '../../../../client/action/game.action';
import { selectIsHost } from '../../../../client/selector/game';
import { CA } from '../../../../constant/framework/CoreAction';
import { MinimumPlayerCount } from '../../constant';
import { GameContext } from '../../GameContext';
import { useDispatch } from '@app/client/hook';
import { GameBanner } from '../../GameBanner';
import { GameButton } from '../../GameButton';
import { Box, Center } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useContext } from 'react';


export const LobbyHeader = () => {

    const { gameState } = useContext(GameContext);
    const dispatch = useDispatch();

    const handleStartGame = (): CA => dispatch(GameAction.startGame({}));

    const isHost = useSelector(selectIsHost);

    const playerCount = gameState.player_list.length;
    const needMoreCount = MinimumPlayerCount - playerCount;

    const isDealerPickingBlackCard = () => gameState.game_stage === GameStage.DealerPickBlackCard;
    const showHostStartButton      = () => isHost && hasEnoughPlayers();
    const hasEnoughPlayers         = () => !isTooFewPlayers();
    const isTooFewPlayers          = () => gameState.player_list.length < MinimumPlayerCount;
    const isWaitingOnHost          = () => !isHost && hasEnoughPlayers();

    let subtitle = undefined;

    if (isDealerPickingBlackCard()) subtitle = 'Dealer is Starting';
    else if (isTooFewPlayers())     subtitle = `Need ${needMoreCount} More Player${needMoreCount > 1 ? 's' : ''} to Start`;
    else if (showHostStartButton()) subtitle = 'Players Ready';
    else if (isWaitingOnHost())     subtitle = 'Waiting on Host to Start';

    return (
        <Box>
            <GameBanner
                color={CardColor.White}
                subtitle={subtitle}
                text='Lobby' />
            {showHostStartButton() &&
                <Center m='xl'>
                    <GameButton
                        onClick={handleStartGame}
                        text='Start' />
                </Center>
            }
        </Box>
    );
}
