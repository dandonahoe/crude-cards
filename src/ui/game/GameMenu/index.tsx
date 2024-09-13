import { GameMenuDropdown } from './GameMenuDropdown';
import { GameMenuBurger } from './GameMenuBurger';
import { useDisclosure } from '@mantine/hooks';
import { Menu } from '@mantine/core';
import { RFC } from '@app/ui/type';

export const GameMenu: RFC = () => {

    const [opened, { toggle }] = useDisclosure();

    return (
        <Menu
            opened={opened}
            onChange={toggle}
            shadow='xl'
            width={250}>
            <Menu.Target>
                <GameMenuBurger
                    opened={opened}
                    toggle={toggle} />
            </Menu.Target>
            <GameMenuDropdown toggle={toggle} />
        </Menu>
    );
};
