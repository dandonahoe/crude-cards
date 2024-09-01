import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { GameDealerSelection } from '../GameDealerSelection/index';
import { GamePlayerSelection } from '../GamePlayerSelection';
import { GameAction } from '../../../client/action/game.action';
import { GameDealerJudge } from '../GameDealerJudge';
import { GameResults } from '../GameResults/index';
import { GameComplete } from '../GameComplete';
import { useDispatch } from '@app/client/hook';
import { useContext, useEffect } from 'react';
import { GameContext } from '../GameContext';
import { GameHome } from '../GameHome/index';
import { GameWaiting } from '../GameWaiting';
import { GameLobby } from '../GameLobby';
import { GameError } from '../GameError';
import { useRouter } from 'next/router';
import { RFC } from '../../type';


export const GameView : RFC = () => {

    const dispatch = useDispatch();
    const router   = useRouter();

    const { gameCode } = router.query;

    const { playerDealtCard, isDealer, gameState } = useContext(GameContext);

    useEffect(() => {
        if (router.pathname === '/game/game_code')
            if (gameCode && gameCode !== gameState.game_code)
                dispatch(GameAction.joinGame({
                    game_code : gameCode as string,
                }));
  }, [router.pathname, gameCode, gameState.game_code, dispatch]);

    switch(gameState.game_stage) {

        case GameStage.Home:
        case GameStage.Unknown:      return <GameHome />;
        case GameStage.GameComplete: return <GameComplete />;
        case GameStage.GameResults : return <GameResults />;
        case GameStage.Lobby       : return <GameLobby />;

        case GameStage.DealerPickBlackCard: {
            if(isDealer)
                return<GameDealerSelection />

            if(gameState.hand_number > 0)
                return <GameResults />;

            return <GameLobby />;
        }

        case GameStage.PlayerPickWhiteCard:
            return isDealer || playerDealtCard
                ? <GameWaiting />
                : <GamePlayerSelection />

        case GameStage.DealerPickWinner:
            return isDealer
                ? <GameDealerJudge />
                : <GameWaiting />;

        default:
            return <GameError />;
    }
}
