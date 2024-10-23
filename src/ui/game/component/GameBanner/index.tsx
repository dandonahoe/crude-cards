import { GameTextSubtitle, GameTextTitle } from '../GameText/index';
import { GameBox } from '../GameBox';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameBanner : RFC<Props> = ({
    text, subtitle, color,
}) =>
    <GameBox>
        <GameTextTitle color={color}>
            {text}
        </GameTextTitle>
        <GameTextSubtitle color={color}>
            {subtitle}
        </GameTextSubtitle>
    </GameBox>
