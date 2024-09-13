import { CardDTO } from '../../../api/src/game/dtos/card.dto';

export interface Props {
    onCardClicked ?: (card : CardDTO) => void;
    cards          : CardDTO[];
}

export interface GameCardListProps {
    onCardClicked ?: (card : CardDTO) => void;
    cards          : CardDTO[];
}
