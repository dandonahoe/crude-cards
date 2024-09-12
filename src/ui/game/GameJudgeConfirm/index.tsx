import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { Box, CloseButton, Flex } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameCard } from '../GameCard';
import { RFC } from '@app/ui/type';


export const GameJudgeConfirm : RFC = () => {

    const handleClick = () : void => {
    }

    return (
        <Box>
            <CloseButton />
            <GameBanner
                color={CardColor.Black}
                subtitle='Confirm Your Winner'
                text='Choosing' />
            <GameCard
                card={{
                    ...CardDTO.Default,
                    color : CardColor.Black,
                    text  : 'The Loch Ness Monster',
                }} />
            <GameCard
                card={{
                    ...CardDTO.Default,
                    color : CardColor.White,
                    text  : 'A Hello message 123',
                }} />
            <Flex
                mt='xl'
                mb='xl'
                align='center'
                justify='center'>
                <GameButton
                    onClick={handleClick}
                    text='Pick' />
            </Flex>
        </Box>
    );
}

