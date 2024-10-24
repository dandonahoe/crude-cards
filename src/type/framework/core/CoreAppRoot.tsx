
import { GameState } from './GameState';

export interface CoreAppRoot {
    game : { [key : string] : GameState }
}
