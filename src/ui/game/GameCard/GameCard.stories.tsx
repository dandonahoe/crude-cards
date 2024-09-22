import { CardColor } from '../../../api/src/constant/card-color.enum';
import type { Meta, StoryObj } from '@storybook/react';
import { GameText } from '../GameText';
import { GameCardType } from '../type';
import { GameCard  } from './index';

const meta: Meta<typeof GameCard> = {
    title     : 'Game/GameCard',
    component : GameCard,
    tags      : ['autodocs'],
    argTypes  : {
        cardType : {
            control : { type : 'select' },
            options : Object.values(GameCardType), // Select from GameCardType enum
        },
        color : {
            control : { type : 'select' },
            options : Object.values(CardColor), // Use CardColor enum
        },
        children : {
            control : 'text', // Children text content
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCard: Story = {
    args : {
        cardType : GameCardType.Children, // Default card type
        color    : CardColor.Black, // Default color
        children : <GameText>{'Default Card Content'}</GameText>, // Sample content
    },
};

export const RawCard: Story = {
    args : {
        cardType : GameCardType.Raw, // Raw card type
        color    : CardColor.White, // White card
        children : 'Raw HTML content goes here', // Raw HTML
    },
};

export const HtmlCard: Story = {
    args : {
        cardType : GameCardType.Html, // HTML card type
        color    : CardColor.Black, // Black card
        children : '<strong>Bold HTML Content</strong>', // Rendered HTML content
    },
};
