import type { Meta, StoryObj } from '@storybook/react';
import { ShareCardContent } from '.'; // Import the ShareCardContent component

const meta: Meta<typeof ShareCardContent> = {
    title     : 'Components/ShareCardContent',
    component : ShareCardContent,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultShareCard: Story = {
    args : {
        gameCode  : 'ABCD1234', // Provide a sample game code for sharing
        shareText : 'Join the game using this code!', // Provide a sample share message
    },
};
