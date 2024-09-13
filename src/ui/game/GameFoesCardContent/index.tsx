import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameDeckLayout } from '../GameDeckLayout';
import { NoFoesMessage } from './NoFoesMessage';
import { GameContext } from '../GameContext';
import { GameFoeList } from './GameFoeList';
import { Stack } from '@mantine/core';
import { useContext } from 'react';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameFoesCardContent: RFC<Props> = ({
    foes,
}) => {
    const { gameState } = useContext(GameContext);

    return (
        <Stack
            justify='center'
            align='center'
            mt='xl'
            mb='xl'>
            {foes.length === 0 ? (
                <NoFoesMessage gameCode={gameState.game_code} />
            ) : (
                <GameDeckLayout
                    color={CardColor.Black}
                    cards={[]} />
            )}
            <GameFoeList foes={foes} />
        </Stack>
    );
};
