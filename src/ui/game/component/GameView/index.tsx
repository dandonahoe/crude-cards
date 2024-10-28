import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { GameDealerSelection } from "../../screen/GameDealerSelection";
import { GameBoardContext } from '../../../GameBoardContext';
import { GameDealerJudge } from "../../screen/GameDealerJudge";
import { GamePlayerSelection } from "../GamePlayerSelection";
import { GameAction } from "@app/client/action/game.action";
import { GameComplete } from "../../screen/GameComplete";
import { GameResults } from "../../screen/GameResults";
import { GameWaiting } from "../../screen/GameWaiting";
import { GameLobby } from "../../screen/GameLobby";
import { GameHome } from "../../screen/GameHome";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GameError } from "../GameError";
import { useRouter } from "next/router";
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameView : RFC<Props> = () => {

    const dispatch = useDispatch();
    const router   = useRouter();

    const { gameStateDTO, isDealer, playerDealtCard } = useContext(GameBoardContext);
    const { gameCode } = router.query;

    useEffect(() => {

        const ifChangingGameUrl = () =>
            router.pathname === '/game/[game_code]' // todo: make constant
            && gameCode
            && gameCode !== gameStateDTO.game_code;

        if (ifChangingGameUrl())
            dispatch(GameAction.webJoinGame({
                game_code : gameCode as string,
            }));

    }, [router.pathname, gameCode, gameStateDTO.game_code, dispatch]);

    switch (gameStateDTO.game_stage) {

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

        case GameStage.DealerPickWinner:
            return isDealer
                ? <GameDealerJudge />
                : <GameWaiting />;

        default:
            return <GameError />;
    }
};
