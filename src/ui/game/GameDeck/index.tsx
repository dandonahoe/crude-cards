import { GameCardList } from './GameCardList';
import { Stack } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeck: RFC<Props> = ({
    onCardClicked, cards,
}) =>
    <Stack
        justify='center'
        align='center'>
        <GameCardList
            onCardClicked={onCardClicked}
            cards={cards} />
    </Stack>
