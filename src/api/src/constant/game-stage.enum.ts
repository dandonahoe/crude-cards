import deepFreeze from 'deep-freeze-strict';


export enum GameStage {
    PlayerPickWhiteCard = 'player_pick_white_card',
    DealerPickBlackCard = 'dealer_pick_black_card',
    DealerPickWinner    = 'dealer_pick_winner',
    GameComplete        = 'game_complete',
    GameResults         = 'game_results',
    Unknown             = 'unknown',
    Lobby               = 'lobby',
    Home                = 'home',
}


deepFreeze(GameStage);
