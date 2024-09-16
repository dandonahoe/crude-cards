import { GameMenuDropdown } from './GameMenuDropdown';
import { GameMenuBurger } from './GameMenuBurger';
import { useDisclosure } from '@mantine/hooks';
import { Menu } from '@mantine/core';

export const GameMenu = () => {

    const [opened, { toggle }] = useDisclosure();

    return (
        <Menu
            // position='top-end'
            opened={opened}
            onChange={toggle}
            shadow='xl'>
            <Menu.Target >
                <GameMenuBurger
                    opened={opened}
                    toggle={toggle} />
            </Menu.Target>

            <Menu.Dropdown >
                <GameMenuDropdown toggle={toggle} />
            </Menu.Dropdown>
        </Menu>

    );
};
