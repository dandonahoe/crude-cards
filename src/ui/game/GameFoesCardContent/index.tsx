import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameDeckLayout } from '../GameDeckLayout';
import { GameStackType } from '../GameStack/type';
import { NoFoesMessage } from './NoFoesMessage';
import { GameContext } from '../GameContext';
import { GameFoeList } from './GameFoeList';
import { GameStack } from '../GameStack';
import { useContext } from 'react';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameFoesCardContent: RFC<Props> = ({ foes }) => {

    const { gameState } = useContext(GameContext);

    return (
        <GameStack type={GameStackType.Centered}>
            {foes.length === 0
                ? <NoFoesMessage gameCode={gameState.game_code} />
                : (
                    <GameDeckLayout
                        color={CardColor.Black}
                        cards={[]} />
                )
            }
            <GameFoeList foes={foes} />
        </GameStack>
    );
};
