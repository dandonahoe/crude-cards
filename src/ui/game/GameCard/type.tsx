import { CardDTO } from '../../../api/src/game/dtos/card.dto';


export interface Props {
    onClick ?: (card : CardDTO) => void;
    card : CardDTO;
}
