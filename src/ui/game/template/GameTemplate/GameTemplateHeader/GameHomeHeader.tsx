import { GameBoardContext } from '../../../../GameBoardContext';
import { CardColor } from '../../../../../api/src/constant/card-color.enum';
import { GameCardDTO } from '@app/ui/game/component/GameCard';
import { Flex } from '@mantine/core';
import { useContext } from 'react';


export const GameHomeHeader = () => {

    const { gameStateDTO : { error_message } } = useContext(GameBoardContext);

    if(!error_message)
        return null;

    return (
        <Flex
            justify='center'
            align='center'>
            <GameCardDTO
                id='header-error-message'
                card={{
                    color : CardColor.Black,
                    text  : error_message,
                    id    : 'header-error-message',
            }} />
        </Flex>
    );
}
