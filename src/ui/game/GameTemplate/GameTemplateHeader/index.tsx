import classes from '../GameTemplate.module.css';
import { HeaderContent } from './HeaderContent';
import { Box, Group } from '@mantine/core';
import { GameMenu } from '../../GameMenu';
import { RFC } from '@app/ui/type';


export const GameTemplateHeader : RFC = () =>
    <Group
        className={classes.menu}
        style={{
            border : '1px solid #f90',
        }}>
        <Box
            className={classes.pi}
            style={{
                border : '1px solid #f90',
            }}>
            <Box
                className={classes.symbol}
                style={{
                    border : '1px solid #f90',
                }}>
                <GameMenu />
            </Box>
        </Box>
        <Box
            style={{
                border : '1px solid #f90',
            }}>
            <HeaderContent />
        </Box>
    </Group>
