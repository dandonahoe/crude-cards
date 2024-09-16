import classes from '../GameTemplate.module.css';
import { HeaderContent } from './HeaderContent';
import { Box, Group } from '@mantine/core';
import { GameMenu } from '../../GameMenu';
import { App } from '../../../AppContext';
import { useContext } from 'react';


export const GameTemplateHeader = () => {

    const { isDebugging } = useContext(App);

    const debugStyle = {
        border : isDebugging ? '1px solid #290' : undefined,
    };

    return (
        <Group
            className={classes.headerShadow}
            style={debugStyle}>
            <Box
                className={classes.pi}
                style={debugStyle}>
                <Box
                    className={classes.symbol}
                    style={debugStyle}>
                    <GameMenu />
                </Box>
            </Box>
            <Box
                style={debugStyle}>
                <HeaderContent />
            </Box>
        </Group>
    );
}

