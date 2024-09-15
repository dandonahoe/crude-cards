import { GameTextSubtitle, GameTextTitle } from '../GameText/index';
import { GameStack } from '../GameStack';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameBanner : RFC<Props> = ({
    text, subtitle, color,
}) =>
    <GameStack>
        <GameTextTitle color={color}>
            {text}
        </GameTextTitle>
        <GameTextSubtitle color={color}>
            {subtitle}
        </GameTextSubtitle>
    </GameStack>
