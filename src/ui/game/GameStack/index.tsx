import { GameStackLogic as Logic } from './GameStackLogic';
import { Props, GameStackType } from './type';
import { Stack } from '@mantine/core';

export const GameStack = ({
    children, type = GameStackType.Default,
}: Props) =>
    <Stack {...Logic.getLayoutProps(type)}>
        {children}
    </Stack>
