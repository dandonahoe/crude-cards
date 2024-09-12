import { GameTextSubtitle, GameTextTitle } from '../GameText/index';
import { GameBoxCentered } from '../GameBox/index';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameBanner : RFC<Props> = ({
    text, subtitle, color,
}) =>
    <GameBoxCentered size='sm'>
        <GameTextTitle color={color}>
            {text}
        </GameTextTitle>
        <GameTextSubtitle color={color}>
            {subtitle}
        </GameTextSubtitle>
    </GameBoxCentered>
