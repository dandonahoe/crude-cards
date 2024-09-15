import { GameStackLogic as Logic } from './GameStackLogic';
import { Props, GameStackType } from './type';
import { App } from '../../AppContext';
import { Stack } from '@mantine/core';
import { useContext } from 'react';

export const GameStack = ({
    children, type = GameStackType.Default,
}: Props) => {

    const { isDebugging } = useContext(App);

    return (
        <Stack
            {...Logic.getLayoutProps(type)}
            style={{
                border : isDebugging ? '1px dashed #f91' : undefined,
            }}>
            {children}
        </Stack>
    );
}
