import { Meta, StoryObj } from '@storybook/react';
import { GameDeck } from '.';
import { CardColor } from '../../../api/src/constant/card-color.enum';

// Default export with metadata for Storybook
const meta: Meta<typeof GameDeck> = {
  title     : 'Game/GameDeck',
  component : GameDeck,
  argTypes  : {
    onCardClicked : { action : 'card clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof GameDeck>;

// Sample data for GameDeck stories
const sampleCards = [
  {
    id    : 'black-1',
    color : CardColor.Black,
    text  : 'This is a sample <strong>black</strong> card.',
  },
  {
    id    : 'white-1',
    color : CardColor.White,
    text  : 'This is a sample <strong>white</strong> card.',
  },
  {
    id    : 'black-2',
    color : CardColor.Black,
    text  : 'Another black card for testing.',
  },
  {
    id    : 'white-2',
    color : CardColor.White,
    text  : 'Another white card for testing.',
  },
];

// Default GameDeck story
export const Default: Story = {
  args : {
    cards : sampleCards,
  },
};

// Story for a GameDeck with clickable cards
export const ClickableCards: Story = {
  args : {
    cards         : sampleCards,
    onCardClicked : card => console.log(`Card clicked: ${card.text}`),
  },
};

// Story for an empty GameDeck
export const EmptyDeck: Story = {
  args : {
    cards : [],
  },
};
