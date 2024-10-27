import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { SpecialId } from '../../../../constant/framework/SpecialId';
import { GameCardDTO } from '../../component/GameCard';
import { ResultsCardsProps } from './type';
import { RFC } from '@app/ui/type';


export const ResultsCards : RFC<ResultsCardsProps> = ({
    dealerCard, winnerCard, endMessage,
}) =>
    <>
        <GameCardDTO
            id={dealerCard.id ?? SpecialId.InvalidHash('dealer-card-id')}
            card={dealerCard} />
        <GameCardDTO
            id={winnerCard.id ?? SpecialId.InvalidHash('winner-card-id')}
            card={winnerCard} />
        <GameCardDTO
            id='end-message'
            card={{
                color : CardColor.Black,
                text  : endMessage,
                id    : 'end-message',
            }} />
    </>
