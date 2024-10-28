import { GameBoardContext } from '../../../GameBoardContext';
import { getFilteredMenuItems } from './menuLogic';
import { GameMenuItems } from './GameMenuItems';
import { GameMenuDropdownProps } from './type';
import { GameText } from '../GameText';
import { Menu } from '@mantine/core';
import { useContext } from 'react';
import { RFC } from '@app/ui/type';


export const GameMenuDropdown: RFC<GameMenuDropdownProps> = ({
    toggle,
}) => {

    const { gameStateDTO, currentPlayer } = useContext(GameBoardContext);
    const finalMenuItems = getFilteredMenuItems(gameStateDTO);

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
