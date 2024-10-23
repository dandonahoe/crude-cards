import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
import { GameCardType, OnClickCard } from '../../type';


export type Props = {
    hasHoverWiggle ?: boolean;
    isClickable    ?: boolean;
    cardType        : GameCardType;
    children        : React.ReactNode | React.ReactNode[];
    onClick        ?: OnClickCard;
    color          ?: CardColor;
    index          ?: number,
    card           ?: Partial<CardDTO>;
    id              : string;
};


export interface GameCardChildrenProps {
    hasWiggle   ?: boolean;
    children     : React.ReactNode | React.ReactNode[];
    onClick     ?: OnClickCard;
    color        : CardColor;
    id          ?: string;
}

export interface GameCardDTOProps {
    hasWiggle ?: boolean;
    onClick   ?: OnClickCard;
    card       : Partial<CardDTO>;
    id        ?: string;
}

export interface GameCardRawProps {
    hasWiggle ?: boolean;
    rawText    : string;
    onClick   ?: OnClickCard;
    color      : CardColor;
    id        ?: string;
}

export interface GameCardHtmlProps {
    hasWiggle ?: boolean;
    rawHtml    : string;
    onClick   ?: OnClickCard;
    color      : CardColor;
    id        ?: string;
}


export interface GameCardStackProps {
    hasWiggle ?: boolean;
    children   : React.ReactNode[];
    onClick   ?: OnClickCard;
    color      : CardColor;
    id        ?: string;
}

export interface CardCenteredProps {
    hasWiggle ?: boolean;
    children   : React.ReactNode | React.ReactNode[];
    onClick   ?: OnClickCard;
    color      : CardColor;
    id        ?: string;
}
