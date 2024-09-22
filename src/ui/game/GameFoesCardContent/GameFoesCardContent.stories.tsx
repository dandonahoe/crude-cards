import type { Meta, StoryObj } from '@storybook/react';
import { GameFoesCardContent } from './index'; // Import the GameFoesCardContent component
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto'; // Import PlayerDTO

const meta: Meta<typeof GameFoesCardContent> = {
    title     : 'Game/GameFoesCardContent',
    component : GameFoesCardContent,
    tags      : ['autodocs'],
    argTypes  : {
        foes : { control : 'object' }, // Control to input the foes (players)
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample foes (opponents) data
const sampleFoes = [
    { ...PlayerDTO.Default, id : '1', username : 'Foe 1' },
    { ...PlayerDTO.Default, id : '2', username : 'Foe 2' },
];

export const FoesPresent: Story = {
    args : {
        foes : sampleFoes, // Display a list of foes
    },
};

export const NoFoes: Story = {
    args : {
        foes : [], // No foes, show "No Foes" message
    },
};
