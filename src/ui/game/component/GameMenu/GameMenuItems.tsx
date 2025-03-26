import { GameMenuItem } from './GameMenuItem';
import { GameMenuItemsProps } from './type';
import { RFC } from '@app/ui/type';


export const GameMenuItems: RFC<GameMenuItemsProps> = ({
    menuItems, toggle,
}) => menuItems.map((item, index) =>
    <GameMenuItem
        onClick={() => toggle(item.id)}
        key={`${index}-${item.id}`}
        icon={item.icon}
        text={item.text}
        id={item.id}/>)
