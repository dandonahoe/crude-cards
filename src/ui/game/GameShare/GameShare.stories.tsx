import { Meta, StoryObj } from '@storybook/react';
import { Group } from '@mantine/core';
import { GameShare } from '.';

// Set up default exports for Storybook
const meta: Meta<typeof GameShare> = {
  title     : 'Components/Game/GameShare',
  component : GameShare,
};

export default meta;

type Story = StoryObj<typeof GameShare>;

// Default story showing the GameShare component
export const Default: Story = {
  render : () => <GameShare />,
};

// Story with custom styling for the share buttons container
export const CustomStyling: Story = {
  render : () => (
      <Group
          style={{
        padding         : '20px',
        backgroundColor : '#f5f5f5',
        borderRadius    : '8px',
      }}>
          <GameShare />
      </Group>
  ),
};

// Story with different alignment for the share buttons
export const CenteredShareButtons: Story = {
  render : () => (
      <Group
          style={{
        padding         : '20px',
        backgroundColor : '#e0e0e0',
        borderRadius    : '8px',
      }}>
          <GameShare />
      </Group>
  ),
};

// Story with additional surrounding content
export const WithAdditionalContent: Story = {
  render : () => (
      <div style={{ padding : '20px', textAlign : 'center' }}>
          <h3>{"Invite your friends to the game!"}</h3>
          <p>{"Use the buttons below to share the game link via email, Twitter, or WhatsApp:"}</p>
          <GameShare />
      </div>
  ),
};
