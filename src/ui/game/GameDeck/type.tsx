// src/ui/game/GameDeck/type.tsx

import { CardDTO } from '../../../api/src/game/dtos/card.dto';

export interface Props {
    onCardClicked?: (card: CardDTO) => void;
    cards: CardDTO[];
}

export interface GameCardListProps {
    cards: CardDTO[];
    onCardClicked?: (card: CardDTO) => void;
}
