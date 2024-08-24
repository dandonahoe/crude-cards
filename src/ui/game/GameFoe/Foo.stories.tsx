
/**
 * Storybook stories for GameFoe component
 *
 * Description:
 * This file contains Storybook stories for the GameFoe component, showcasing different player username displays.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameFoe" to view these stories in the Storybook UI.
 */

import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';
import { Meta, StoryObj } from '@storybook/react';
import { GameFoe } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameFoe> = {
    title     : 'Game/GameFoe',
    component : GameFoe,
};

export default meta;

type Story = StoryObj<typeof GameFoe>;

// Mock data for player
const mockPlayer : PlayerDTO = {
    ...PlayerDTO.Default,
    username : 'Player1',
};

// Story: Default Game Foe with a sample player username
export const Default: Story = {
    args : {
        player : mockPlayer,
    },
    render : args => <GameFoe {...args} />,
};

// Story: Game Foe with a different player username
export const DifferentPlayer: Story = {
    args : {
        player : {
            ...PlayerDTO.Default,
            username : 'Player2',
        },
    },
    render : args => <GameFoe {...args} />,
};

// Story: Game Foe with a very long username
export const LongUsername: Story = {
    args : {
        player : {
            ...PlayerDTO.Default,
            username : 'ThisIsAReallyLongUsernameForTesting',
        },
    },
    render : args => <GameFoe {...args} />,
};
