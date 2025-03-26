import type { Meta, StoryObj } from '@storybook/react';
import { UsernameCardContent } from '.';

const meta: Meta<typeof UsernameCardContent> = {
    title     : 'Components/UsernameCardContent',
    component : UsernameCardContent,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultUsernameCard: Story = {
    args : {},
};
