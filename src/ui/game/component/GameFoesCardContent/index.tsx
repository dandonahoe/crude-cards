import { GameStackType } from '../GameStack/type';
import { GameContext } from '../../GameContext';
import { GameFoeList } from './GameFoeList';
import { FoeContent } from './FoeContent';
import { GameStack } from '../GameStack';
import { useContext } from 'react';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameFoesCardContent: RFC<Props> = ({ foes }) => {

    const { gameState } = useContext(GameContext);

    return (
        <GameStack type={GameStackType.Centered}>
            <FoeContent
                gameCode={gameState.game_code}
                foes={foes} />
            <GameFoeList foes={foes} />
        </GameStack>
    );
};
