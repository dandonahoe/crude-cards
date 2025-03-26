import { PlayerDTO } from '../../../../api/src/game/dtos/player.dto';
import type { Meta, StoryObj } from '@storybook/react';
import { GameFoe } from '.';


const meta: Meta<typeof GameFoe> = {
    title     : 'Components/GameFoe',
    component : GameFoe,
    tags      : ['autodocs'],
    argTypes  : {
        player : { control : 'object' }, // Control to allow input for the player object
    },
};

export default meta;


type Story = StoryObj<typeof meta>;


const samplePlayer = { ...PlayerDTO.Default, id : '1', username : 'OpponentPlayer' };

export const DefaultFoe: Story = {
    args : {
        player : samplePlayer, // Provide the sample player data
    },
};
