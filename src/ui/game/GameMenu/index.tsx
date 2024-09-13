import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { getFilteredMenuItems } from './menuLogic';
import { useDispatch } from '@app/client/hook';
import { useDisclosure } from '@mantine/hooks';
import { GameMenuItem } from './GameMenuItem';
import { Burger, Menu } from '@mantine/core';
import { GameContext } from '../GameContext';
import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameMenu: RFC = () => {

    const { gameState, currentPlayer } = useContext(GameContext);
    const [opened, { toggle }] = useDisclosure();
    const dispatch = useDispatch();

    const handleClickMenu = (menuItemId: string): CA => {
        toggle();

        return dispatch(GameAction.menuItemClicked({
            game_code : gameState.game_code,
            player_id : gameState.current_player_id,
            item_id   : menuItemId,
        }));
    };

    const finalMenuItems = getFilteredMenuItems(gameState);

    return (
        <Menu
            opened={opened}
            onChange={toggle}
            shadow='xl'
            width={250}>
            <Menu.Target>
                <Burger
                    aria-label='Toggle Main Menu'
                    color={CardColor.White}
                    opened={opened}
                    tabIndex={0}
                    size='lg'/>
            </Menu.Target>
            <Menu.Dropdown>
                {currentPlayer?.username && (
                    <Menu.Label>
                        <GameText>
                            {currentPlayer?.username}
                        </GameText>
                    </Menu.Label>
                )}
                {finalMenuItems.map((item, index) => (
                    <GameMenuItem
                        key={`${index}-${item.id}`}
                        onClick={handleClickMenu}
                        icon={item.icon}
                        text={item.text}
                        id={item.id}/>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};
