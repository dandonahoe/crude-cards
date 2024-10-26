import { MenuItemProps } from './type';
import { Menu } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameMenuItem : RFC<MenuItemProps> = ({
    onClick, id, text, icon,
}) =>
    <Menu.Item
        onClick={() => onClick?.(id)}
        leftSection={icon}>
        {text}
    </Menu.Item>

