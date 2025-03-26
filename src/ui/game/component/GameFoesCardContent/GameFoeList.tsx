import { GameStackType } from '../GameStack/type';
import { GameFoeListProps } from './type';
import { GameStack } from '../GameStack';
import { GameFoe } from '../GameFoe';
import { RFC } from '@app/ui/type';


export const GameFoeList: RFC<GameFoeListProps> = ({ foes }) =>
    <GameStack type={GameStackType.Centered}>
        {foes.map(player =>
            <GameFoe
                player={player}
                key={player.id} />,
        )}
    </GameStack>
