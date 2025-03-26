import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { GameDealerSelection } from "../../screen/GameDealerSelection";
import { GameDealerJudge } from "../../screen/GameDealerJudge";
import { GamePlayerSelection } from "../GamePlayerSelection";
import { GameAction } from "@app/client/action/game.action";
import { GameComplete } from "../../screen/GameComplete";
import { GameResults } from "../../screen/GameResults";
import { GameWaiting } from "../../screen/GameWaiting";
import { GameLobby } from "../../screen/GameLobby";
import { GameHome } from "../../screen/GameHome";
import { GameContext } from "../../GameContext";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GameError } from "../GameError";
import { useRouter } from "next/router";


export const GameView = () => {

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
