import { GameStage } from '../../../../../api/src/constant/game-stage.enum';
import { DealerPickBlackCard } from './DealerPickBlackCard';
import { PlayerPickWhiteCard } from './PlayerPickWhiteCard';
import { selectIsDealer } from '@app/client/selector/game';
import { GameResultsHeader } from './GameResultsHeader';
import { GameContext } from '@app/ui/game/GameContext';
import { DealerPickWinner } from './DealerPickWinner';
import { GameHomeHeader } from './GameHomeHeader';
import { LobbyHeader } from './LobbyHeader';
import { useSelector } from 'react-redux';
import { Box } from '@mantine/core';
import { useContext } from 'react';


export const HeaderContent = () => {

    const { gameState } = useContext(GameContext);

    const isDealer = useSelector(selectIsDealer);

    switch(gameState.game_stage) {
        case GameStage.GameComplete:
        case GameStage.Unknown:
            return null;

        case GameStage.Home:
            return <GameHomeHeader />;

        case GameStage.DealerPickBlackCard:  {
            if(isDealer)
                return <DealerPickBlackCard />;

            if(gameState.hand_number > 0)
                return <GameResultsHeader />;

            return <LobbyHeader />;
        }
        case GameStage.PlayerPickWhiteCard: return <PlayerPickWhiteCard />;
        case GameStage.DealerPickWinner   : return <DealerPickWinner    />;
        case GameStage.GameResults        : return <GameResultsHeader />;
        case GameStage.Lobby              : return <LobbyHeader         />;

        default: return <Box />;
    }
}
