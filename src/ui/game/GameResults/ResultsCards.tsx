import { CardColor } from '../../../api/src/constant/card-color.enum';
import { ResultsCardsProps } from './type';
import { GameCard } from '../GameCard';
import { RFC } from '@app/ui/type';


export const ResultsCards : RFC<ResultsCardsProps> = ({
    dealerCard, winnerCard, endMessage,
}) =>
    <>
        <GameCard
            key='moe'
            card={dealerCard} />
        <GameCard
            key='larry'
            card={winnerCard} />
        <GameCard
            key='curly'
            card={{
                color : CardColor.Black,
                text  : endMessage,
                id    : 'session-end' }} />
    </>
