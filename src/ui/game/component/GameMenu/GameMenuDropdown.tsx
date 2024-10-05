import { getFilteredMenuItems } from './menuLogic';
import { GameMenuItems } from './GameMenuItems';
import { GameMenuDropdownProps } from './type';
import { GameContext } from '../../GameContext';
import { GameText } from '../GameText';
import { Menu } from '@mantine/core';
import { useContext } from 'react';
import { RFC } from '@app/ui/type';


export const GameMenuDropdown: RFC<GameMenuDropdownProps> = ({ toggle }) => {

    const { gameState, currentPlayer } = useContext(GameContext);
    const finalMenuItems = getFilteredMenuItems(gameState);

    return (
        <>
            {currentPlayer?.username &&
                <Menu.Label>
                    <GameText>{currentPlayer.username}</GameText>
                </Menu.Label>
            }
            <GameMenuItems
                menuItems={finalMenuItems}
                toggle={toggle} />
        </>
    );
};
