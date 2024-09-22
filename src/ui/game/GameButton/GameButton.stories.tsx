import type { Meta, StoryObj } from '@storybook/react';
import { GameButton } from './index'; // Import the GameButton component

const meta: Meta<typeof GameButton> = {
    title     : 'Game/GameButton',
    component : GameButton,
    tags      : ['autodocs'],
    argTypes  : {
        text    : { control : 'text' }, // Text displayed on the button
        onClick : { action : 'clicked' }, // Action logger for Storybook
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
    args : {
        text : 'ClickD', // Default button text
    },
};

export const LargeButton: Story = {
    args : {
        text : 'ClickL',
    },
};
