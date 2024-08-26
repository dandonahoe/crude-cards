import { GamePopup } from '../GamePopup';
import { GameDebug } from '../GameDebug';
import { GameView } from '../GameView';
import { Stack } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';

export const GameBoard : RFC<Props> = ({ id }) =>
    <Stack
        h='100vh'
        id={id}>
        <GamePopup />
        <GameView />
        <GameDebug />
    </Stack>;
