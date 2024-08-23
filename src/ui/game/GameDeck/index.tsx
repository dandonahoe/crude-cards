import { GameWiggleBox } from '../GameWiggleBox';
import { GameCard } from '../GameCard';
import { Stack } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeck : RFC<Props> = ({
    onCardClicked, cards,
}) =>
    <Stack
        justify='center'
        align='center'>
        {cards.map((card, index) =>
            <GameWiggleBox
                index={index}
                key={index}>
                <GameCard
                    onClick={onCardClicked}
                    card={card} />
            </GameWiggleBox>,
        )}
    </Stack>
