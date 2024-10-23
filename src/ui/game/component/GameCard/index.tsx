import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
import { getBackgroundColor, getCardBorder } from './Logic';
import renderHtmlAsReact from 'html-react-parser';
import { Box, Center, rem } from '@mantine/core';
import classes from './GameCard.module.css';
import { useHover } from '@mantine/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { GameCardType } from '../../type';
import { GameStack } from '../GameStack';
import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';
import { ReactNode } from 'react';
import {
    GameCardStackProps, GameCardDTOProps,
    GameCardRawProps, GameCardHtmlProps,
    CardCenteredProps, Props,
    GameCardChildrenProps,
} from './type';


export const GameCard: RFC<Props> = ({
    id, cardType, children, color, onClick, card,
}) => {
    const { hovered: isHovered, ref: refHover } = useHover();

    const debugString = `color: ${color}, onClick: ${onClick}, id: ${id}`;

    if (color === CardColor.Unknown)
        throw new Error(`Card color is unknown: ${debugString}`);

    const colorNum = color === CardColor.Black ? 64 : 0;
    const alpha    = color === CardColor.Black ? 0.6 : 0.2;

    const handleClickCard = (evt : React.MouseEvent<HTMLDivElement>) => {

        if(!onClick) throw new Error(`onClick is not defined: ${debugString}`);

        evt.stopPropagation();

        onClick(id, { ...CardDTO.Default, ...card });
    };

    const renderCardContainer = (
        id : string,
        cardContent : ReactNode | ReactNode[],
    ) =>
        <Box
            style={{
                backgroundColor : getBackgroundColor(color!, isHovered && onClick !== undefined),
                boxShadow       : `4px 4px 20px 14px rgba(${colorNum}, ${colorNum}, ${colorNum}, ${alpha})`,
                maxWidth        : rem(400),
                border          : getCardBorder(color!),
            }}
            onClick={onClick
                ? handleClickCard
                : undefined
            }
            className={classes.gameCard}
            ref={refHover}
            id={id}
            p='xl'
            m='xs'>
            {cardContent}
        </Box>

    switch(cardType){
        case GameCardType.Children:
            return renderCardContainer(id, children);

        case GameCardType.Stack:
            return renderCardContainer(id,
                <GameStack>
                    {children}
                </GameStack>,
            );

        case GameCardType.Centered:
            return renderCardContainer(id,
                <Center>
                    {children}
                </Center>,
            );

        case GameCardType.Raw:
            return renderCardContainer(id, children);

        case GameCardType.Html:
            return renderCardContainer(id,
                renderHtmlAsReact(children as string),
            );

            default:
                throw new Error(`Unknown card type: ${cardType}`);
        }
}


export const GameCardChildren: RFC<GameCardChildrenProps> = ({
    children, color, onClick, id,
}) =>
    <GameCard
        cardType={GameCardType.Children}
        id={id ?? nanoid()}
        onClick={onClick}
        color={color}>
        {children}
    </GameCard>


export const GameCardDTO: RFC<GameCardDTOProps> = ({
    card, onClick, id,
}) => {

    if(!card.color || !card.text)
        throw new Error(`Card color or text is not defined: ${card}`);

    return (
        <GameCard
            id={id ?? nanoid()}
            color={card.color}
            onClick={onClick}
            cardType={GameCardType.Children}>
            <GameText>
                {card.text}
            </GameText>
        </GameCard>
    );
}

export const GameCardRaw: RFC<GameCardRawProps> = ({
    rawText, color, onClick, id,
}) => {
    return (
        <GameCard
            cardType={GameCardType.Raw}
            id={id ?? nanoid()}
            onClick={onClick}
            color={color}>
            {rawText}
        </GameCard>
    );
}

export const GameCardHtml: RFC<GameCardHtmlProps> = ({
    rawHtml, color, onClick, id,
}) => {
    return (
        <GameCard
            cardType={GameCardType.Html}
            id={id ?? nanoid()}
            onClick={onClick}
            color={color}>
            {rawHtml}
        </GameCard>
    );
}

export const GameCardStack: RFC<GameCardStackProps> = ({
    children, color, onClick, id,
}) => {
    return (
        <GameCard
            cardType={GameCardType.Stack}
            id={id ?? nanoid()}
            onClick={onClick}
            color={color}>
            {children}
        </GameCard>
    );
}

export const GameCardCentered: RFC<CardCenteredProps> = ({
    children, color, onClick, id,
}) => {
    return (
        <GameCard
            cardType={GameCardType.Raw}
            id={id ?? nanoid()}
            onClick={onClick}
            color={color}>
            {children}
        </GameCard>
    );
}
