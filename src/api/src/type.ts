import { Player } from './player/player.entity';
import { Game } from './game/game.entity';


type NullableString = string | null;


export type AuthToken = NullableString;
export type SocketID  = NullableString;
export type GameCode  = NullableString;


// Enum representing different types of timers used in the game.
export enum TimerType {
    // Timer for the stage where players select a white card.
    PlayerSelectWhiteCard = 'PlayerSelectWhiteCard',

    // Timer for the stage where the dealer picks a black card.
    DealerPickBlackCard = 'DealerPickBlackCard',

    // Timer for the stage where the dealer picks a winning white card.
    DealerPickWinner = 'DealerPickWinner',

    // Fallback or unrecognized timer type.
    Unknown = 'Unknown',
}

// Enum representing different types of cookies used in the application.
export enum CookieType {
    // Cookie storing the player's authentication token.
    AuthToken = 'AuthToken',

    // Fallback or unrecognized cookie type.
    Unknown = 'Unknown',
}

// Interface representing the disconnection state of a player.
export interface DisconnectPlayer {
    // The player entity that disconnected. Null if no player is found.
    player: Player | null;

    // The game entity associated with the disconnected player. Null if no player / game is found.
    game: Game | null;
}
