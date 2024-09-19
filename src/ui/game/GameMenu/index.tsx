import { getFilteredMenuItems } from './menuLogic';
import { GameMenuItems } from './GameMenuItems';
import { useDisclosure } from '@mantine/hooks';
import { GameContext } from '../GameContext';
import { GameText } from '../GameText';
import { Burger, Menu } from '@mantine/core';
import { useContext } from 'react';
import { CardColor } from '../../../api/src/constant/card-color.enum';


export const GameMenu = () => {

    const [opened, { toggle }] = useDisclosure();

    const { gameState, currentPlayer } = useContext(GameContext);
    const finalMenuItems = getFilteredMenuItems(gameState);

    return (
        <Menu
            // position='top-end'
            opened={opened}
            onChange={toggle}
            shadow='xl'>
            <Menu.Target >
                <Burger
                    aria-label='Toggle Main Menu'
                    color={CardColor.White}
                    onClick={toggle}
                    opened={opened}
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
                        toggle={toggle} />
                </>
            </Menu.Dropdown>
        </Menu>

    );
};
