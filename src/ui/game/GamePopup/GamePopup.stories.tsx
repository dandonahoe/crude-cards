import type { Meta, StoryObj } from '@storybook/react';
import { GamePopup } from './index'; // Import the GamePopup component
import { GamePopupType } from '../../../api/src/constant/game-popup-type.enum'; // Import the popup types enum

const meta: Meta<typeof GamePopup> = {
    title     : 'Game/GamePopup',
    component : GamePopup,
    tags      : ['autodocs'],
    argTypes  : {
        popupType : {
            control : { type : 'select' },
            options : Object.values(GamePopupType), // Use GamePopupType enum to select popup types
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ScoreboardPopup: Story = {
    args : {
        popupType : GamePopupType.Scoreboard, // Show Scoreboard popup
    },
};

export const FeedbackPopup: Story = {
    args : {
        popupType : GamePopupType.Feedback, // Show Feedback popup
    },
};

export const QuitPopup: Story = {
    args : {
        popupType : GamePopupType.Leave, // Show Quit popup
    },
};
