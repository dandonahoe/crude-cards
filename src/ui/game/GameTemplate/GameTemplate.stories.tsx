import type { Meta, StoryObj } from '@storybook/react';
import { GameTemplate } from './index'; // Import the GameTemplate component

const meta: Meta<typeof GameTemplate> = {
    title     : 'Game/GameTemplate',
    component : GameTemplate,
    tags      : ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTemplate: Story = {
    args : {
        children : (
            <div>
                <p>{"This is the game content wrapped by GameTemplate"}</p>
            </div>
        ),
    },
};
