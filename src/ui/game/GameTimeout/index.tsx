import { GameText, GameTextTitle } from '../GameText';
import { GameBoxCentered } from '../GameBox';
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
