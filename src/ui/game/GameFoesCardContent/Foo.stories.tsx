/**
 * Storybook stories for GameFoesCardContent component
 *
 * Description:
 * This file contains Storybook stories for the GameFoesCardContent
 * component, showcasing different states of the content based on the number of players (foes).
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameFoesCardContent" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameFoesCardContent } from '.';
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';

// Default export containing Storybook metadata
const meta: Meta<typeof GameFoesCardContent> = {
    title     : 'Game/GameFoesCardContent',
    component : GameFoesCardContent,
};

export default meta;

type Story = StoryObj<typeof GameFoesCardContent>;

// Mock data for foes
const mockFoes = [
    { ...PlayerDTO.Default, id : '1', username : 'Player1' },
    { ...PlayerDTO.Default, id : '2', username : 'Player2' },
];

// Story: Default Game Foes Card Content with no foes
export const NoFoes: Story = {
    args : {
        foes : [],
    },
    render : args => <GameFoesCardContent {...args} />,
};

// Story: Game Foes Card Content with a few foes
export const FewFoes: Story = {
    args : {
        foes : mockFoes,
    },
    render : args => <GameFoesCardContent {...args} />,
};

// Story: Game Foes Card Content with more foes
export const MultipleFoes: Story = {
    args : {
        foes : [
            ...mockFoes,
            { ...PlayerDTO.Default, id : '3', username : 'Player3' },
            { ...PlayerDTO.Default, id : '4', username : 'Player4' },
        ],
    },
    render : args => <GameFoesCardContent {...args} />,
};
