import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';

export const hasNoFoes = (foes: PlayerDTO[]): boolean =>
    foes.length === 0;
