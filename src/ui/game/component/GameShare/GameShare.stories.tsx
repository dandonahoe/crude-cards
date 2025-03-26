import type { Meta, StoryObj } from '@storybook/react';
import { GameShare } from '.'; // Import the GameShare component

const meta: Meta<typeof GameShare> = {
    title     : 'Components/GameShare',
    component : GameShare,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultShare: Story = {
    args : {},
};
