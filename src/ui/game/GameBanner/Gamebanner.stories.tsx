import { CardColor } from '../../../api/src/constant/card-color.enum';
import type { Meta, StoryObj } from '@storybook/react';
import { GameBanner } from './index';


const meta: Meta<typeof GameBanner> = {
    component : GameBanner,
    title     : 'Game/GameBanner',
    tags      : ['autodocs'],

    argTypes : {
        subtitle : { control : 'text' },
        text     : { control : 'text' },

        color : {
            control : { type : 'select' },
            options : Object.values(CardColor),
        },
    },
};

type Story = StoryObj<typeof meta>;

export const DefaultBanner: Story = {
    args : {
        subtitle : 'The best party game',
        color    : CardColor.White,
        text     : 'Welcome to CrudeCards',
    },
};


export default meta;
