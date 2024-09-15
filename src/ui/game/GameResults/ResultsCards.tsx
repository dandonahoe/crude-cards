import { CardColor } from '../../../api/src/constant/card-color.enum';
import { ResultsCardsProps } from './type';
import { GameCardDTO } from '../GameCard';
import { RFC } from '@app/ui/type';


export const ResultsCards : RFC<ResultsCardsProps> = ({
    dealerCard, winnerCard, endMessage,
}) =>
    <>
        <GameCardDTO card={dealerCard} />
        <GameCardDTO card={winnerCard} />
        <GameCardDTO
            card={{
                color : CardColor.Black,
                text  : endMessage,
            }} />
    </>
