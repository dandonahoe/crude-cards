import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameCardDTO } from '../../component/GameCard';
import { ResultsCardsProps } from './type';
import { RFC } from '@app/ui/type';


export const ResultsCards : RFC<ResultsCardsProps> = ({
    dealerCard, winnerCard, endMessage,
}) =>
    <>
        <GameCardDTO
            card={dealerCard}
            id='dealer-card'/>
        <GameCardDTO
            card={winnerCard}
            id='winner-card'/>
        <GameCardDTO
            id='message-card'
            card={{
                color : CardColor.Black,
                text  : endMessage,
            }} />
    </>
