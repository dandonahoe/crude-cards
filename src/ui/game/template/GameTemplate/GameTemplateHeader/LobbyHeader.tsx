import { GameStage } from '../../../../../api/src/constant/game-stage.enum';
import { CardColor } from '../../../../../api/src/constant/card-color.enum';
import { GameBanner } from '@app/ui/game/component/GameBanner';
import { GameButton } from '@app/ui/game/component/GameButton';
import { GameAction } from '@app/client/action/game.action';
import { MinimumPlayerCount } from '@app/ui/game/constant';
import { selectIsHost } from '@app/client/selector/game';
import { CA } from '@app/constant/framework/CoreAction';
import { GameContext } from '@app/ui/game/GameContext';
import { useDispatch } from '@app/client/hook';
import { Box, Center } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useContext } from 'react';


export const LobbyHeader = () => {

    const { gameState } = useContext(GameContext);

    const dispatch = useDispatch();

    const handleStartGame = (): CA => dispatch(GameAction.startGame({}));

    const isHost = useSelector(selectIsHost);

    const playerCount   = gameState.player_list.length;
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
