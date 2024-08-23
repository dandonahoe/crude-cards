import { getBackgroundColor, getCardBorder, getCardTextColor } from './Logic';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import classes from './GameCardContainer.module.css';
import { useHover } from '@mantine/hooks';
import { Box, rem } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameCardContainer : RFC<Props> = ({
    children, color, onClick, isClickable = false,
}) => {

    const { hovered : isHovered, ref : refHover } = useHover();

    if(color === CardColor.Unknown) {
        if(onClick)
            return (
                <Box onClick={onClick}>
                    {children}
                </Box>
            );

        return children;
    }

    const colorNum = color === CardColor.Black ? 64 : 0;
    const alpha    = color === CardColor.Black ? 0.6 : 0.2;

    return (
        <Box
            className={classes.gameCard}
            c={getCardTextColor(color!)}
            ref={refHover}
            p='xl'
            m='xs'
            style={{
                backgroundColor : getBackgroundColor(color!, isHovered && onClick !== undefined),
                boxShadow       : `4px 4px 20px 14px  rgba(${colorNum}, ${colorNum}, ${colorNum}, ${alpha})`,
                maxWidth        : rem(400),
                border          : getCardBorder(color!),
                cursor          : isClickable ? 'pointer' : 'default',
            }}>
            {children}
        </Box>
    );
}

