import type { Meta, StoryObj } from '@storybook/react';
import { GameFoe } from './index'; // Import the GameFoe component
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto'; // Import PlayerDTO

const meta: Meta<typeof GameFoe> = {
    title     : 'Game/GameFoe',
    component : GameFoe,
    tags      : ['autodocs'],
    argTypes  : {
        player : { control : 'object' }, // Control to allow input for the player object
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample player data
const samplePlayer = { ...PlayerDTO.Default, id : '1', username : 'OpponentPlayer' };

export const DefaultFoe: Story = {
    args : {
        player : samplePlayer, // Provide the sample player data
    },
};
