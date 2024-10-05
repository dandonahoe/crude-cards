import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameFoe : RFC<Props> = ({
    player,
}) =>
    <GameText>
        {player.username}
    </GameText>
