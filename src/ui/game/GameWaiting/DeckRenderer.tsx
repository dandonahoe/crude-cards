import { DeckRendererProps } from './type';
import { GameDeck } from '../GameDeck';

export const DeckRenderer: React.FC<DeckRendererProps> = ({
    isDealer, dealerDealtCard, playerDealtCard,
}) => {
    if (isDealer)
        return <GameDeck cards={[dealerDealtCard!]} />;

    return <GameDeck cards={[dealerDealtCard!, playerDealtCard!]} />;
};
