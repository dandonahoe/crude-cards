import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { getBackgroundColor, getCardBorder } from './Logic';
import renderHtmlAsReact from 'html-react-parser';
import { Box, Center, rem } from '@mantine/core';
import { GameWiggleBox } from '../GameWiggleBox';
import classes from './GameCard.module.css';
import { useHover } from '@mantine/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { GameStack } from '../GameStack';
import { GameCardType } from '../type';
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
    id,    cardType,  children,
    color, onClick,   card,
    hasHoverWiggle = true,
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

    const renderCardWiggle = (
        cardContent : ReactNode | ReactNode[],
    ) =>
        !hasHoverWiggle
            ? cardContent
            : (
                <GameWiggleBox index={0}>
                    {cardContent}
                </GameWiggleBox>
            );

    const renderCardContainer = (
        cardContent : ReactNode | ReactNode[],
    ) =>
        <Box
            style={{
                backgroundColor : getBackgroundColor(color!, isHovered && onClick !== undefined),
                boxShadow       : `4px 4px 20px 14px  rgba(${colorNum}, ${colorNum}, ${colorNum}, ${alpha})`,
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
            return renderCardWiggle(
                renderCardContainer(children));

        case GameCardType.Stack:
            return renderCardWiggle(
                renderCardContainer(
                    <GameStack>
                        {children}
                    </GameStack>,
                ));

        case GameCardType.Centered:
            return renderCardWiggle(
                renderCardContainer(
                    <Center>
                        {children}
                    </Center>,
                ));

        case GameCardType.Raw:
            return renderCardWiggle(
                renderCardContainer(
                    children,
                ));

        case GameCardType.Html:
            return renderCardWiggle(
                renderCardContainer(
                    renderHtmlAsReact(children as string),
                ));

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
            cardType={GameCardType.Centered}
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
