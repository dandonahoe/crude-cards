import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { PlayerDTO } from '../../../../api/src/game/dtos/player.dto';

// Props for ShareCard Component
export interface ShareCardProps {
    gameStage: GameStage;
}

// Props for PlayerWarning Component
export interface PlayerWarningProps {
    foeCount: number;
}

// Props for FoeList Component
export interface FoeListProps {
    foes: PlayerDTO[];
    gameCode: string;
}
