import type { Meta, StoryObj } from '@storybook/react';
import { GameGroup } from '.'; // Import the GameGroup component
import { GameText } from '../GameText'; // Import GameText for displaying sample text

const meta: Meta<typeof GameGroup> = {
    title     : 'Components/GameGroup',
    component : GameGroup,
    tags      : ['autodocs'],
    argTypes  : {
        children : { control : 'text' }, // Control for providing child elements
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultGroup: Story = {
    args : {
        children : (
            <>
                <GameText>{'Player 1'}</GameText>
                <GameText>{'Player 2'}</GameText>
            </>
        ), // Example of grouped text content
    },
};
