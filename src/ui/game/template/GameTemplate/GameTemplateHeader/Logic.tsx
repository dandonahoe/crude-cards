import { CardDTO } from '../../../../../api/src/game/dtos/card.dto';


// Helper function to determine if the player should play a card
export const shouldPlayCard = (
    playerDealtCard: CardDTO | null, isDealer: boolean,
) => !playerDealtCard && !isDealer;

// Helper function to determine if the player is waiting
export const isPlayerWaiting = (
    playerDealtCard: CardDTO | null, isDealer: boolean,
) => playerDealtCard && !isDealer;
