import { CardColor } from '../../../api/src/constant/card-color.enum';
import { selectGameResults } from '../../../client/selector/game';
import { ScoreboardSection } from './ScoreboardSection';
import { GameDeckLayout } from '../GameDeckLayout';
import { GameStackType } from '../GameStack/type';
import { useViewportSize } from '@mantine/hooks';
import { useSelector } from '@app/client/hook';
import { ResultsCards } from './ResultsCards';
import { GameStack } from '../GameStack';
import Confetti from 'react-confetti';

export const GameResults = () => {

    const {
        sessionEndMessage, allPlayerStatus, isPlayerWinner,
        previousHandDealerCard, previousHandWinnerCard,
    } = useSelector(selectGameResults);

    const { height, width } = useViewportSize();

    return (
        <GameStack type={GameStackType.Centered}>
            {isPlayerWinner &&
                <Confetti
                    height={height}
                    width={width} />
            }
            <GameDeckLayout
                id='game-results'
                color={CardColor.Black}
                cards={[
                    <ResultsCards
                        key='uno'
                        dealerCard={previousHandDealerCard}
                        winnerCard={previousHandWinnerCard}
                        endMessage={sessionEndMessage} />,
                    <ScoreboardSection
                        key='dos'
                        playerStatus={allPlayerStatus} />,
                ]} />
        </GameStack>
    );
};
