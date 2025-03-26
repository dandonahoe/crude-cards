import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
import { OnClickCard } from '../../type';


export interface Props {
    onCardClicked ?: OnClickCard;
    cards          : CardDTO[];
}

export interface GameCardListProps {
    onCardClicked ?: OnClickCard;
    cards          : CardDTO[];
}
