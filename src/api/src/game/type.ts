import { GameSession } from '../game-session/game-session.entity';
import { ScoreLog } from '../score-log/score-log.entity';
import { Player } from '../player/player.entity';
import { Game } from './game.entity';


export interface PlayerState {
    currentPlayer : Player      | null,
    scoreLog      : ScoreLog    | null,
    session       : GameSession | null,
    players       : Player[]    | null,
    game          : Game        | null,
}
