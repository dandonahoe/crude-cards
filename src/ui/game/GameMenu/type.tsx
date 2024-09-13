import { ReactNode } from 'react';

export interface MenuItemProps {

    onClick : (id : string) => void;
    text    : string;
    icon    : ReactNode;
    id      : string;
}

export interface MenuLogicProps {

    current_player_id : string;
    game_stage        : string;
    game_code         : string;
}
