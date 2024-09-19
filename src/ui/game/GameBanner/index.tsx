import { GameTextSubtitle, GameTextTitle } from '../GameText/index';
import { GameBox } from '../GameBox';
import { RFC } from '@app/ui/type';
import { Props } from './type';
import { Box } from '@mantine/core';


export const GameBanner : RFC<Props> = ({
    text, subtitle, color,
}) =>
    <GameBox>
        <Box
            style={{

        }}>
            <GameTextTitle color={color}>
                {text} {'asdf'}
            </GameTextTitle>
            <GameTextSubtitle color={color}>
                {subtitle}
            </GameTextSubtitle>
        </Box>
    </GameBox>
