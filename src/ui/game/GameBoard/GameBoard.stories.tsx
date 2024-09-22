import type { Meta, StoryObj } from '@storybook/react';
import { GameBoard } from './index'; // Import the GameBoard component
import { AppContext } from '../../AppContext'; // Import AppContext to simulate debugging mode

const meta: Meta<typeof GameBoard> = {
    title     : 'Game/GameBoard',
    component : GameBoard,
    tags      : ['autodocs'],
    argTypes  : {
        isDebugging : { control : 'boolean' }, // Control to toggle debugging mode
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultBoard: Story = {
    args : {},
};

export const DebugMode: Story = {
    args : {
        isDebugging : true, // Enable debugging mode
    },
    decorators : [
        Story => (
            <AppContext.Provider value={{ isDebugging : true }}>
                <Story />
            </AppContext.Provider>
        ),
    ],
};
