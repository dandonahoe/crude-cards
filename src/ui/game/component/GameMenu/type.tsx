import { GamePopupType } from '../../../../api/src/constant/game-popup-type.enum';
import { ReactNode } from 'react';

export interface MenuItemProps {
    onClick ?: (id : string) => void;
    text     : string;
    icon     : ReactNode;
    id       : GamePopupType;
}

export interface MenuLogicProps {
    current_player_id : string;
    game_stage        : string;
    game_code         : string;
}

export interface GameMenuBurgerProps {
    opened : boolean;
    toggle : () => void;
}

export interface GameMenuDropdownProps {
    toggle : () => void;
}

export interface GameMenuItemsProps {
    menuItems : MenuItemProps[];

    toggle : (id : GamePopupType) => void;
}
