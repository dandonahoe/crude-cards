import type { Meta, StoryObj } from '@storybook/react';
import { GameBoxType } from './type';
import { GameBox } from '.';
import { GameText } from '../GameText';

const meta: Meta<typeof GameBox> = {
    title     : 'Components/GameBox',
    component : GameBox,
    tags      : ['autodocs'],
    argTypes  : {
        type : {
            control : { type : 'select' }, // Use a select control for GameBoxType enum
            options : Object.values(GameBoxType), // List the enum values
        },
        size : {
            control : { type : 'select' }, // Use a select control for MantineSize
            options : ['sm', 'md', 'lg'], // Available sizes
        },
        children : {
            control : 'text', // Text control for the content inside the box
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultBox: Story = {
    args : {
        type     : GameBoxType.Default, // Set a default type from the enum
        size     : 'md', // Default size is medium
        children : <GameText>{'Just My Text In a Box Default'}</GameText>, // Sample content
    },
};

export const CenteredBox: Story = {
    args : {
        type     : GameBoxType.Centered, // Centered layout type
        size     : 'lg', // Large size
        children : <GameText>{'Just My Text In a Box Centered'}</GameText>, // Sample content
    },
};
