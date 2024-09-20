import { EMPTY_FOES_MESSAGE } from './constant';
import { NoFoesMessageProps } from './type';
import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';

export const NoFoesMessage: RFC<NoFoesMessageProps> = ({
    gameCode,
}) => (
    <GameText>
        {`${EMPTY_FOES_MESSAGE} "${gameCode}"`}
    </GameText>
);
