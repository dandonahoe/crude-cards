import { Meta, StoryObj } from '@storybook/react';
import { Box, Title, Text } from '@mantine/core';
import { GameTimeout } from '.';

// Set up default exports for Storybook
const meta: Meta<typeof GameTimeout> = {
  title     : 'Components/Game/GameTimeout',
  component : GameTimeout,
};

export default meta;

type Story = StoryObj<typeof GameTimeout>;

// Default story showing the GameTimeout component
export const Default: Story = {
  render : () => <GameTimeout />,
};

// Story with custom styles applied to the timeout message
export const StyledTimeout: Story = {
  render : () => (
      <Box
          mt='xl'
          mb='xl'
          style={{ backgroundColor : '#ffeded', padding : '20px', borderRadius : '10px' }}>
          <GameTimeout />
      </Box>
  ),
};

// Story for testing different content in the timeout component
export const CustomMessage: Story = {
  render : () => (
      <Box
          mt='lg'
          mb='md'
          ta='center'>
          <Title>
              {'Game Over'}
          </Title>
          <Text>
              {'You took too long and missed your chance. Better luck next time!'}
          </Text>
      </Box>
  ),
};
