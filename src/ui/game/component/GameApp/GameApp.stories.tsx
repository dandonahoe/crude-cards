import type { Meta, StoryObj } from '@storybook/react';
import { GameApp } from '.';


const meta: Meta<typeof GameApp> = {
    component : GameApp,
    title     : 'Components/GameApp',
    tags      : ['autodocs'],

    argTypes : {
        id : { control : 'text' },
    },
};

type Story = StoryObj<typeof meta>;

export const DefaultBanner: Story = {
    args : {
        id : 'The best party game',
    },
};


export default meta;
