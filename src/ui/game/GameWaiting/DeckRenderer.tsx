import { GameDeck } from '../GameDeck';
import { DeckRendererProps } from './type';

export const DeckRenderer: React.FC<DeckRendererProps> = ({ isDealer, dealerDealtCard, playerDealtCard }) => {
    if (isDealer)
        return <GameDeck cards={[dealerDealtCard!]} />;

    return <GameDeck cards={[dealerDealtCard!, playerDealtCard!]} />;
};
