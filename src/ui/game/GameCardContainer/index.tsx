import { useHoverEffect } from './useHoverEffect';
import { GameCardContainerProps } from './type';
import { getCardStyles } from './cardStyles';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameCardContainer: RFC<GameCardContainerProps> = ({
    children, onClick, color,
    isClickable = false,
}) => {
    const { isHovered, refHover } = useHoverEffect();

    const { backgroundColor, boxShadow, border, cursor }
        = getCardStyles({ color, isHovered, isClickable });

    return (
        <Box
            className='game-card-container'
            ref={refHover}
            p='xl'
            m='xs'
            style={{
                backgroundColor,
                boxShadow,
                border,
                cursor,
            }}
            onClick={onClick}>
            {children}
        </Box>
    );
};
