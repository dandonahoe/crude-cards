import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { Box, CloseButton, Flex } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameCard } from '../GameCard';
import { RFC } from '@app/ui/type';


export const GameDealerConfirm : RFC = () => {

    const handleConfirm = () : void =>{
    }

    return (
        <Box>
            <CloseButton />
            <GameBanner
                subtitle='You are Dealer'
                text='Deal this?'
                color='#000' />
            <GameCard
                card={{
                    ...CardDTO.Default,
                    color : CardColor.Black,
                    text  : 'Deal',
                }} />
            <Flex
                justify='center'
                align='center'
                mt='xl'
                mb='lg'>
                <GameButton
                    onClick={handleConfirm}
                    text='Yep' />
            </Flex>
        </Box>
    );
}

