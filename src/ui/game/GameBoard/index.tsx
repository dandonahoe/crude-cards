import { GamePopup } from '../GamePopup';
import { GameDebug } from '../GameDebug';
import { GameView } from '../GameView';
import { Stack } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Env } from '../../../Env';
import { Props } from './type';


const isDebugOverlayVisible = Env.getBoolean('NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE');

export const GameBoard : RFC<Props> = ({ id }) =>
    <Stack
        h='100vh'
        id={id}>
        <GamePopup />
        <GameView />
        {isDebugOverlayVisible &&
            <GameDebug />
        }
    </Stack>;
