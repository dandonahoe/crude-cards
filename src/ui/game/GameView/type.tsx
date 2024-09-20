import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';


export interface GameViewProps {
    playerDealtCard ?: CardDTO;
    gameState        : GameStateDTO;
    gameCode        ?: string;
    isDealer         : boolean;
}
