import { Meta, StoryObj } from '@storybook/react';
import { GameWiggleBox } from '.';
import { Text } from '@mantine/core';

// Set up default exports for Storybook
const meta: Meta<typeof GameWiggleBox> = {
  title     : 'Components/Game/GameWiggleBox',
  component : GameWiggleBox,
};

export default meta;

type Story = StoryObj<typeof GameWiggleBox>;

// Default story showing a single child element with wiggling
export const Default: Story = {
  args : {
    index    : 0,
    children : <Text>{"Wiggle Box Default"}</Text>,
  },
};

// Story with high wiggle factors for more exaggerated motion
export const HighWiggle: Story = {
  args : {
    index                : 1,
    wiggleFactor         : 20,
    tiltFactor           : 16,
    verticleWiggleFactor : 80,
    cardOverlapFactor    : 20,
    children             : <Text>{"High Wiggle"}</Text>,
  },
};

// Story with low wiggle factors for subtle motion
export const LowWiggle: Story = {
  args : {
    index                : 2,
    wiggleFactor         : 2,
    tiltFactor           : 2,
    verticleWiggleFactor : 20,
    cardOverlapFactor    : 60,
    children             : <Text>{"Low Wiggle"}</Text>,
  },
};

// Story showing a stack of multiple GameWiggleBox components to test overlap
export const StackedBoxes: Story = {
  render : () => (
      <>
          {[...Array(5)].map((_, index) => (
              <GameWiggleBox
                  key={index}
                  index={index}
                  wiggleFactor={8}
                  tiltFactor={10}
                  verticleWiggleFactor={50}
                  cardOverlapFactor={40}>
                  <Text>{"Box "}{index + 1}</Text>
              </GameWiggleBox>
      ))}
      </>
  ),
};

// Story with different content inside the wiggle box
export const CustomContent: Story = {
  args : {
    index        : 3,
    wiggleFactor : 10,
    children     : (
        <div style={{ padding : '10px', backgroundColor : 'lightblue' }}>
            <Text>{"Custom Content"}</Text>
        </div>
    ),
  },
};
