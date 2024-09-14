import { GameStackType } from '../GameStack/type';
import { GamePopup } from '../GamePopup';
import { GameDebug } from '../GameDebug';
import { GameStack } from '../GameStack';
import { GameView } from '../GameView';
import { Text } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Env } from '../../../Env';
import { Props } from './type';


const isDebugOverlayVisible = Env.getBoolean('NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE');


export const GameBoard : RFC<Props> = () =>
    <GameStack type={GameStackType.FullHeightCentered}>
        <Text>
            {'GAMEBOARD BEGINNING'}
        </Text>
        <GamePopup />
        <GameView />
        <GameDebug isVisible={isDebugOverlayVisible} />
        <Text>
            {'GAMEBOARD END'}
        </Text>
    </GameStack>;
