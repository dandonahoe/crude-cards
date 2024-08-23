import { PlayerType } from '../constant/player-type.enum';


export interface AuthOptions {
    allowedRoles? : PlayerType[]; // Example for role-based access control
}
