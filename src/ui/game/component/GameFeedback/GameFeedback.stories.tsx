import type { Meta, StoryObj } from '@storybook/react';
import { GameFeedback } from '.'; // Import the GameFeedback component

const meta: Meta<typeof GameFeedback> = {
    title     : 'Components/GameFeedback',
    component : GameFeedback,
    tags      : ['autodocs'],
    argTypes  : {
        onSubmit : { action : 'submitted' }, // Use action to log form submissions
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultFeedback: Story = {
    args : {
        onSubmit : (values : unknown) => alert(`Feedback submitted: ${JSON.stringify(values)}`), // Simulate form submission
    },
};
