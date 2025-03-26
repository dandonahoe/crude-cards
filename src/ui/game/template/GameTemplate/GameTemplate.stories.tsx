import type { Meta, StoryObj } from '@storybook/react';
import { GameTemplate } from '.'; // Import the GameTemplate component

const meta: Meta<typeof GameTemplate> = {
    title     : 'Template/GameTemplate',
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
