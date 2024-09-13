import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { GameAction } from '../../../client/action/game.action';
import { GameDealerSelection } from '../GameDealerSelection';
import { GamePlayerSelection } from '../GamePlayerSelection';
import { GameDealerJudge } from '../GameDealerJudge';
import { GameComplete } from '../GameComplete';
import { useEffect, useContext } from 'react';
import { GameContext } from '../GameContext';
import { GameResults } from '../GameResults';
import { GameWaiting } from '../GameWaiting';
import { useDispatch } from 'react-redux';
import { GameLobby } from '../GameLobby';
import { GameError } from '../GameError';
import { useRouter } from 'next/router';
import { GameHome } from '../GameHome';
import { GameViewProps } from './type';


export const GameView: React.FC<GameViewProps> = () => {

    const dispatch = useDispatch();
    const router   = useRouter();

    const { gameState, isDealer, playerDealtCard } = useContext(GameContext);
    const { gameCode } = router.query;


    useEffect(() => {
        if (router.pathname === '/game/game_code' && gameCode && gameCode !== gameState.game_code)
            dispatch(GameAction.joinGame({ game_code : gameCode as string }));

    }, [router.pathname, gameCode, gameState.game_code, dispatch]);

    switch (gameState.game_stage) {

        case GameStage.GameComplete : return <GameComplete />;
        case GameStage.GameResults  : return <GameResults />;
        case GameStage.Lobby        : return <GameLobby />;
        case GameStage.Home         : return <GameHome />;

        case GameStage.PlayerPickWhiteCard :
            return isDealer || playerDealtCard
                ? <GameWaiting />
                : <GamePlayerSelection />;

        case GameStage.DealerPickBlackCard :
            return isDealer
                ? <GameDealerSelection />
                : <GameLobby />;

        case GameStage.DealerPickWinner    :
            return isDealer
                ? <GameDealerJudge />
                : <GameWaiting />;

        default:
            return <GameError />;
    }
};
