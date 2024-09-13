import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { PlayerStatus } from '../type';

export interface PlayerDeckProps {
    dealerDealtCard : CardDTO;
    playerDealtCard : CardDTO;
}

export interface StatusTableProps {
    playerStatusList : PlayerStatus[];
}

export interface DealerDeckProps {
    dealerDealtCard: CardDTO;
}
