import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';
import { GameTextSubtitle, GameTextTitle } from '../GameText/index';


export const GameBanner : RFC<Props> = ({
    text, subtitle, color,
}) =>
    <Box
        ta='center'
        mb='sm'
        mt='xs'
        c={color}>
        <GameTextTitle>
            {text}
        </GameTextTitle>
        <GameTextSubtitle>
            {subtitle}
        </GameTextSubtitle>
    </Box>
