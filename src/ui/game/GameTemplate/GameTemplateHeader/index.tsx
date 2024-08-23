import classes from '../GameTemplate.module.css';
import { HeaderContent } from './HeaderContent';
import { Box, Stack} from '@mantine/core';
import { GameMenu } from '../../GameMenu';
import { RFC } from '@app/ui/type';


export const GameTemplateHeader : RFC = () => {

    const handleOpen = () => {
        console.log('HANDLE OPEN')
    };

    return (
        <Stack className={classes.menu}>
            <Box
                className={classes.pi}
                onClick={handleOpen}>
                <Box className={classes.symbol}>
                    <GameMenu />
                </Box>
            </Box>
            <Box>
                <HeaderContent />
            </Box>
        </Stack>
    )
}
