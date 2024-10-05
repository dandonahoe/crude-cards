import { GameStackType } from '../GameStack/type';
import { AppContext } from '../../../AppContext';
import { GameStack } from '../GameStack';
import { GameDebug } from '../GameDebug';
import { GameView } from '../GameView';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';
import { Env } from '@app/Env';


const isDebugOverlayVisible = Env.getBoolean('NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE');


export const GameBoard : RFC<Props> = () => {

    const { isDebugging } = useContext(AppContext);

    return (
        <GameStack type={GameStackType.FullHeightCentered}>
            <GameView />
            <GameDebug isVisible={isDebugOverlayVisible || isDebugging} />
        </GameStack>
    );
};

