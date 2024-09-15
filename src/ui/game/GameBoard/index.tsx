import { GameStackType } from '../GameStack/type';
import { GameStack } from '../GameStack';
import { GameText } from '../GameText';
import { GameView } from '../GameView';
import { RFC } from '@app/ui/type';
import { Props } from './type';


// const isDebugOverlayVisible = Env.getBoolean('NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE');


export const GameBoard : RFC<Props> = () =>
    <GameStack type={GameStackType.FullHeightCentered}>
        <GameText>
            {'GAMEBOARD BEGINNING BACK TO DEBBINvG'}
        </GameText>
        {/* <GamePopup /> */}
        <GameView />
        {/* <GameDebug isVisible={isDebugOverlayVisible} /> */}
        <GameText>
            {'GAMEBOARD END'}
        </GameText>
    </GameStack>;
