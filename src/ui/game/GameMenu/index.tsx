import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { Burger, Menu, Text } from '@mantine/core';
import { MenuItem, MenuItems } from './constant';
import { useDispatch } from '@app/client/hook';
import { useDisclosure } from '@mantine/hooks';
import { GameMenuItem } from './GameMenuItem';
import { GameContext } from '../GameContext';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameMenu : RFC = () => {

    const dispatch = useDispatch();
    const { gameState, currentPlayer } = useContext(GameContext);
    // const { isPhone } = useContext(App);

    const [opened, { toggle }] = useDisclosure();

    const handleClickMenu = (menuItemId : string) : CA => {
        toggle();

        return dispatch(GameAction.menuItemClicked({
            game_code : gameState.game_code,
            player_id : gameState.current_player_id,
            item_id   : menuItemId,
        }));
    }

    let FinalMenuItemList = MenuItems;

    // if they're not in a game, drop "Leave" from the menu
    if(gameState.game_stage === GameStage.Home)
        FinalMenuItemList = MenuItems.filter(
            item => item.id !== MenuItem.Leave && item.id !== MenuItem.Scoreboard);

    return (
        (<Menu
            opened={opened}
            onChange={toggle}
            shadow='xl'
            width={250}>
            <Menu.Target>
                <Burger
                    tabIndex={0}
                    aria-label='Toggle Main Menu'
                    opened={opened}
                    color='#fff'
                    size='lg' />
            </Menu.Target>
            <Menu.Dropdown>
                {currentPlayer?.username &&
                    <Menu.Label>
                        <Text
                            fz='xs'
                            fw={600}>
                            {currentPlayer?.username}
                        </Text>
                    </Menu.Label>
                }
                {FinalMenuItemList.map((item, index) =>
                    <GameMenuItem
                        key={`${index}-${item.id}`}
                        onClick={handleClickMenu}
                        icon={item.icon}
                        text={item.text}
                        id={item.id} />,
                )}
            </Menu.Dropdown>
        </Menu>)
    );
};

