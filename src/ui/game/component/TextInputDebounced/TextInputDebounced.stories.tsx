import type { Meta, StoryObj } from '@storybook/react';
import { TextInputDebounced } from '.';

const meta: Meta<typeof TextInputDebounced> = {
    title     : 'Components/TextInputDebounced',
    component : TextInputDebounced,
    tags      : ['autodocs'],
    argTypes  : {
        label        : { control : 'text' },  // Control for input label
        value        : { control : 'text' },  // Control for the input value
        milliseconds : { control : 'number' },  // Control for the debounce delay
        size         : { control : { type : 'select' }, options : ['xs', 'sm', 'md', 'lg', 'xl'] },  // Control for input size
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultDebouncedInput: Story = {
    args : {
        label        : 'Username',
        value        : '',
        milliseconds : 1500,  // 1.5 seconds debounce delay
        size         : 'md',
        onChange     : (value, name) => console.log(`Value changed to: ${value}, Input Name: ${name}`),
        onBlur       : (value, name) => console.log(`Input blurred with value: ${value}, Input Name: ${name}`),
    },
};
