import { getBackgroundColor, getCardBorder, getCardTextColor } from './Logic';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import classes from './GameCard.module.css';
import { useHover } from '@mantine/hooks';
import { Box, rem } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameCard: RFC<Props> = ({
    card, onClick,
}) => {
    const { hovered: isHovered, ref: refHover } = useHover();

    if (!card) return '[NULL CARD]';

    const { color, text } = card;

    const handleSelectBlackCard = () => {
        if (onClick)
            onClick(card);
    }

    const colorNum = color === CardColor.Black ? 64 : 0;
    const alpha = color === CardColor.Black ? 0.6 : 0.2;

    /* eslint-disable key-spacing */

    return (
        <Box
            onClick={handleSelectBlackCard}
            className={classes.gameCard}
            ref={refHover}
            p='xl'
            style={{
                backgroundColor: getBackgroundColor(color!, isHovered && onClick !== undefined),
                boxShadow: `4px 4px 20px 14px  rgba(${colorNum}, ${colorNum}, ${colorNum}, ${alpha})`,
                maxWidth: rem(400),
                border: getCardBorder(color!),
            }}>
            <div
                dangerouslySetInnerHTML={{ __html : text ?? '[MISSING TEXT]' }}
                style={{
                    color : getCardTextColor(color!),
                    fontWeight : 600,
                }} />
        </Box>
    );

    /* eslint-enable key-spacing */
}
