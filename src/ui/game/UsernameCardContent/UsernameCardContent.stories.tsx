import type { Meta, StoryObj } from '@storybook/react';
import { UsernameCardContent } from './index'; // Import the UsernameCardContent component

const meta: Meta<typeof UsernameCardContent> = {
    title     : 'Game/UsernameCardContent',
    component : UsernameCardContent,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultUsernameCard: Story = {
    args : {},
};
