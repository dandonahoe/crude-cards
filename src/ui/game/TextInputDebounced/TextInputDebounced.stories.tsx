import { Meta, StoryObj } from '@storybook/react';

import { Props } from './type';
import { TextInputDebounced } from './index';
import { CA } from '../../../constant/framework/CoreAction';
import { GameAction } from '../../../client/action/game.action';

// Set up default exports for Storybook
const meta: Meta<typeof TextInputDebounced> = {
  title     : 'Components/Form/TextInputDebounced',
  component : TextInputDebounced,
};

export default meta;

type Story = StoryObj<typeof TextInputDebounced>;

const defaultArgs: Props = {
  value        : '',
  label        : 'Username',
  name         : 'username',
  milliseconds : 1500,
  size         : 'md',
  onChange     : (value: string, name: string) : CA => {
    console.log(`Changed: ${value} (name: ${name})`);

    return GameAction.noOp();
  },
  onBlur : (value: string, name: string) : CA => {
    console.log(`Blurred: ${value} (name: ${name})`);

    return GameAction.noOp();
  },
};

// Default story showing basic usage
export const Default: Story = {
  args : {
    ...defaultArgs,
    value : 'Enter your name',
  },
};

// Story showing controlled input with longer debounce time
export const LongDebounce: Story = {
  args : {
    ...defaultArgs,
    value        : 'Type something slowly...',
    milliseconds : 3000,
  },
};

// Story showing how the component behaves with a short debounce time
export const ShortDebounce: Story = {
  args : {
    ...defaultArgs,
    value        : 'Quick typing test',
    milliseconds : 500,
  },
};

// Story for testing edge case with no label
export const NoLabel: Story = {
  args : {
    ...defaultArgs,
    value : 'Label-less input',
    label : '',
  },
};

// Story showing the component with a large input size
export const LargeSize: Story = {
  args : {
    ...defaultArgs,
    value : 'Larger input',
    size  : 'lg',
  },
};
