/**
 * Storybook stories for GameComplete component
 *
 * Description:
 * This file contains Storybook stories for the GameComplete component, showcasing different game completion scenarios.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameComplete" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameComplete } from '.';
// import { Box, Button, Center, Flex, Stack, Text } from '@mantine/core';
// import { GameStatusTable } from '../GameStatusTable';
// import { IconArrowRight } from '@tabler/icons-react';
// import { useViewportSize } from '@mantine/hooks';
// import Confetti from 'react-confetti';
// import classes from './GameComplete.module.css';

// Default export containing Storybook metadata
const meta: Meta<typeof GameComplete> = {
    title     : 'Game/GameComplete',
    component : GameComplete,
};

export default meta;

type Story = StoryObj<typeof GameComplete>;

// Mock data for stories
const mockAllPlayerStatus = [
    { username : 'Player1', score : 42, isDone : false },
    { username : 'Player2', score : 38, isDone : false },
    { username : 'Player3', score : 25, isDone : false },
];

const mockGameChampion = { username : 'Player1' };
const mockIsWinner = true;

// Template to use mock data for the GameComplete component
// const Template: Story = args => (
//     <GameComplete {...args} />
// );

// Story: Default Game Complete screen (winner)
export const Default: Story = {
    args : {
        allPlayerStatus : mockAllPlayerStatus,
        gameChampion    : mockGameChampion,
        isWinner        : mockIsWinner,
    },
};

// Story: Game Complete screen without a winner
export const NoWinner: Story = {
    args : {
        allPlayerStatus : mockAllPlayerStatus,
        gameChampion    : null,
        isWinner        : false,
    },
};

// Story: Game Complete screen with all players done
export const AllPlayersDone: Story = {
    args : {
        allPlayerStatus : mockAllPlayerStatus.map(player => ({
            ...player,
            isDone : true,
        })),
        gameChampion : mockGameChampion,
        isWinner     : mockIsWinner,
    },
};
