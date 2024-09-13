import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto';

export interface ShareCardTooltipProps {
    gameState : GameStateDTO;
    isCopied  : boolean;

}
