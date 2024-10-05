import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
import { PlayerStatus } from '../../type';


export interface ResultsCardsProps {
    dealerCard : CardDTO;
    winnerCard : CardDTO;
    endMessage : string;
}


export interface ScoreboardSectionProps {
    playerStatus : PlayerStatus[];
}
