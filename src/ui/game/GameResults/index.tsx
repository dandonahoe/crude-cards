import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardContainer } from '../GameCardContainer';
import { GameStatusTable } from '../GameStatusTable';
import { GameDeckLayout } from '../GameDeckLayout';
import { useViewportSize } from '@mantine/hooks';
import { Box, Flex, Text } from '@mantine/core';
import { useSelector } from '@app/client/hook';
import { GameCard } from '../GameCard';
import Confetti from 'react-confetti'
import { RFC } from '@app/ui/type';
import {
    selectPreviousHandDealerCard, selectPreviousHandWinnerCard,
    selectAllPlayerStatus,selectIsPlayerWinner,
} from '../../../client/selector/game';


export const GameResults : RFC = () => {

    const previousHandDealerCard = useSelector(selectPreviousHandDealerCard);
    const previousHandWinnerCard = useSelector(selectPreviousHandWinnerCard);
    const allPlayerStatus        = useSelector(selectAllPlayerStatus       );
    const isWinner               = useSelector(selectIsPlayerWinner        );

    const { height, width } = useViewportSize();

    return (
        <Flex
            justify='center'
            align='center'>
            {isWinner &&
                <Confetti
                    width={width}
                    height={height}/>
            }
            <GameDeckLayout
                color={CardColor.Black}
                cards={[
                    <GameCard
                        key='one'
                        card={previousHandDealerCard} />,
                    <GameCard
                        key='two'
                        card={previousHandWinnerCard} />,
                    <Box
                        mt='xl'
                        key='three'>
                        <GameCardContainer color={CardColor.Black}>
                            <Text
                                fz='sm'
                                ta='center'>
                                {'3 Points to Win'}
                            </Text>
                            <GameStatusTable
                                title='Scoreboard'
                                playerStatusList={allPlayerStatus!}
                                shouldShowDone={false}
                                shouldShowScore={true} />
                        </GameCardContainer>
                    </Box>,
                ]} />
        </Flex>
    );
}
