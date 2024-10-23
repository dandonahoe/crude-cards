import { GameText, GameTextTitle } from '../../component/GameText';
import { GameBoxCentered } from '../../component/GameBox';
import { RFC } from '@app/ui/type';


export const GameTimeout : RFC = () =>
    <GameBoxCentered>
        <GameTextTitle>
            {'Too Slow'}
        </GameTextTitle>
        <GameText>
            {'You didn\'t pick a card and are banished from this round.'}
        </GameText>
    </GameBoxCentered>
