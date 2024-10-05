import type { Meta, StoryObj } from '@storybook/react';
import { GameTimeout } from '.'; // Import the GameTimeout component

const meta: Meta<typeof GameTimeout> = {
    title     : 'Screens/GameTimeout',
    component : GameTimeout,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTimeout: Story = {
    args : {},
};
