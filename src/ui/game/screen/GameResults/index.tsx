import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameDeckLayout } from '../../component/GameDeckLayout';
import { GameStackType } from '../../component/GameStack/type';
import { selectGameResults } from '@app/client/selector/game';
import { ScoreboardSection } from './ScoreboardSection';
import { GameStack } from '../../component/GameStack';
import { useViewportSize } from '@mantine/hooks';
import { useSelector } from '@app/client/hook';
import { ResultsCards } from './ResultsCards';
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
