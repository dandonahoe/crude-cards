import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameDeckLayout } from '../GameDeckLayout';
import { NoFoesMessage } from "./NoFoesMessage";
import { hasNoFoes } from "./helperFunctions";
import { FoeContentProps } from "./type";
import { RFC } from '../../type';


export const FoeContent : RFC<FoeContentProps> = ({
    gameCode, foes,
}) => {
    if (hasNoFoes(foes))
        return <NoFoesMessage gameCode={gameCode} />;

    return <GameDeckLayout
        color={CardColor.Black}
        cards={[]}
        id='foes' />;
};
