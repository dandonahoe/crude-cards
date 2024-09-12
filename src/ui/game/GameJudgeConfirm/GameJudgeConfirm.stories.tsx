import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameBox, GameBoxCentered } from '../GameBox';
import { Meta, StoryObj } from '@storybook/react';
import { GameBanner } from '../GameBanner/index';
import { GameButton } from '../GameButton/index';
import { GameCard } from '../GameCard/index';
import { CloseButton } from '@mantine/core';
import { GameJudgeConfirm } from '.';

// Set up default exports for Storybook
const meta: Meta<typeof GameJudgeConfirm> = {
  title     : 'Components/Game/GameJudgeConfirm',
  component : GameJudgeConfirm,
};

export default meta;

type Story = StoryObj<typeof GameJudgeConfirm>;

// Default story showing the judge confirmation component
export const Default: Story = {};

// Story with customized card content
export const CustomCards: Story = {
  render : () => (
      <div style={{ padding : '20px' }}>
          <GameJudgeConfirm />
      </div>
  ),
};

// Story simulating a scenario with additional styles
export const StyledJudgeConfirm: Story = {
  render : () => (
      <div style={{ backgroundColor : '#f0f0f0', padding : '20px', borderRadius : '8px' }}>
          <GameJudgeConfirm />
      </div>
  ),
};

// Story with a scenario where only one card is visible
export const SingleCardScenario: Story = {
  render : () => (
      <GameBox size='lg'>
          <GameBox>
              <CloseButton />
              <GameBanner
                  color={CardColor.Black}
                  subtitle='Confirm Your Winner'
                  text='Choosing' />
              <GameCard
                  card={{
                    id    : 'asdf',
                    color : CardColor.White,
                    text  : 'A lone card in this round',
          }}/>
              <GameBoxCentered>
                  <GameButton
                      onClick={() => {}}
                      text='Pick' />
              </GameBoxCentered>
          </GameBox>
      </GameBox>
  ),
};
