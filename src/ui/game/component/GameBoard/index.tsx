import { GameStackType } from '../GameStack/type';
import { AppContext } from '../../../AppContext';
import { GameStack } from '../GameStack';
import { GameDebug } from '../GameDebug';
import { GameView } from '../GameView';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';
import { Env } from '@app/Env';
import { useSelector } from '../../../../client/hook';
import { selectGameById } from '../../../../client/selector/game';
import { GameText } from '../GameText';


const isDebugOverlayVisible = Env.getBoolean('NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE');


export const GameBoard : RFC<Props> = ({ id : gameId }) => {

    const { isDebugging } = useContext(AppContext);

    const game = useSelector(state => selectGameById(state, gameId));


    return (
        <GameStack type={GameStackType.FullHeightCentered}>
            <GameText>
                {game.gameId}
            </GameText>
            <GameView gameId={gameId} />
            <GameDebug isVisible={isDebugOverlayVisible || isDebugging} />
        </GameStack>
    );
};

