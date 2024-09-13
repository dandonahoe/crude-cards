import { GameStackType } from '../GameStack/type';
import { GamePopup } from '../GamePopup';
import { GameDebug } from '../GameDebug';
import { GameStack } from '../GameStack';
import { GameView } from '../GameView';
import { RFC } from '@app/ui/type';
import { Env } from '../../../Env';
import { Props } from './type';


const isDebugOverlayVisible = Env.getBoolean('NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE');

export const GameBoard : RFC<Props> = () =>
    <GameStack type={GameStackType.FullHeightCentered}>
        <GamePopup />
        <GameView />
        {isDebugOverlayVisible &&
            <GameDebug />
        }
    </GameStack>;
