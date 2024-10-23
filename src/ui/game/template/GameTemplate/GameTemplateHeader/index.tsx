import { GameMenu } from '../../../component/GameMenu';
import classes from '../GameTemplate.module.css';
import { HeaderContent } from './HeaderContent';
import { App } from '../../../../AppContext';
import { Box, Group } from '@mantine/core';
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
                w='100%'
                style={debugStyle}>
                <HeaderContent />
            </Box>
        </Group>
    );
}

