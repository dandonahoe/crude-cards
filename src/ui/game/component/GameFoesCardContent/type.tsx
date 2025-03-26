import { PlayerDTO } from '../../../../api/src/game/dtos/player.dto';


export interface Props {
    foes: PlayerDTO[];
}

export interface GameFoeListProps {
    foes: PlayerDTO[];
}

export interface NoFoesMessageProps {
    gameCode: string | null;
}

export interface FoeContentProps {
    gameCode : string | null;
    foes     : PlayerDTO[];
}
