import classes from '../GameTemplate.module.css';
import { HeaderContent } from './HeaderContent';
import { Box, Group, Stack} from '@mantine/core';
import { GameMenu } from '../../GameMenu';
import { RFC } from '@app/ui/type';


export const GameTemplateHeader : RFC = () =>
    <Group className={classes.menu}>
        <Box className={classes.pi}>
            <Box className={classes.symbol}>
                <GameMenu />
            </Box>
        </Box>
        <Box>
            <HeaderContent />
        </Box>
    </Group>
