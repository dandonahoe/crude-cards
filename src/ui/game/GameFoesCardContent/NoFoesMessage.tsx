import { NoFoesMessageProps } from './type';
import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';


export const NoFoesMessage: RFC<NoFoesMessageProps> = ({
    gameCode,
}) =>
    <GameText>
        {`No Players Yet, Share Game Code "${gameCode}" to Invite People`}
    </GameText>;
