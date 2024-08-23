import { SetMetadata } from '@nestjs/common';
import { PlayerType } from '../constant/player-type.enum';


export const AllowPlayerTypes = (...types: PlayerType[]) =>
        SetMetadata('allowedPlayerTypes', types);
