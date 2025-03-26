import { MenuItemProps } from './type';
import { Menu } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameMenuItem : RFC<MenuItemProps> = ({
    onClick, id, text, icon,
}) => {

    const onClickItem = () : void => onClick(id);

    return (
        <Menu.Item
            onClick={onClickItem}
            leftSection={icon}>
            {text}
        </Menu.Item>
    );
};

