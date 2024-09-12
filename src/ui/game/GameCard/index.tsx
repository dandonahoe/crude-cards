import { CardColor } from '../../../api/src/constant/card-color.enum';
import { getBackgroundColor, getCardBorder } from './Logic';
import classes from './GameCard.module.css';
import { GameTextCard } from '../GameText';
import { useHover } from '@mantine/hooks';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameCard: RFC<Props> = ({
    card, onClick,
}) => {
    const { hovered: isHovered, ref: refHover } = useHover();

    if (!card) return '[NULL CARD]';

    const { color, text } = card;

    const handleSelectBlackCard = () => {
        if (onClick) onClick(card);
    }

    const colorNum = color === CardColor.Black ? 64 : 0;
    const alpha    = color === CardColor.Black ? 0.6 : 0.2;


    return (
        <Box
            onClick={handleSelectBlackCard}
            className={classes.gameCard}
            ref={refHover}
            p='xl'
            style={{
                backgroundColor : getBackgroundColor(color!, isHovered && onClick !== undefined),
                boxShadow       : `4px 4px 20px 14px  rgba(${colorNum}, ${colorNum}, ${colorNum}, ${alpha})`,
                border          : getCardBorder(color!),
            }}>
            <GameTextCard>
                {text}
            </GameTextCard>
        </Box>
    );


}
