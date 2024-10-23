import type { Meta, StoryObj } from '@storybook/react';
import { GameError } from '.';

const meta: Meta<typeof GameError> = {
    title     : 'Components/GameError',
    component : GameError,
    tags      : ['autodocs'],
    argTypes  : {
        children : { control : 'text' }, // Control to allow input for the error message
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultError: Story = {
    args : {
        children : 'An unexpected error occurred!', // Sample error message
    },
};
