import type { Meta, StoryObj } from '@storybook/react';
import { GameStack } from './index'; // Import the GameStack component
import { GameStackType } from './type'; // Import the stack type enum
import { GameText } from '../GameText'; // Import GameText for sample content

const meta: Meta<typeof GameStack> = {
    title     : 'Game/GameStack',
    component : GameStack,
    tags      : ['autodocs'],
    argTypes  : {
        type : {
            control : { type : 'select' }, // Select control to choose stack type
            options : Object.values(GameStackType), // Options from the GameStackType enum
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultStack: Story = {
    args : {
        type     : GameStackType.Default, // Default stack type
        children : (
            <>
                <GameText>{'This is item 1 in the stack'}</GameText>
                <GameText>{'This is item 2 in the stack'}</GameText>
            </>
        ),
    },
};

export const CenteredStack: Story = {
    args : {
        type     : GameStackType.Centered, // Centered stack type
        children : (
            <>
                <GameText>{'Centered item 1'}</GameText>
                <GameText>{'Centered item 2'}</GameText>
            </>
        ),
    },
};

export const FullHeightCenteredStack: Story = {
    args : {
        type     : GameStackType.FullHeightCentered, // Full height centered stack
        children : (
            <>
                <GameText>{'Full height centered item 1'}</GameText>
                <GameText>{'Full height centered item 2'}</GameText>
            </>
        ),
    },
};
