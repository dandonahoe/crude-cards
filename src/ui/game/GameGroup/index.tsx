import { App } from '../../AppContext';
import { Group } from '@mantine/core';
import { useContext } from 'react';
import { Props } from './type';


export const GameGroup = ({
    children,
}: Props) => {

    const { isDebugging } = useContext(App);

    return (
        <Group
            style={{
                border : isDebugging ? '1px dashed #f91' : undefined,
            }}>
            {children}
        </Group>
    );
}
