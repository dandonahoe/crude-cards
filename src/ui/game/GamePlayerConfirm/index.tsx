import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { Box, CloseButton, Flex } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameCard } from '../GameCard';
import { RFC } from '@app/ui/type';


export const GamePlayerConfirm : RFC = () => {

    const handleClick = () : void => {
    }

    return (
        <Box>
            <CloseButton />
            <GameBanner
                color='#000'
                subtitle='Confirm Your Choice'
                text='Play this?' />
            <GameCard
                card={{
                    ...CardDTO.Default,
                    color : CardColor.Black,
                    text  : 'Doing the Hustle',
                }} />
            <GameCard
                card={{
                    ...CardDTO.Default,
                    color : CardColor.Black,
                    text  : 'Doing the Hustle',
                }} />
            <Flex
                mt='xl'
                align='center'
                justify='center'>
                <GameButton
                    onClick={handleClick}
                    text='Yep' />
            </Flex>
        </Box>
    );
}

