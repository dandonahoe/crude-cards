import { CardColor } from '../../../api/src/constant/card-color.enum';


export const getBackgroundColor = (
    color     : CardColor,
    isHovered : boolean,
) : string => {

    if (isHovered) {
        if (color === CardColor.White) return '#ccc';
        if (color === CardColor.Black) return '#333';
    }

    return color;
};


export const getCardBorder = (color : CardColor) : string =>
    `4px solid ${color === CardColor.White ? CardColor.Black : CardColor.White}`

export const getCardTextColor = (color : CardColor) : CardColor =>
    color === CardColor.White ? CardColor.Black : CardColor.White;
