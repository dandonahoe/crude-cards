import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameContext } from '../../GameContext';
import { GameCardDTO } from '../../GameCard';
import { Flex } from '@mantine/core';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const GameHomeHeader : RFC = () => {

    const { gameState : { error_message } } = useContext(GameContext);

    if(!error_message) return null;

    return (
        <Flex
            justify='center'
            align='center'>
            {'hello?'}
            {GameHomeHeader.displayName}
            <GameCardDTO
                card={{
                color : CardColor.Black,
                text  : error_message,
            }} />
        </Flex>
    );
}
