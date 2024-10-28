import { GameStage } from '../../../../../api/src/constant/game-stage.enum';
import { CardColor } from '../../../../../api/src/constant/card-color.enum';
import { selectIsHostByGameId, selectPlayerListByGameId } from '../../../../../client/selector/game';
import { SpecialId } from '../../../../../constant/framework/SpecialId';
import { GameBoardContext } from '../../../../GameBoardContext';
import { GameBanner } from '@app/ui/game/component/GameBanner';
import { GameButton } from '@app/ui/game/component/GameButton';
import { GameAction } from '@app/client/action/game.action';
import { MinimumPlayerCount } from '@app/ui/game/constant';
import { useSelector } from '../../../../../client/hook';
import { CA } from '@app/constant/framework/CoreAction';
import { useDispatch } from '@app/client/hook';
import { Box, Center } from '@mantine/core';
import { useContext } from 'react';


export const LobbyHeader = () => {

    const { gameStateDTO } = useContext(GameBoardContext);

    const dispatch = useDispatch();

    const handleStartGame = (): CA => dispatch(GameAction.startGame({}));

    const playerList = useSelector(state => selectPlayerListByGameId(state, SpecialId.DefaultGameCode));
    const isHost     = useSelector(state => selectIsHostByGameId(state, SpecialId.DefaultGameCode));

    debugger;

    // const playerCount   = gameStateDTO.player_list.length;
    const playerCount   = playerList.length;
    const needMoreCount = MinimumPlayerCount - playerCount;

    const isDealerPickingBlackCard = () => gameStateDTO.game_stage === GameStage.DealerPickBlackCard;
    const showHostStartButton      = () => isHost && hasEnoughPlayers();
    const hasEnoughPlayers         = () => !isTooFewPlayers();
    const isTooFewPlayers          = () => playerList.length < MinimumPlayerCount;
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
