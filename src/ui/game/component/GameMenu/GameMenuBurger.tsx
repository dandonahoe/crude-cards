import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameMenuBurgerProps } from './type';
import { Burger } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameMenuBurger: RFC<GameMenuBurgerProps> = ({
    opened, toggle,
}) =>
    <Burger
        aria-label='Toggle Main Menu'
        color={CardColor.White}
        onClick={toggle}
        opened={opened}
        tabIndex={0}
        size='lg' />
