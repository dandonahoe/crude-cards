import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { MenuItems } from './constant';


export const getFilteredMenuItems = (gameState : GameStateDTO) => {

    // Default list of menu items
    let finalMenuItemList = MenuItems;

    // If in Home stage, remove "Leave" and "Scoreboard" items
    if (gameState.game_stage === GameStage.Home)
        finalMenuItemList = MenuItems.filter(
            item => item.id !== 'Leave' && item.id !== 'Scoreboard',
        );

    return finalMenuItemList;
};
