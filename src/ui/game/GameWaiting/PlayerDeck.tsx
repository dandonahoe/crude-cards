import { PlayerDeckProps } from './type';
import { GameDeck } from '../GameDeck';
import { RFC } from '@app/ui/type';


export const PlayerDeck: RFC<PlayerDeckProps> = ({
    dealerDealtCard, playerDealtCard,
}) => (
    <GameDeck cards={[dealerDealtCard, playerDealtCard]} />
);
