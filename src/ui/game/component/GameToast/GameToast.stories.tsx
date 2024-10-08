import type { Meta, StoryObj } from '@storybook/react';
import { TimeConfig } from './type';
import { GameToast } from '.';


const meta: Meta<typeof GameToast> = {
    title     : 'Components/GameToast',
    component : GameToast,
    tags      : ['autodocs'],
};

export default meta;


type Story = StoryObj<typeof meta>;

// Sample timer configuration
const sampleTimer: TimeConfig = {
    jiggleClass : 'jiggleLow', // Example jiggle class for animation
    timeLeft    : 10, // 10 seconds remaining
    color       : '#ffcc00', // Yellow color for the timer
};

export const DefaultToast: Story = {
    args : {
        timer : sampleTimer, // Provide the sample timer
    },
};
