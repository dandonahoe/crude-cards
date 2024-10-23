import { MenuItemClickedDTO } from '../../../../api/src/game/dtos/menu-item-clicked.dto';
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameAction } from '../../../../client/action/game.action';
import { getFilteredMenuItems } from './menuLogic';
import { GameMenuItems } from './GameMenuItems';
import { GameContext } from '../../GameContext';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch } from '@app/client/hook';
import { Burger, Menu } from '@mantine/core';
import { GameText } from '../GameText';
import { useContext } from 'react';


export const GameMenu = () => {

    const [
        isMenuOpened, { toggle : toggleMenuOpen },
    ] = useDisclosure();

    const dispatch = useDispatch();

    const { gameState, currentPlayer } = useContext(GameContext);
    const finalMenuItems = getFilteredMenuItems(gameState);

    const handleMenutItemClick = (id: string) => {

        const itemClickData : MenuItemClickedDTO = {
            item_id   : id,
            player_id : null,
            game_code : null,
        };

        dispatch(GameAction.menuItemClicked(itemClickData));

        toggleMenuOpen();
    };

    return (
        <Menu
            onChange={toggleMenuOpen}
            opened={isMenuOpened}
            shadow='xl'>
            <Menu.Target >
                <Burger
                    aria-label='Toggle Main Menu'
                    color={CardColor.White}
                    onClick={toggleMenuOpen}
                    opened={isMenuOpened}
                    tabIndex={0}
                    size='lg' />
            </Menu.Target>
            <Menu.Dropdown >
                <>
                    {currentPlayer?.username &&
                        <Menu.Label>
                            <GameText>
                                {currentPlayer.username}
                            </GameText>
                        </Menu.Label>
                    }
                    <GameMenuItems
                        menuItems={finalMenuItems}
                        toggle={handleMenutItemClick} />
                </>
            </Menu.Dropdown>
        </Menu>
    );
};
