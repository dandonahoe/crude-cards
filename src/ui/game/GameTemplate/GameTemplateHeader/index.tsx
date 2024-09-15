import classes from '../GameTemplate.module.css';
import { HeaderContent } from './HeaderContent';
import { Box, Group } from '@mantine/core';
import { GameMenu } from '../../GameMenu';
import { App } from '../../../AppContext';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameTemplateHeader : RFC = () => {

    const { isDebugging } = useContext(App);

    const debugStyle = {
        border : isDebugging ? '1px solid #290' : undefined,
    };

    return (
        <Group
            className={classes.menu}
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

