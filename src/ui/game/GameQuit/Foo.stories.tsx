import { Meta, StoryObj } from '@storybook/react';
import { GameQuit } from '.';

// Set up default exports for Storybook
const meta: Meta<typeof GameQuit> = {
  title     : 'Components/Game/GameQuit',
  component : GameQuit,
};

export default meta;

type Story = StoryObj<typeof GameQuit>;

// Default story showing the quit confirmation
export const Default: Story = {};

// Story with additional content or styling
export const CustomStyledQuit: Story = {
  render : () => (
      <div style={{ padding : '20px', backgroundColor : '#f5f5f5', borderRadius : '8px' }}>
          <GameQuit />
      </div>
  ),
};

// Story simulating a disabled quit button (e.g., when quitting is not allowed)
export const DisabledQuit: Story = {
  render : () => (
      <div style={{ padding : '20px', textAlign : 'center' }}>
          <GameQuit />
          <p style={{ color : 'red', fontSize : '12px' }}>{"Quitting is currently disabled."}</p>
      </div>
  ),
};

// Story with a custom message instead of "You Sure?"
export const CustomMessage: Story = {
  render : () => (
      <div style={{ paddingBottom : 'xl' }}>
          <h2 style={{ textAlign : 'center', fontSize : 'xl', marginBottom : 'md' }}>
              {'Are you absolutely sure you want to quit?'}
          </h2>
          <div style={{ display : 'flex', justifyContent : 'center' }}>
              <GameQuit />
          </div>
      </div>
  ),
};
