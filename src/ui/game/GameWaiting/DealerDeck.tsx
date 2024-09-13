import { DealerDeckProps } from './type';
import { GameDeck } from '../GameDeck';
import { RFC } from '@app/ui/type';


export const DealerDeck: RFC<DealerDeckProps> = ({
    dealerDealtCard,
}) =>
    <GameDeck cards={[dealerDealtCard]} />
