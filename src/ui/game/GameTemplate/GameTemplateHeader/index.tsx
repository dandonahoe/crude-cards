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
                border : '1px dotted #290',
            }}>
            <Box
                className={classes.symbol}
                style={{
                    border : '1px dashed #19d',
                }}>
                <GameMenu />
            </Box>
        </Box>
        <Box
            style={{
                border : '1px solid #a30',
            }}>
            <HeaderContent />
        </Box>
    </Group>
