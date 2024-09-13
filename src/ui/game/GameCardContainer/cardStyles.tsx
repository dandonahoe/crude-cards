import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardStylesProps } from './type';


export const getCardStyles = ({
    color, isHovered, isClickable,
}: CardStylesProps) => {

    const colorNum = color === CardColor.Black
        ? 64 : 0;

    const alpha    = color === CardColor.Black
        ? 0.6 : 0.2;

    return {
        backgroundColor : isHovered ? (color === CardColor.White ? '#ccc' : '#333') : color,
        boxShadow       : `4px 4px 20px 14px rgba(${colorNum}, ${colorNum}, ${colorNum}, ${alpha})`,
        border          : `3px solid ${color === CardColor.White ? CardColor.Black : CardColor.White}`,
        cursor          : isClickable ? 'pointer' : 'default',
    };
};
