import { CardColor } from '../../../../api/src/constant/card-color.enum';

export const getBackgroundColor = (color: CardColor): string =>
    color === CardColor.Black ? '#000' : '#fff';

