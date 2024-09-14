import { GameMenuDropdown } from './GameMenuDropdown';
import { GameMenuBurger } from './GameMenuBurger';
import { useDisclosure } from '@mantine/hooks';
import { Menu } from '@mantine/core';
import { RFC } from '@app/ui/type';

export const GameMenu: RFC = () => {

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
