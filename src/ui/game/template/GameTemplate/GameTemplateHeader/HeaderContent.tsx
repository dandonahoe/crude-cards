import { selectIsDealerByGameId } from '../../../../../client/selector/game';
import { GameStage } from '../../../../../api/src/constant/game-stage.enum';
import { SpecialId } from '../../../../../constant/framework/SpecialId';
import { GameBoardContext } from '../../../../GameBoardContext';
import { DealerPickBlackCard } from './DealerPickBlackCard';
import { PlayerPickWhiteCard } from './PlayerPickWhiteCard';
import { GameResultsHeader } from './GameResultsHeader';
import { DealerPickWinner } from './DealerPickWinner';
import { GameHomeHeader } from './GameHomeHeader';
import { useSelector } from '@app/client/hook';
import { LobbyHeader } from './LobbyHeader';
import { Box } from '@mantine/core';
import { useContext } from 'react';


export const HeaderContent = () => {

    const { gameStateDTO : {
        game_stage, hand_number,
    }} = useContext(GameBoardContext);

    const isDealer = useSelector(state => selectIsDealerByGameId(state, SpecialId.DefaultGameCode));

    switch(game_stage) {
        case GameStage.GameComplete:
        case GameStage.Unknown:
            return null;

        case GameStage.Home:
            return <GameHomeHeader />;

        case GameStage.DealerPickBlackCard:  {
            if(isDealer)
                return <DealerPickBlackCard />;

            if(hand_number > 0)
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
