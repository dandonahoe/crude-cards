## /Users/dan/code/crude-cards/src/ui/game/GameBanner/index.tsx

```typescript
import { Box, Text } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameBanner : RFC<Props> = ({
    text, subtitle, color,
}) =>
    <Box
        ta='center'
        mb='sm'
        mt='xs'
        c={color}>
        <Text
            fz='lg'
            fw={600}>
            {text}
        </Text>
        {subtitle &&
            <Text
                fw={600}
                p='sm'
                fz='md'>
                {subtitle}
            </Text>
        }
    </Box>

```

## /Users/dan/code/crude-cards/src/ui/game/GameBanner/type.tsx

```typescript
export interface Props {
    subtitle ?: string;
    color     : string;
    text      : string;
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameBoard/index.tsx

```typescript
import { GamePopup } from '../GamePopup';
import { GameDebug } from '../GameDebug';
import { GameView } from '../GameView';
import { Stack } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Env } from '../../../Env';
import { Props } from './type';


const isDebugOverlayVisible = Env.getBoolean('NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE');

export const GameBoard : RFC<Props> = ({ id }) =>
    <Stack
        h='100vh'
        id={id}>
        <GamePopup />
        <GameView />
        {isDebugOverlayVisible &&
            <GameDebug />
        }
    </Stack>;

```

## /Users/dan/code/crude-cards/src/ui/game/GameBoard/type.tsx

```typescript
export interface Props {
    id : string;
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameButton/GameButton.stories.tsx

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GameButton } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title      : 'Game/GameButton',
    component  : GameButton,
    parameters : {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout : 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags     : ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes : {

    },

    args : {
        onClick : fn(),
    },
} satisfies Meta<typeof GameButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args : {

        text : 'Imma FIrst OnE',
    },
};

export const Secondary: Story = {
    args : {
        text : 'SeCond OnE',
    },
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameButton/index.tsx

```typescript
import classes from './GameButton.module.css';
import { Button, Text } from '@mantine/core';
import { App } from '../../AppContext';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';


export const GameButton : RFC<Props> = ({
    text, onClick,
}) => {
    const { isPhone  } = useContext(App);

    const buttonSize = isPhone ? 180 : 180;
    const fontSize   = isPhone ? 'xl' : 'xl';

    return (
        <Button
            style={{
                width  : buttonSize,
                height : buttonSize,
            }}
            aria-label={`Button ${text}`}
            className={classes.gameButton}
            onClick={onClick}>
            <Text
                fz={fontSize}
                fw={800}
                lh={0.5}>
                {text}
            </Text>
        </Button>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameButton/type.tsx

```typescript
export interface Props {
    text : string;
    onClick : () => void;
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameCard/GameCard.stories.tsx

```typescript
/**
 * Storybook stories for GameCard component
 *
 * Description:
 * This file contains Storybook stories for the GameCard component. Each story represents
 * a different state or variation of the component. Storybook helps in testing and showcasing
 * the component's appearance and behavior in isolation.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameCard" to view these stories in the Storybook UI.
 */

import { CardColor } from '../../../api/src/constant/card-color.enum';
import { Meta, StoryObj } from '@storybook/react';
import { GameCard } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameCard> = {
    title     : 'Game/GameCard',
    component : GameCard,
    argTypes  : {
        onClick : { action : 'clicked' },
    },
};

export default meta;

type Story = StoryObj<typeof GameCard>;

// Sample data for GameCard stories
const sampleCardBlack = {
    id    : 'black-id',
    color : CardColor.Black,
    text  : 'This is a sample <strong>black</strong> card.',
};

const sampleCardWhite = {
    id    : 'white-id',
    color : CardColor.White,
    text  : 'This is a sample <strong>white</strong> card.',
};

// Story: Default GameCard (white card)
export const Default: Story = {
    args : {
        card : sampleCardWhite,
    },
};

// Story: Hovered GameCard (black card) with click interaction enabled
export const Hovered: Story = {
    args : {
        card    : sampleCardBlack,
        onClick : () => console.log('Black card clicked!'),
    },
};

// Story: GameCard with missing text
export const MissingText: Story = {
    args : {
        card : {
            id    : 'missing-text-id',
            color : CardColor.White,
            text  : null,
        },
    },
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameCard/Logic.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';


export const getBackgroundColor = (
    color     : CardColor,
    isHovered : boolean,
) : string => {

    if (isHovered) {
        if (color === CardColor.White) return '#ccc';
        if (color === CardColor.Black) return '#333';
    }

    return color;
};


export const getCardBorder = (color : CardColor) : string =>
    `4px solid ${color === CardColor.White ? CardColor.Black : CardColor.White}`

export const getCardTextColor = (color : CardColor) : CardColor =>
    color === CardColor.White ? CardColor.Black : CardColor.White;

```

## /Users/dan/code/crude-cards/src/ui/game/GameCard/index.tsx

```typescript
import { getBackgroundColor, getCardBorder, getCardTextColor } from './Logic';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import classes from './GameCard.module.css';
import { useHover } from '@mantine/hooks';
import { Box, rem } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameCard: RFC<Props> = ({
    card, onClick,
}) => {
    const { hovered: isHovered, ref: refHover } = useHover();

    if (!card) return '[NULL CARD]';

    const { color, text } = card;

    const handleSelectBlackCard = () => {
        if (onClick)
            onClick(card);
    }

    const colorNum = color === CardColor.Black ? 64 : 0;
    const alpha = color === CardColor.Black ? 0.6 : 0.2;

    /* eslint-disable key-spacing */

    return (
        <Box
            onClick={handleSelectBlackCard}
            className={classes.gameCard}
            ref={refHover}
            p='xl'
            style={{
                backgroundColor: getBackgroundColor(color!, isHovered && onClick !== undefined),
                boxShadow: `4px 4px 20px 14px  rgba(${colorNum}, ${colorNum}, ${colorNum}, ${alpha})`,
                maxWidth: rem(400),
                border: getCardBorder(color!),
            }}>
            <div
                dangerouslySetInnerHTML={{ __html : text ?? '[MISSING TEXT]' }}
                style={{
                    color : getCardTextColor(color!),
                    fontWeight : 600,
                }} />
        </Box>
    );

    /* eslint-enable key-spacing */
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameCard/type.tsx

```typescript
import { CardDTO } from '../../../api/src/game/dtos/card.dto';


export interface Props {
    onClick ?: (card : CardDTO) => void;
    card : CardDTO;
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameCardContainer/Logic.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';


export const getBackgroundColor = (
    color     : CardColor,
    isHovered : boolean,
) : string => {

    if (isHovered) {
        if (color === CardColor.White) return '#ccc';
        if (color === CardColor.Black) return '#333';
    }

    return color;
};


export const getCardBorder = (color : CardColor) : string =>
    `3px solid ${color === CardColor.White ? CardColor.Black : CardColor.White}`

export const getCardTextColor = (color : CardColor) : CardColor =>
    color === CardColor.White ? CardColor.Black : CardColor.White;

```

## /Users/dan/code/crude-cards/src/ui/game/GameCardContainer/index.tsx

```typescript
import { getBackgroundColor, getCardBorder, getCardTextColor } from './Logic';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import classes from './GameCardContainer.module.css';
import { useHover } from '@mantine/hooks';
import { Box, rem } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameCardContainer : RFC<Props> = ({
    children, color, onClick, isClickable = false,
}) => {

    const { hovered : isHovered, ref : refHover } = useHover();

    if(color === CardColor.Unknown) {
        if(onClick)
            return (
                <Box onClick={onClick}>
                    {children}
                </Box>
            );

        return children;
    }

    const colorNum = color === CardColor.Black ? 64 : 0;
    const alpha    = color === CardColor.Black ? 0.6 : 0.2;

    return (
        <Box
            className={classes.gameCard}
            c={getCardTextColor(color!)}
            ref={refHover}
            p='xl'
            m='xs'
            style={{
                backgroundColor : getBackgroundColor(color!, isHovered && onClick !== undefined),
                boxShadow       : `4px 4px 20px 14px  rgba(${colorNum}, ${colorNum}, ${colorNum}, ${alpha})`,
                maxWidth        : rem(400),
                border          : getCardBorder(color!),
                cursor          : isClickable ? 'pointer' : 'default',
            }}>
            {children}
        </Box>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameCardContainer/type.tsx

```typescript

import { CardColor } from '../../../api/src/constant/card-color.enum';
import { PropsWithChildren } from 'react';


export type Props = PropsWithChildren<{
    isClickable ?: boolean;
    onClick     ?: () => void;
    color        : CardColor;
}>;

```

## /Users/dan/code/crude-cards/src/ui/game/GameComplete/GameComplete.stories.tsx

```typescript
/**
 * Storybook stories for GameComplete component
 *
 * Description:
 * This file contains Storybook stories for the GameComplete component, showcasing different game completion scenarios.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameComplete" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameComplete } from '.';
// import { Box, Button, Center, Flex, Stack, Text } from '@mantine/core';
// import { GameStatusTable } from '../GameStatusTable';
// import { IconArrowRight } from '@tabler/icons-react';
// import { useViewportSize } from '@mantine/hooks';
// import Confetti from 'react-confetti';
// import classes from './GameComplete.module.css';

// Default export containing Storybook metadata
const meta: Meta<typeof GameComplete> = {
    title     : 'Game/GameComplete',
    component : GameComplete,
};

export default meta;

type Story = StoryObj<typeof GameComplete>;

// Mock data for stories
const mockAllPlayerStatus = [
    { username : 'Player1', score : 42, isDone : false },
    { username : 'Player2', score : 38, isDone : false },
    { username : 'Player3', score : 25, isDone : false },
];

const mockGameChampion = { username : 'Player1' };
const mockIsWinner = true;

// Template to use mock data for the GameComplete component
// const Template: Story = args => (
//     <GameComplete {...args} />
// );

// Story: Default Game Complete screen (winner)
export const Default: Story = {
    args : {
        allPlayerStatus : mockAllPlayerStatus,
        gameChampion    : mockGameChampion,
        isWinner        : mockIsWinner,
    },
};

// Story: Game Complete screen without a winner
export const NoWinner: Story = {
    args : {
        allPlayerStatus : mockAllPlayerStatus,
        gameChampion    : null,
        isWinner        : false,
    },
};

// Story: Game Complete screen with all players done
export const AllPlayersDone: Story = {
    args : {
        allPlayerStatus : mockAllPlayerStatus.map(player => ({
            ...player,
            isDone : true,
        })),
        gameChampion : mockGameChampion,
        isWinner     : mockIsWinner,
    },
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameComplete/index.tsx

```typescript
import { selectGameChampion, selectAllPlayerStatus, selectIsPlayerWinner } from '../../../client/selector/game';
import { Box, Button, Center, Flex, Stack, Text } from '@mantine/core';
import { GameAction } from '../../../client/action/game.action';
import { useDispatch, useSelector } from '@app/client/hook';
import { CA } from '../../../constant/framework/CoreAction';
import { GameStatusTable } from '../GameStatusTable';
import { IconArrowRight } from '@tabler/icons-react';
import { useViewportSize } from '@mantine/hooks';
import classes from './GameComplete.module.css';
import Confetti from 'react-confetti'
import { RFC } from '@app/ui/type';


export const GameComplete : RFC = () => {

    const dispatch = useDispatch();

    const allPlayerStatus = useSelector(selectAllPlayerStatus);
    const gameChampion    = useSelector(selectGameChampion);
    const isWinner        = useSelector(selectIsPlayerWinner);

    const { height, width } = useViewportSize();

    const handleExitGame = () : CA =>
        dispatch(GameAction.leaveGame({}));

    console.log('GameComplete', { allPlayerStatus, gameChampion, isWinner });

    return (
        <Flex
            justify='center'
            align='center'>
            {isWinner &&
                <Confetti
                    width={width}
                    height={height}/>
            }
            <Stack c='#fff'>
                <Text
                    mt='xl'
                    fz='lg'
                    fw={600}
                    c='#fff'
                    pt='xl'
                    ta='center'>
                    {'CHAMP'}
                </Text>
                <Text
                    fw={600}
                    className={classes.neonText}
                    ta='center'
                    fz='lg'>
                    {gameChampion?.username}
                </Text>
                <Center mb='xl'>
                    <Button
                        onClick={handleExitGame}
                        variant='subtle'
                        size='lg'
                        mt='xl'>
                        {'Home'}
                        <IconArrowRight size={50} />
                    </Button>
                </Center>
                <Text
                    fz='sm'
                    fw={600}
                    ta='center'>
                    {'Scoreboard'}
                </Text>
                <Box >
                    <GameStatusTable
                        playerStatusList={allPlayerStatus!}
                        shouldShowScore={true}
                        shouldShowDone={false} />
                </Box>
            </Stack>
        </Flex>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameContext.tsx

```typescript
import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { GameContextType } from './type';
import { createContext } from 'react';


export const GameContext = createContext<GameContextType>({
    dealerDealtCard : null,
    playerDealtCard : null,
    currentPlayer   : null,
    headerHeight    : 0,
    popupTypeId     : null,
    playerCards     : [],
    dealerCards     : [],
    gameState       : GameStateDTO.Default,
    isDealer        : false,
});

```

## /Users/dan/code/crude-cards/src/ui/game/GameDealerConfirm/GameDealerConfirm.stories.tsx

```typescript
/**
 * Storybook stories for GameDealerConfirm component
 *
 * Description:
 * This file contains Storybook stories for the GameDealerConfirm component, showcasing different states of the dealer confirmation process.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameDealerConfirm" to view these stories in the Storybook UI.
 */

import { AppProvider } from '@app/client/AppProvider';
import { Meta, StoryObj } from '@storybook/react';
import { GameDealerConfirm } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameDealerConfirm> = {
    title      : 'Game/GameDealerConfirm',
    component  : GameDealerConfirm,
    decorators : [Story => <AppProvider><Story /></AppProvider>],
};

export default meta;

type Story = StoryObj<typeof GameDealerConfirm>;

// Story: Default Game Dealer Confirm
export const Default: Story = {
    render : () => <GameDealerConfirm />,
};

// Story: Game Dealer Confirm with a different card color
export const AlternateColor: Story = {
    render : () => (
        <GameDealerConfirm />
    ),
};

// Story: Game Dealer Confirm with a longer subtitle
export const LongSubtitle: Story = {
    render : () => (
        <GameDealerConfirm />
    ),
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameDealerConfirm/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { Box, CloseButton, Flex } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameCard } from '../GameCard';
import { RFC } from '@app/ui/type';


export const GameDealerConfirm : RFC = () => {

    const handleConfirm = () : void =>{
    }

    return (
        <Box>
            <CloseButton />
            <GameBanner
                subtitle='You are Dealer'
                text='Deal this?'
                color='#000' />
            <GameCard
                card={{
                    ...CardDTO.Default,
                    color : CardColor.Black,
                    text  : 'Deal',
                }} />
            <Flex
                justify='center'
                align='center'
                mt='xl'
                mb='lg'>
                <GameButton
                    onClick={handleConfirm}
                    text='Yep' />
            </Flex>
        </Box>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameDealerJudge/GameDealerConfirm.stories.tsx

```typescript
/**
 * Storybook stories for GameDealerJudge component
 *
 * Description:
 * This file contains Storybook stories for the GameDealerJudge component, showcasing different states of the dealer's card judging process.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameDealerJudge" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameDealerJudge } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameDealerJudge> = {
    title     : 'Game/GameDealerJudge',
    component : GameDealerJudge,
};

export default meta;

type Story = StoryObj<typeof GameDealerJudge>;

// Mock data for the selected cards
const mockSelectedCards = [
    { id : '1', text : 'First card', color : 'black' },
    { id : '2', text : 'Second card', color : 'white' },
    { id : '3', text : 'Third card', color : 'black' },
];

// Story: Default Game Dealer Judge with mock selected cards
export const Default: Story = {
    args : {
        selectedCards : mockSelectedCards,
    },
    render : () => <GameDealerJudge />,
};

// Story: Game Dealer Judge with no selected cards
export const NoSelectedCards: Story = {
    args : {
        selectedCards : [],
    },
    render : () => <GameDealerJudge />,
};

// Story: Game Dealer Judge with more cards
export const MultipleCards: Story = {
    args : {
        selectedCards : [
            ...mockSelectedCards,
            { id : '4', text : 'Fourth card', color : 'white' },
            { id : '5', text : 'Fifth card', color : 'black' },
        ],
    },
    render : () => <GameDealerJudge />,
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameDealerJudge/index.tsx

```typescript
import { selectSelectedCards } from '@app/client/selector/game';
import { GameAction } from '../../../client/action/game.action';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { useSelector , useDispatch } from '@app/client/hook';
import { CA } from '../../../constant/framework/CoreAction';
import { GameDeck } from '../GameDeck';
import { Flex } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameDealerJudge : RFC = () => {

    const selectedCards = useSelector(selectSelectedCards);

    const dispatch = useDispatch();

    const handleCardClicked = (card : CardDTO) : CA =>
        dispatch(GameAction.dealerPickWinner({
            card_id : card.id,
        }));

    return (
        <Flex
            justify='center'
            align='center'>
            <GameDeck
                onCardClicked={handleCardClicked}
                cards={selectedCards} />
        </Flex>
    );
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameDealerSelection/GameDealerSelection.stories.tsx

```typescript
/**
 * Storybook stories for GameDealerSelection component
 *
 * Description:
 * This file contains Storybook stories for the GameDealerSelection component,
 * showcasing different states of the dealer's card selection process.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameDealerSelection" to view these stories in the Storybook UI.
 */

import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { Meta, StoryObj } from '@storybook/react';
import { GameDealerSelection } from '.';


// Default export containing Storybook metadata
const meta: Meta<typeof GameDealerSelection> = {
    title     : 'Game/GameDealerSelection',
    component : GameDealerSelection,
};

export default meta;

type Story = StoryObj<typeof GameDealerSelection>;

// Mock data for dealer cards
const mockDealerCards: CardDTO[] = [
    { id : '1', text : 'First dealer card', color : CardColor.Black },
    { id : '2', text : 'Second dealer card', color : CardColor.Black },
    { id : '3', text : 'Third dealer card', color : CardColor.Black },
];

// Story: Default Game Dealer Selection with mock dealer cards
export const Default: Story = {
    args : {
        dealerCards : mockDealerCards,
    },
    render : () => <GameDealerSelection />,
};

// Story: Game Dealer Selection with no dealer cards
export const NoDealerCards: Story = {
    args : {
        dealerCards : [],
    },
    render : () => <GameDealerSelection />,
};

// Story: Game Dealer Selection with more dealer cards
export const MultipleDealerCards: Story = {
    args : {
        dealerCards : [
            ...mockDealerCards,
            { id : '4', text : 'Fourth dealer card', color : CardColor.Black },
            { id : '5', text : 'Fifth dealer card', color : CardColor.Black },
        ],
    },
    render : () => <GameDealerSelection />,
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameDealerSelection/index.tsx

```typescript
import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { GameContext } from '../GameContext';
import { useDispatch } from 'react-redux';
import { GameDeck } from '../GameDeck';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Flex } from '@mantine/core';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';


export const GameDealerSelection : RFC = () => {

    const { dealerCards } = useContext(GameContext);

    const dispatch = useDispatch();

    const handleCardClicked = (card : CardDTO) : CA =>
        dispatch(GameAction.dealerPickBlackCard({
            card_id : card.id,
        }));

    return (
        <Flex
            justify='center'
            align='center'>

            <GameDeck
                onCardClicked={handleCardClicked}
                cards={dealerCards}  />
        </Flex>
    );
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameDebug/GameDebug.stories.tsx

```typescript
/**
 * Storybook stories for GameDebug component
 *
 * Description:
 * This file contains Storybook stories for the GameDebug component, showcasing different states of the game debug information.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameDebug" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameDebug } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameDebug> = {
    title     : 'Game/GameDebug',
    component : GameDebug,
};

export default meta;

type Story = StoryObj<typeof GameDebug>;

// Story: Default Game Debug
export const Default: Story = {
    render : () => <GameDebug />,
};

// Story: Game Debug with some error in game state
export const WithError: Story = {
    render : () => <GameDebug />,
};

// Story: Game Debug showing dealer and player details
export const DealerAndPlayerDetails: Story = {
    render : () => <GameDebug />,
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameDebug/index.tsx

```typescript
import { useContext, ReactNode, useEffect, useState } from 'react';
import { Box, List, rem, Table, Tabs, Text } from '@mantine/core';
import { selectIsHost } from '../../../client/selector/game';
import { CookieType } from '../../../api/src/type';
import { useSelector } from '@app/client/hook';
import classes from './GameDebug.module.css';
import { GameContext } from '../GameContext';
import { RFC } from '@app/ui/type';
import Cookies from 'js-cookie';

export const GameDebug: RFC = () => {

    const handleOpenAdmin = (): void => { };

    const {
        gameState, isDealer, currentPlayer,
        dealerDealtCard, playerDealtCard,
    } = useContext(GameContext);

    const isHost = useSelector(selectIsHost);

    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const token = Cookies.get(CookieType.AuthToken);
        setAuthToken(token ?? null);
    }, []);

    const renderRow = (key: string, value: ReactNode, fontSize: string = 'sm') => (
        <Table.Tr>
            <Table.Td
                p={0}
                pl='sm'>
                <strong>
                    {key}
                </strong>
            </Table.Td>
            <Table.Td
                p={0}
                fz={fontSize}>
                {value}
            </Table.Td>
        </Table.Tr>
    );

    return (
        <Box
            className={classes.pi}
            w={rem(220)}
            h={rem(220 * 2)}
            onClick={handleOpenAdmin}>
            <Tabs defaultValue='one'>
                <Tabs.List>
                    <Tabs.Tab value='one'>
                        <Text
                            fz='sm'
                            fw={600}>
                            {'ONE'}
                        </Text>

                    </Tabs.Tab>
                    <Tabs.Tab value='two'>
                        {'TWO'}
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value='one'>
                    <Table
                        cellSpacing={0}
                        cellPadding={0}
                        fz='xs'
                        style={{
                            maxWidth : rem(220),
                        }}>
                        <Table.Tbody>
                            {gameState.error_message && renderRow('Error', gameState.error_message)}
                            {renderRow('IsDealer', isDealer ? 'Yes' : 'No')}
                            {renderRow('AuthToken', authToken)}
                            {renderRow('IsHost', isHost ? 'Yes' : 'No')}
                            {renderRow('Game Code', gameState.game_code)}
                            {renderRow('Stage', gameState.game_stage)}
                            {renderRow('PlayerId', currentPlayer?.id, 'xs')}
                            {renderRow('Username', currentPlayer?.username, 'xs')}
                            {renderRow('Score', currentPlayer?.score)}
                            {renderRow("Dealer's", dealerDealtCard?.text)}
                            {renderRow("Player's", playerDealtCard?.text)}
                        </Table.Tbody>
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value='two'>
                    <List>
                        <List.Item>
                            {'ONE'}
                        </List.Item>
                        <List.Item>
                            {'ONE'}
                        </List.Item>
                        <List.Item>
                            {'ONE'}
                        </List.Item>
                        <List.Item>
                            {'ONE'}
                        </List.Item>

                    </List>
                </Tabs.Panel>
            </Tabs>
        </Box>
    )
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameDeck/GameDeck.stories.tsx

```typescript
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

```

## /Users/dan/code/crude-cards/src/ui/game/GameDeck/index.tsx

```typescript
import { GameWiggleBox } from '../GameWiggleBox';
import { GameCard } from '../GameCard';
import { Stack } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeck : RFC<Props> = ({
    onCardClicked, cards,
}) =>
    <Stack
        justify='center'
        align='center'>
        {cards.map((card, index) =>
            <GameWiggleBox
                index={index}
                key={index}>
                <GameCard
                    onClick={onCardClicked}
                    card={card} />
            </GameWiggleBox>,
        )}
    </Stack>

```

## /Users/dan/code/crude-cards/src/ui/game/GameDeck/type.tsx

```typescript
import { PropsWithChildren } from 'react';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';


export interface Props {
    onCardClicked ?: (card : CardDTO) => void;
    cards : CardDTO[];

}


export type WiggleBoxProps = PropsWithChildren<{
    index : number;
}>;

```

## /Users/dan/code/crude-cards/src/ui/game/GameDeckLayout/GameDeckLayout.stories.tsx

```typescript
/**
 * Storybook stories for GameDeckLayout component
 *
 * Description:
 * This file contains Storybook stories for the GameDeckLayout component,
 * showcasing different deck layouts based on varying factors like card overlap and wiggle.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameDeckLayout" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameDeckLayout } from '.';
import { CardColor } from '../../../api/src/constant/card-color.enum';

// Default export containing Storybook metadata
const meta: Meta<typeof GameDeckLayout> = {
    title     : 'Game/GameDeckLayout',
    component : GameDeckLayout,
};

export default meta;

type Story = StoryObj<typeof GameDeckLayout>;

// Mock data for cards
const mockCards = [
    <div key='1'>{"Card 1"}</div>,
    <div key='2'>{"Card 2"}</div>,
    <div key='3'>{"Card 3"}</div>,
];

// Story: Default Game Deck Layout with white cards
export const Default: Story = {
    args : {
        cards : mockCards,
        color : CardColor.White,
    },
    render : args => <GameDeckLayout {...args} />,
};

// Story: Game Deck Layout with black cards
export const BlackCards: Story = {
    args : {
        cards : mockCards,
        color : CardColor.Black,
    },
    render : args => <GameDeckLayout {...args} />,
};

// Story: Game Deck Layout with custom wiggle and overlap factors
export const CustomWiggleAndOverlap: Story = {
    args : {
        cards                : mockCards,
        verticleWiggleFactor : 80,
        cardOverlapFactor    : 30,
        wiggleFactor         : 12,
        tiltFactor           : 10,
    },
    render : args => <GameDeckLayout {...args} />,
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameDeckLayout/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameWiggleBox } from '../GameWiggleBox';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeckLayout : RFC<Props> = ({
    cards,

    color = CardColor.White,

    verticleWiggleFactor = 50,
    cardOverlapFactor    = 40,
    wiggleFactor         = 6,
    tiltFactor           = 8,
}) => {

    const col = color === CardColor.Black ? '#000' : '#fff';

    return (
        <Box

            style={{
                backgroundColor : col,
            }}>
            {cards.map((card, index) => !card
                ? null
                : (
                    <GameWiggleBox
                        verticleWiggleFactor={verticleWiggleFactor}
                        cardOverlapFactor={cardOverlapFactor}
                        wiggleFactor={wiggleFactor}
                        tiltFactor={tiltFactor}
                        index={index}
                        key={index}>
                        {card}
                    </GameWiggleBox>
                ),
            )}
        </Box>
    );
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameDeckLayout/type.tsx

```typescript
import { ReactNode } from 'react';
import { CardColor } from '../../../api/src/constant/card-color.enum';

export interface Props {
    verticleWiggleFactor ?: number;
    cardOverlapFactor    ?: number;
    wiggleFactor         ?: number;
    tiltFactor           ?: number;

    color : CardColor;
    cards : ReactNode[];
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameError/GameError.stories.tsx

```typescript
/**
 * Storybook stories for GameError component
 *
 * Description:
 * This file contains Storybook stories for the GameError component,
 * showcasing different error scenarios and how they are displayed in the UI.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameError" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameError } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameError> = {
    title     : 'Game/GameError',
    component : GameError,
};

export default meta;

type Story = StoryObj<typeof GameError>;

// Story: Default Game Error with a sample message
export const Default: Story = {
    args : {
        children : 'An unexpected error occurred. Please try again.',
    },
    render : args => <GameError {...args} />,
};

// Story: Game Error with a longer, more detailed message
export const DetailedError: Story = {
    args : {
        children : `A critical issue has occurred.
Please check your connection, refresh the page,
or contact support if the problem persists.`,
    },
    render : args => <GameError {...args} />,
};

// Story: Game Error with short message
export const ShortError: Story = {
    args : {
        children : 'Oops! Something went wrong.',
    },
    render : args => <GameError {...args} />,
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameError/index.tsx

```typescript
import { IconInfoCircle } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';
import { Alert } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameError : RFC<PropsWithChildren> = ({
    children,
}) =>
    <Alert
        icon={<IconInfoCircle />}
        title='Minor Catasrophe'
        variant='light'
        color='red'
        radius='md'>
        {children}
    </Alert>

```

## /Users/dan/code/crude-cards/src/ui/game/GameFeedback/GameFeedback.stories.tsx

```typescript
/**
 * Storybook stories for GameFeedback component
 *
 * Description:
 * This file contains Storybook stories for the GameFeedback component,
 * showcasing the form submission process and validation scenarios.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameFeedback" to view
 * these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameFeedback } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameFeedback> = {
    title     : 'Game/GameFeedback',
    component : GameFeedback,
};

export default meta;

type Story = StoryObj<typeof GameFeedback>;

// Story: Default Game Feedback form
export const Default: Story = {
    render : () => <GameFeedback />,
};

// Story: Game Feedback form after successful submission
export const Submitted: Story = {
    render : () => {
        const component = <GameFeedback />;

        // Simulate form submission behavior here if needed, such as mocking the dispatch or setting state.
        return component;
    },
};

// Story: Game Feedback form with validation errors (for interactive testing)
export const WithValidationErrors: Story = {
    render : () => <GameFeedback />,
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameFeedback/index.tsx

```typescript
import { Button, Group, TextInput, Textarea, Text } from '@mantine/core';
import { GameAction } from '../../../client/action/game.action';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useFocusTrap } from '@mantine/hooks';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/form';
import { RFC } from '@app/ui/type';
import { useState } from 'react';
import { z } from 'zod';


interface FeedbackForm {
    name    : string;
    email   : string;
    message : string;
}

const schema = z.object({
    name : z.string().min(1, {
        message : 'Name should have at least 2 letters',
    }),

    email : z.string().email({
        message : 'Invalid email',
    }),

    message : z.string().min(1, {
        message : 'Name should have at least 2 letters',
    }),
});

export const GameFeedback : RFC = () => {
    const form = useForm({
        validate : zodResolver(schema),

        mode : 'uncontrolled',

        initialValues : {
            name    : '',
            email   : '',
            message : '',
        },
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (values : FeedbackForm) : void => {

        dispatch(GameAction.submitFeedback({
            message : values.message,
            email   : values.email,
            name    : values.name,
        }));

        setIsSubmitted(true);
    }

    const focusTrapRef = useFocusTrap(true);

    if(isSubmitted)
        return (
            <Text fw={600}>
                {'Thank you for your feedback!'}
            </Text>
        );

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                fw={600}
                ref={focusTrapRef}
                {...form.getInputProps('name')}
                key={form.key('name')}
                withAsterisk={true}
                aria-label='Name'
                label='Name'
                tabIndex={0} />

            <TextInput
                {...form.getInputProps('email')}
                fw={600}
                key={form.key('email')}
                withAsterisk={true}
                aria-label='Email'
                variant='filled'
                label='Email'
                tabIndex={0} />

            <Textarea
                {...form.getInputProps('message')}
                key={form.key('message')}
                fw={600}
                withAsterisk={true}
                aria-label='Message'
                label='Message'
                tabIndex={0}
                rows={4} />

            <Group
                justify='center'
                align='center'
                tabIndex={0}
                mt='md'>
                <Button
                    variant='outline'
                    color='#000'
                    size='sm'
                    m='lg'
                    fw={600}
                    type='submit'>
                    {'Submit'}
                </Button>
            </Group>
        </form>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameFeedback/type.tsx

```typescript
export interface Props {
    text : string;
    onClick : () => void;
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameFoe/index.tsx

```typescript
import { Text, rem } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameFoe : RFC<Props> = ({
    player,
}) =>
    <Text
        fw={600}
        fz={rem(20)}>
        {player.username}
    </Text>

```

## /Users/dan/code/crude-cards/src/ui/game/GameFoe/type.tsx

```typescript
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';


export interface Props {
    player : PlayerDTO;
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameFoesCardContent/GameFoesCardContent.stories.tsx

```typescript
/**
 * Storybook stories for GameFoesCardContent component
 *
 * Description:
 * This file contains Storybook stories for the GameFoesCardContent
 * component, showcasing different states of the content based on the number of players (foes).
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameFoesCardContent" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameFoesCardContent } from '.';
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';

// Default export containing Storybook metadata
const meta: Meta<typeof GameFoesCardContent> = {
    title     : 'Game/GameFoesCardContent',
    component : GameFoesCardContent,
};

export default meta;

type Story = StoryObj<typeof GameFoesCardContent>;

// Mock data for foes
const mockFoes = [
    { ...PlayerDTO.Default, id : '1', username : 'Player1' },
    { ...PlayerDTO.Default, id : '2', username : 'Player2' },
];

// Story: Default Game Foes Card Content with no foes
export const NoFoes: Story = {
    args : {
        foes : [],
    },
    render : args => <GameFoesCardContent {...args} />,
};

// Story: Game Foes Card Content with a few foes
export const FewFoes: Story = {
    args : {
        foes : mockFoes,
    },
    render : args => <GameFoesCardContent {...args} />,
};

// Story: Game Foes Card Content with more foes
export const MultipleFoes: Story = {
    args : {
        foes : [
            ...mockFoes,
            { ...PlayerDTO.Default, id : '3', username : 'Player3' },
            { ...PlayerDTO.Default, id : '4', username : 'Player4' },
        ],
    },
    render : args => <GameFoesCardContent {...args} />,
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameFoesCardContent/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardContainer } from '../GameCardContainer';
import { GameDeckLayout } from '../GameDeckLayout';
import { GameContext } from '../GameContext';
import { Stack, Text } from '@mantine/core';
import { GameFoe } from '../GameFoe';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';


export const GameFoesCardContent : RFC<Props> = ({
    foes,
}) => {

    const { gameState } = useContext(GameContext);

    if(foes.length === 0)
        return (
            <Text
                m='xl'
                fw={600}
                ta='center'
                fz='md'>
                {`No Players Yet, Share Game Code "${gameState.game_code}" to Invite People`}
            </Text>
        );

    return (
        <Stack
            justify='center'
            align='center'
            mt='xl'
            mb='xl'>
            <GameDeckLayout
                color={CardColor.Black}
                cards={[
                    <GameCardContainer
                        key='one'
                        color={CardColor.White}>
                        <>
                            <Text
                                size='md'
                                fw={600}
                                mt='xl'
                                mb='md'>
                                {'Other Players'}
                            </Text>
                            {foes.length < 2 &&
                                <Text
                                    fz='xs'
                                    mb='xl'>
                                    {'Minimum 3 Players 123'}
                                </Text>
                            }
                        </>
                    </GameCardContainer>,
                    <GameCardContainer
                        key='two'
                        color={CardColor.White}>
                        <Text
                            size='md'
                            fw={600}
                            mt='xl'
                            mb='md'>
                            {'Other Players'}
                        </Text>
                    </GameCardContainer>,
                ]} />


            {foes.map(player =>
                <GameFoe
                    player={player ?? 'Invalid Player'}
                    key={player.id} />)}
        </Stack>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameFoesCardContent/type.tsx

```typescript
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';

export interface Props {
    foes : PlayerDTO[];
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameHome/GameHome.stories.tsx

```typescript
/**
 * Storybook stories for GameHome component
 *
 * Description:
 * This file contains Storybook stories for the GameHome component,
 * showcasing different home page states, including starting a new game and joining by code.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameHome" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameHome } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameHome> = {
    title     : 'Game/GameHome',
    component : GameHome,
};

export default meta;

type Story = StoryObj<typeof GameHome>;

// Story: Default Game Home screen
export const Default: Story = {
    render : () => <GameHome />,
};

// Story: Game Home screen with pre-filled game code
export const PrefilledGameCode: Story = {
    render : () => {
        // Simulating state with a pre-filled game code
        const component = <GameHome />;

        // Normally, this state would be internal to the component.
        return component;
    },
};

// Story: Game Home screen with a mobile view
export const MobileView: Story = {
    render : () => <GameHome />,
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameHome/index.tsx

```typescript
import { Text, rem, Flex, Stack, TextInput, Button, Group, FocusTrap, Box } from '@mantine/core';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { GameCardContainer } from '../GameCardContainer';
import { GameDeckLayout } from '../GameDeckLayout';
import { useDispatch } from '@app/client/hook';
import { GameButton } from '../GameButton';
import { RFC } from '@app/ui/type';
import { Env } from '../../../Env';
import { useState } from 'react';


export const GameHome : RFC = () => {
    const dispatch = useDispatch();

    const [gameCode, setGameCode] = useState('');

    const handleStartGame = () : CA => dispatch(GameAction.createGame({}));
    const handleJoinGame  = () : CA => dispatch(GameAction.joinGame({
        game_code : gameCode,
    }));

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) : CA => {
        if(e.key === 'Enter') {
            e.preventDefault();

            return handleJoinGame();
        }

        return dispatch(GameAction.noOp());
    }

    const handleCameCodeChange = (e : React.ChangeEvent<HTMLInputElement>) : CA => {
        setGameCode(e.target.value);

        let userInput = e.target.value;

        // Remove all non alpha numeric characters from, so they
        // can get the code foo123 and all these work (below). Typing is hard, joining should
        // be forgiving and easy to sloppy (usual) input.

        // "foo123"
        // "foo123."
        // " FOO-123"
        // "foo 123"
        // "foo 123 "
        // " FOO       12     3  "
        // "  foo 123  "
        // "  f o o 1 2 3   "
        // " !! fFGGGo$$o##@@1$#2@@3~~"
        // " !! fFGGGO$$O##@@1$#2@@3~~ "
        // " !! fFGGGo$$o##@@1$#2@@3~~  "
        // "  !! FFGGGo$$o##@@1$#2@@3~~  "
        // "  !! fFGGGo$$o##@@1$#2@@3~~   "

        // todo: make a utility and unit test this
        userInput = userInput.replace(/[^a-zA-Z0-9]/g, '').trim().toLowerCase();

        // rapid join before they generally can hit the join button
        // invalid codes submitted this way do not error out, since they
        // may be the result of a typo the user is simply fixing, but
        // the odds of an accidental submission of an invalid code that
        // reaches a wrong but valid game are essentially zero mathmeticaly.
        // On mobile especially this is useful to prevent them from having to move their
        // finger to a new input, and every device works differenty and could potentially
        // interfere with the join button (cover it up). Apple does this with
        // 2FA codes on macOS, where entering the final digit auto submits the form
        // and its pleasantly suprising.

        if(userInput.length !== 6)
            return dispatch(GameAction.noOp());

        const game_code = e.target.value.trim();

        console.log('Dispatching JoinGame with game_code:', game_code);

        return dispatch(GameAction.joinGame({
            game_code,
        }));
    }

    const homepageUrl = Env.getValue<string>('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');

    const handleResize = () : void => {
        dispatch(GameAction.logRelay({
            message : 'User clicked the resize button',
            payload : {
                hello : 'world',
            },
        }));

        window.open(homepageUrl, 'CrudeCards', 'width=550,height=850');
    };

    return (
        <Stack
            justify='center'
            align='center'
            h='100vh'
            mt={rem(60)}
            ta='center'>
            <Button
                tabIndex={0}
                size='xs'
                variant='outline'
                c='#fff'
                color='#fff'
                visibleFrom='md'
                onClick={handleResize}>
                {'Resize'}
            </Button>
            <GameDeckLayout
                color={CardColor.Black}
                cards={[
                    <GameCardContainer
                        key='sdf'
                        color={CardColor.White}>
                        <Box
                            pt='xl'
                            mb='xl'>
                            <Text
                                fz={rem(60)}
                                fw={800}
                                mb='xl'
                                lh={1}>
                                {'CrudeCards'}
                            </Text>
                            <Text
                                fz={rem(32)}
                                ta='center'
                                fw={600}>
                                {'A Party Game for Terrible People.'}
                            </Text>
                        </Box>

                        <Flex
                            justify='center'
                            mb='xl'>
                            <GameButton
                                onClick={handleStartGame}
                                text='Go' />
                        </Flex>

                    </GameCardContainer>,
                    <GameCardContainer
                        key='sdssf'
                        color={CardColor.Black}>
                        <Text
                            fw={600}
                            fz={rem(30)}
                            fs='italic'
                            size='sm'>
                            {'- or -'}
                        </Text>
                        <Group
                            justify='center'
                            align='end'>
                            <form>
                                <FocusTrap active={true}>
                                    <TextInput
                                        tabIndex={0}
                                        styles={{
                                            input : {
                                                textAlign : 'center',
                                            },
                                        }}
                                        mb='md'
                                        aria-label='Game Code'
                                        onChange={handleCameCodeChange}
                                        onKeyDown={handleKeyDown}
                                        value={gameCode}
                                        w={rem(300)}
                                        size='md'
                                        pt='xs' />
                                </FocusTrap>
                                <Button
                                    mb='xl'
                                    tabIndex={0}
                                    onClick={handleJoinGame}
                                    style={{
                                        border : '1px solid #fff',
                                    }}
                                    variant='outline'
                                    aria-label='Join Game Button'
                                    c='#fff'
                                    size='md'>
                                    {'Join by Code'}
                                </Button>
                            </form>
                        </Group>
                    </GameCardContainer>,
            ]} />
        </Stack>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameJudgeConfirm/GameJudgeConfirm.stories.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { Box, CloseButton, Flex } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';
import { GameBanner } from '../GameBanner/index';
import { GameButton } from '../GameButton/index';
import { GameCard } from '../GameCard/index';
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
      <div style={{ padding : '20px' }}>
          <Box>
              <CloseButton />
              <GameBanner
                  color='#000'
                  subtitle='Confirm Your Winner'
                  text='Choosing' />
              <GameCard
                  card={{
                    id    : 'asdf',
                    color : CardColor.White,
                    text  : 'A lone card in this round',
          }}/>
              <Flex
                  mt='xl'
                  mb='xl'
                  align='center'
                  justify='center'>
                  <GameButton
                      onClick={() => {}}
                      text='Pick' />
              </Flex>
          </Box>
      </div>
  ),
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameJudgeConfirm/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { Box, CloseButton, Flex } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameCard } from '../GameCard';
import { RFC } from '@app/ui/type';


export const GameJudgeConfirm : RFC = () => {

    const handleClick = () : void => {
    }

    return (
        <Box>
            <CloseButton />
            <GameBanner
                color='#000'
                subtitle='Confirm Your Winner'
                text='Choosing' />
            <GameCard
                card={{
                    ...CardDTO.Default,
                    color : CardColor.Black,
                    text  : 'The Loch Ness Monster',
                }} />
            <GameCard
                card={{
                    ...CardDTO.Default,
                    color : CardColor.White,
                    text  : 'A Hello message 123',
                }} />
            <Flex
                mt='xl'
                mb='xl'
                align='center'
                justify='center'>
                <GameButton
                    onClick={handleClick}
                    text='Pick' />
            </Flex>
        </Box>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameLobby/GameLobby.stories.tsx

```typescript
/**
 * Storybook stories for GameLobby component
 *
 * Description:
 * This file contains Storybook stories for the GameLobby component,
 * showcasing different lobby scenarios based on the number of players.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameLobby" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameLobby } from '.';
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';

// Default export containing Storybook metadata
const meta: Meta<typeof GameLobby> = {
    title     : 'Game/GameLobby',
    component : GameLobby,
};

export default meta;

type Story = StoryObj<typeof GameLobby>;

// Mock data for foes
const mockFoes = [
    { ...PlayerDTO.Default, id : '1', username : 'Player1' },
    { ...PlayerDTO.Default, id : '2', username : 'Player2' },
];

// Story: Default Game Lobby with no players
export const NoPlayers: Story = {
    args : {
        foes : [],
    },
    render : () => <GameLobby />,
};

// Story: Game Lobby with a few players
export const FewPlayers: Story = {
    args : {
        foes : mockFoes,
    },
    render : () => <GameLobby />,
};

// Story: Game Lobby with more players
export const MultiplePlayers: Story = {
    args : {
        foes : [
            ...mockFoes,
            { ...PlayerDTO.Default, id : '3', username : 'Player3' },
            { ...PlayerDTO.Default, id : '4', username : 'Player4' },
        ],
    },
    render : () => <GameLobby />,
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameLobby/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { UsernameCardContent } from '../UsernameCardContent/index';
import { selectFoes } from '../../../client/selector/game';
import { GameCardContainer } from '../GameCardContainer';
import { ShareCardContent } from '../ShareCardContent';
import { GameDeckLayout } from '../GameDeckLayout';
import { Flex, List, Text } from '@mantine/core';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { GameFoe } from '../GameFoe';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameLobby: RFC = () => {

    const foes = useSelector(selectFoes);

    const foeCount = foes.length;

    const { gameState } = useContext(GameContext);

    const warningMessage = foes.length >= 2
        ? null
        : (
            <GameCardContainer color={CardColor.Black}>
                <Text
                    fw={600}
                    mb='xl'>
                    {'Minimum 3 Players'}
                </Text>
                <Text
                    ta='center'
                    fz='sm'
                    fw={600}>
                    {`Need ${2 - foes.length} more players`}
                </Text>
            </GameCardContainer>
        );

    const shareCard = gameState.game_stage === GameStage.DealerPickBlackCard
        ? null
        : (
            <GameCardContainer
                color={CardColor.Black}
                isClickable={true}>
                <ShareCardContent />
            </GameCardContainer>
        );

    return (
        <Flex
            justify='center'
            align='center'>
            <GameDeckLayout
                verticleWiggleFactor={100}
                cardOverlapFactor={400}
                color={CardColor.Black}
                wiggleFactor={40}
                tiltFactor={10}
                cards={[
                    shareCard,
                    <GameCardContainer
                        key='two'
                        color={CardColor.White}>
                        <UsernameCardContent />
                    </GameCardContainer>,
                    warningMessage,
                    <GameCardContainer
                        key='foes'
                        color={CardColor.White}>
                        {foeCount === 0 &&
                            <Text
                                m='xl'
                                fw={600}
                                ta='center'
                                fz='md'>
                                {`No Players Yet, Share Game Code "${gameState.game_code}" to Invite People`}
                            </Text>
                        }
                        {foeCount > 0 &&
                            <>
                                <Text
                                    size='md'
                                    fw={600}
                                    mt='xl'
                                    mb='md'>
                                    {'Other Players'}
                                </Text>
                                <List>
                                    {foes.map(player =>
                                        <List.Item key={player.id}>
                                            <GameFoe player={player ?? 'Invalid Player'} />
                                        </List.Item>,
                                    )}
                                </List>
                            </>
                        }
                    </GameCardContainer>,
            ]} />
        </Flex>
    );
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameMenu/GameMenu.stories.tsx

```typescript
/**
 * Storybook stories for GameMenu component
 *
 * Description:
 * This file contains Storybook stories for the GameMenu component,
 * showcasing different menu scenarios based on the game state and player context.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GameMenu" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GameMenu } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GameMenu> = {
    title     : 'Game/GameMenu',
    component : GameMenu,
};

export default meta;

type Story = StoryObj<typeof GameMenu>;


// Story: Default Game Menu with all options
export const Default: Story = {
    render : () => <GameMenu />,
};

// Story: Game Menu with limited options (Home stage)
export const HomeStageMenu: Story = {
    render : () => {
        return <GameMenu />;
    },
};

// Story: Game Menu with a different player context
export const DifferentPlayerContext: Story = {
    render : () => {
        return <GameMenu />;
    },
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameMenu/GameMenuItem.tsx

```typescript
import { MenuItemProps } from './type';
import { Menu } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameMenuItem : RFC<MenuItemProps> = ({
    onClick, id, text, icon,
}) => {

    const onClickItem = () : void => onClick(id);

    return (
        <Menu.Item
            onClick={onClickItem}
            leftSection={icon}>
            {text}
        </Menu.Item>
    );
};


```

## /Users/dan/code/crude-cards/src/ui/game/GameMenu/constant.tsx

```typescript
import { IconDoorExit, IconMail, IconScoreboard } from '@tabler/icons-react';
import { rem } from '@mantine/core';


export enum MenuItem {
    Scoreboard = 'Scoreboard',
    Settings   = 'Settings',
    Feedback   = 'Feedback',
    Unknown    = 'Unknown',
    Leave       = 'Leave',
}

const IconStyle = {
    height : rem(28),
    width  : rem(28),
};

export const MenuItems = [{
    icon : <IconScoreboard style={IconStyle} />,
    text : 'Scoreboard',
    id   : MenuItem.Scoreboard,
}, {
    icon : <IconMail style={IconStyle} />,
    text : 'Feedback',
    id   : MenuItem.Feedback,
}, {
    icon : <IconMail style={IconStyle} />,
    text : 'Developers',
    id   : MenuItem.Settings,
}, {
    icon : <IconDoorExit style={IconStyle} />,
    text : 'Leave',
    id   : MenuItem.Leave,
}];

```

## /Users/dan/code/crude-cards/src/ui/game/GameMenu/index.tsx

```typescript
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { Burger, Menu, Text } from '@mantine/core';
import { MenuItem, MenuItems } from './constant';
import { useDispatch } from '@app/client/hook';
import { useDisclosure } from '@mantine/hooks';
import { GameMenuItem } from './GameMenuItem';
import { GameContext } from '../GameContext';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameMenu : RFC = () => {

    const dispatch = useDispatch();
    const { gameState, currentPlayer } = useContext(GameContext);
    // const { isPhone } = useContext(App);

    const [opened, { toggle }] = useDisclosure();

    const handleClickMenu = (menuItemId : string) : CA => {
        toggle();

        return dispatch(GameAction.menuItemClicked({
            game_code : gameState.game_code,
            player_id : gameState.current_player_id,
            item_id   : menuItemId,
        }));
    }

    let FinalMenuItemList = MenuItems;

    // if they're not in a game, drop "Leave" from the menu
    if(gameState.game_stage === GameStage.Home)
        FinalMenuItemList = MenuItems.filter(
            item => item.id !== MenuItem.Leave && item.id !== MenuItem.Scoreboard);

    return (
        (<Menu
            opened={opened}
            onChange={toggle}
            shadow='xl'
            width={250}>
            <Menu.Target>
                <Burger
                    tabIndex={0}
                    aria-label='Toggle Main Menu'
                    opened={opened}
                    color='#fff'
                    size='lg' />
            </Menu.Target>
            <Menu.Dropdown>
                {currentPlayer?.username &&
                    <Menu.Label>
                        <Text
                            fz='xs'
                            fw={600}>
                            {currentPlayer?.username}
                        </Text>
                    </Menu.Label>
                }
                {FinalMenuItemList.map((item, index) =>
                    <GameMenuItem
                        key={`${index}-${item.id}`}
                        onClick={handleClickMenu}
                        icon={item.icon}
                        text={item.text}
                        id={item.id} />,
                )}
            </Menu.Dropdown>
        </Menu>)
    );
};


```

## /Users/dan/code/crude-cards/src/ui/game/GameMenu/type.tsx

```typescript
export interface MenuItemProps {
    onClick : (id : string) => void;
    icon    : React.ReactNode;
    text    : string;
    id      : string;
}

```

## /Users/dan/code/crude-cards/src/ui/game/GamePlayerConfirm/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { Box, CloseButton, Flex } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameCard } from '../GameCard';
import { RFC } from '@app/ui/type';


export const GamePlayerConfirm : RFC = () => {

    const handleClick = () : void => {
    }

    return (
        <Box>
            <CloseButton />
            <GameBanner
                color='#000'
                subtitle='Confirm Your Choice'
                text='Play this?' />
            <GameCard
                card={{
                    ...CardDTO.Default,
                    color : CardColor.Black,
                    text  : 'Doing the Hustle',
                }} />
            <GameCard
                card={{
                    ...CardDTO.Default,
                    color : CardColor.Black,
                    text  : 'Doing the Hustle',
                }} />
            <Flex
                mt='xl'
                align='center'
                justify='center'>
                <GameButton
                    onClick={handleClick}
                    text='Yep' />
            </Flex>
        </Box>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GamePlayerSelection/GamePlayerSelection.stories.tsx

```typescript
/**
 * Storybook stories for GamePlayerConfirm component
 *
 * Description:
 * This file contains Storybook stories for the GamePlayerConfirm component,
 * showcasing the confirmation screen when a player is choosing a card.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GamePlayerConfirm" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GamePlayerConfirm } from '../GamePlayerConfirm/index';


// Default export containing Storybook metadata
const meta: Meta<typeof GamePlayerConfirm> = {
    title     : 'Game/GamePlayerConfirm',
    component : GamePlayerConfirm,
};

export default meta;

type Story = StoryObj<typeof GamePlayerConfirm>;

// Story: Default Game Player Confirm screen
export const Default: Story = {
    render : () => <GamePlayerConfirm />,
};

// Story: Game Player Confirm screen with different card text
export const CustomCardText: Story = {
    render : () => <GamePlayerConfirm />,
};

// Story: Game Player Confirm screen with a long subtitle
export const LongSubtitle: Story = {
    render : () => <GamePlayerConfirm />,
};

```

## /Users/dan/code/crude-cards/src/ui/game/GamePlayerSelection/index.tsx

```typescript
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { CA } from '../../../constant/framework/CoreAction';
import { GameAction } from '../../../client/action/game.action';
import { useDispatch } from '../../../client/hook';
import { GameContext } from '../GameContext';
import { GameDeck } from '../GameDeck';
import { Flex } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GamePlayerSelection : RFC = () => {

    const {
        playerCards, playerDealtCard,
    } = useContext(GameContext);

    const dispatch = useDispatch();

    const handlePlayWhiteCard = (card : CardDTO) : CA =>
        dispatch(GameAction.playerSelectCard({
            card_id : card.id,
        }));

    return (
        <Flex
            justify='center'
            align='center'
            mb='xl'>
            {!playerDealtCard &&
                <GameDeck
                    onCardClicked={handlePlayWhiteCard}
                    cards={playerCards} />
            }
        </Flex>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GamePopup/GamePopup.stories.tsx

```typescript
/**
 * Storybook stories for GamePopup component
 *
 * Description:
 * This file contains Storybook stories for the GamePopup component,
 * showcasing different popup scenarios based on the popup type.
 *
 * Usage:
 * Run Storybook and navigate to "Game/GamePopup" to view these stories in the Storybook UI.
 */

import { Meta, StoryObj } from '@storybook/react';
import { GamePopup } from '.';

// Default export containing Storybook metadata
const meta: Meta<typeof GamePopup> = {
    title     : 'Game/GamePopup',
    component : GamePopup,
};

export default meta;

type Story = StoryObj<typeof GamePopup>;

// Story: Default Game Popup displaying the scoreboard
export const ScoreboardPopup: Story = {
    render : () => {
        // Assume GamePopupType is set to Scoreboard in the global context
        return <GamePopup />;
    },
};

// Story: Game Popup displaying feedback form
export const FeedbackPopup: Story = {
    render : () => {
        // Assume GamePopupType is set to Feedback in the global context
        return <GamePopup />;
    },
};

// Story: Game Popup displaying settings
export const SettingsPopup: Story = {
    render : () => {
        // Assume GamePopupType is set to Settings in the global context
        return <GamePopup />;
    },
};

// Story: Game Popup displaying quit confirmation
export const QuitPopup: Story = {
    render : () => {
        // Assume GamePopupType is set to Quit in the global context
        return <GamePopup />;
    },
};

// Story: Game Popup displaying an error
export const ErrorPopup: Story = {
    render : () => {
        // Assume GamePopupType is set to an invalid or unexpected value
        return <GamePopup />;
    },
};

```

## /Users/dan/code/crude-cards/src/ui/game/GamePopup/index.tsx

```typescript
import { GamePopupType } from '../../../api/src/constant/game-popup-type.enum';
import { CA } from '../../../constant/framework/CoreAction';
import { GameAction } from '../../../client/action/game.action';
import { GameScoreboard } from '../GameScoreboard';
import { Flex, Modal, rem } from '@mantine/core';
import { useDispatch } from '@app/client/hook';
import { GameFeedback } from '../GameFeedback';
import { ReactNode, useContext } from 'react';
import { GameContext } from '../GameContext';
import { GameError } from '../GameError';
import { GameQuit } from '../GameQuit';
import { RFC } from '@app/ui/type';


export const GamePopup : RFC= () => {

    const { popupTypeId } = useContext(GameContext);
    const dispatch = useDispatch();

    if(!popupTypeId) return null;

    const handleClosePopup = () : CA => dispatch(GameAction.closePopup());

    let popup : ReactNode | null = null;

    switch(popupTypeId) {

        case GamePopupType.Scoreboard: popup = <GameScoreboard />; break;
        case GamePopupType.Feedback:   popup = <GameFeedback   />; break;
        case GamePopupType.Leave:      popup = <GameQuit       />; break;

        default: popup = <GameError />; break;
    }

    return (
        <Modal
            onClose={handleClosePopup}
            withCloseButton={true}
            radius={rem(40)}
            centered={true}
            opened={true}
            size='sm'
            overlayProps={{
                backgroundOpacity : 0.12,
                blur              : 5,
            }}>
            <Flex
                p='xl'
                justify='center'>
                {popup}
            </Flex >
        </Modal>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GamePopup/type.tsx

```typescript
import { PropsWithChildren } from 'react';


export type Props = PropsWithChildren;

```

## /Users/dan/code/crude-cards/src/ui/game/GameQuit/GameQuit.stories.tsx

```typescript
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

```

## /Users/dan/code/crude-cards/src/ui/game/GameQuit/index.tsx

```typescript
import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { Box, Center, Text } from '@mantine/core';
import { useDispatch } from '@app/client/hook';
import { GameButton } from '../GameButton';
import { RFC } from '@app/ui/type';


export const GameQuit : RFC = () => {

    const dispatch = useDispatch();

    const handleClick = () : CA => {
        dispatch(GameAction.leaveGame({}));

        console.log('Sent Message to Disconnect, Closing Popup Window')

        return dispatch(GameAction.closePopup());
    }

    return (
        <Box pb='xl'>
            <Text
                ta='center'
                fz='xl'
                pb='xl'
                fw={600}
                mb='md'>
                {'Double Checking'}
            </Text>
            <Center>
                <GameButton
                    onClick={handleClick}
                    text='Exit' />
            </Center>
        </Box>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameQuit/type.tsx

```typescript
export interface Props {
    onClick : () => void;
    text    : string;
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameResults/index.tsx

```typescript
import { selectSessionEndMessage } from '../../../client/selector/game';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardContainer } from '../GameCardContainer';
import { GameStatusTable } from '../GameStatusTable';
import { GameDeckLayout } from '../GameDeckLayout';
import { useViewportSize } from '@mantine/hooks';
import { Box, Flex, Text } from '@mantine/core';
import { useSelector } from '@app/client/hook';
import { GameCard } from '../GameCard';
import Confetti from 'react-confetti'
import { RFC } from '@app/ui/type';

import {
    selectPreviousHandDealerCard, selectPreviousHandWinnerCard,
    selectAllPlayerStatus, selectIsPlayerWinner,
} from '../../../client/selector/game';


export const GameResults: RFC = () => {

    const previousHandDealerCard = useSelector(selectPreviousHandDealerCard);
    const previousHandWinnerCard = useSelector(selectPreviousHandWinnerCard);
    const sessionEndMessage = useSelector(selectSessionEndMessage);
    const allPlayerStatus = useSelector(selectAllPlayerStatus);
    const isWinner = useSelector(selectIsPlayerWinner);


    const { height, width } = useViewportSize();

    return (
        <Flex
            justify='center'
            align='center'>
            {isWinner &&
                <Confetti
                    width={width}
                    height={height} />
            }
            <GameDeckLayout
                color={CardColor.Black}
                cards={[
                    <GameCard
                        key='one'
                        card={previousHandDealerCard} />,
                    <GameCard
                        key='two'
                        card={previousHandWinnerCard} />,
                    <GameCard
                        key='asdf'
                        card={{
                            id    : 'asdfwef',
                            color : CardColor.Black,
                            text  : sessionEndMessage,
                        }} />,
                    <Box
                        mt='xl'
                        key='three'>
                        <GameCardContainer color={CardColor.Black}>
                            <Text
                                fz='sm'
                                ta='center'>
                                {'3 Points to Win'}
                            </Text>
                            <GameStatusTable
                                title='Scoreboard'
                                playerStatusList={allPlayerStatus!}
                                shouldShowDone={false}
                                shouldShowScore={true} />
                        </GameCardContainer>
                    </Box>,
                ]} />
        </Flex>
    );
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameScoreboard/index.tsx

```typescript
import { selectAllPlayerStatus } from '../../../client/selector/game';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStatusTable } from '../GameStatusTable';
import { useSelector } from '@app/client/hook';
import { Stack, Text } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameScoreboard : RFC = () => {


    const allPlayerStatus = useSelector(selectAllPlayerStatus);

    return (
        <Stack>
            <Text
                fz='sm'
                fw={600}
                ta='center'>
                {'3 Points to Win'}
            </Text>
            <GameStatusTable
                textColor={CardColor.Black}
                playerStatusList={allPlayerStatus!}
                shouldShowScore={true}
                shouldShowDone={false} />
        </Stack>

    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameShare/GameShare.stories.tsx

```typescript
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

```

## /Users/dan/code/crude-cards/src/ui/game/GameShare/index.tsx

```typescript
import { Flex, Group, rem, Stack } from '@mantine/core';
import { IconPaperclip } from '@tabler/icons-react';
import { RFC } from '@app/ui/type';
import { Env } from '../../../Env';
import {
    WhatsappShareButton, TwitterShareButton,
    EmailShareButton, WhatsappIcon,
    TwitterIcon, EmailIcon,
} from "react-share";


const shareUrl = Env.getValue<string>('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');

export const GameShare: RFC = () =>
    <Group
        fz='xs'
        style={{}}>
        <Flex
            justify='center'
            align='center'
            ta='center'
            style={{
                borderRadius    : '4px',
                backgroundColor : '#9b1717',
                color           : '#fff',
                width           : rem(64),
                height          : rem(64),
            }}>
            <Stack align='center'>
                <IconPaperclip
                    size={30}
                    stroke={2} />
            </Stack>
        </Flex>
        <EmailShareButton
            url={shareUrl}
            subject='Game Invite'>
            <EmailIcon />
        </EmailShareButton>
        <TwitterShareButton
            url={shareUrl}
            title='Game Invite'>
            <TwitterIcon />
        </TwitterShareButton>
        <WhatsappShareButton
            url={shareUrl}
            title='Game Invite'>
            <WhatsappIcon />
        </WhatsappShareButton>
    </Group>

```

## /Users/dan/code/crude-cards/src/ui/game/GameShare/type.tsx

```typescript
export interface Props {
    gameCode : string;
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameStatusTable/GameStatusTable.stories.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { Meta, StoryObj } from '@storybook/react';
import { GameStatusTable } from '.';
import { PlayerStatus } from '../type';


// Set up default exports for Storybook
const meta: Meta<typeof GameStatusTable> = {
  title     : 'Components/Game/GameStatusTable',
  component : GameStatusTable,
};

export default meta;

type Story = StoryObj<typeof GameStatusTable>;

const mockPlayerStatusList = [
  {
    player   : { username : 'Player 1' },
    isDone   : true,
    isWinner : false,
    score    : 2,
  },
  {
    player   : { username : 'Player 2' },
    isDone   : true,
    isWinner : true,
    score    : 3,
  },
  {
    player   : { username : 'Player 3' },
    isDone   : false,
    isWinner : false,
    score    : 1,
  },
] as PlayerStatus[];

// Default story showing player statuses with both score and "done" columns enabled
export const Default: Story = {
  args : {
    playerStatusList : mockPlayerStatusList,
    title            : 'Current Status',
    shouldShowScore  : true,
    shouldShowDone   : true,
    textColor        : CardColor.White,
  },
};

// Story without showing the "done" status column
export const WithoutDoneColumn: Story = {
  args : {
    playerStatusList : mockPlayerStatusList,
    title            : 'Status Without Done Column',
    shouldShowScore  : true,
    shouldShowDone   : false,
    textColor        : CardColor.White,
  },
};

// Story without showing the score column
export const WithoutScoreColumn: Story = {
  args : {
    playerStatusList : mockPlayerStatusList,
    title            : 'Status Without Score Column',
    shouldShowScore  : false,
    shouldShowDone   : true,
    textColor        : CardColor.White,
  },
};

// Story with custom text color and without title
export const CustomTextColor: Story = {
  args : {
    playerStatusList : mockPlayerStatusList,
    title            : '',
    shouldShowScore  : true,
    shouldShowDone   : true,
    textColor        : CardColor.Black,
  },
};

// Story with no data (empty playerStatusList)
export const NoPlayers: Story = {
  args : {
    playerStatusList : [],
    title            : 'No Players Yet',
    shouldShowScore  : true,
    shouldShowDone   : true,
    textColor        : CardColor.White,
  },
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameStatusTable/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import classes from './GameStatusTable.module.css';
import { Group, Table, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameStatusTable : RFC<Props> = ({
    playerStatusList, title, shouldShowScore,
    shouldShowDone, textColor = CardColor.White,
}) => {
    return (
        <>
            {title &&
                <Text
                    ta='center'
                    fw={600}
                    mb='xl'
                    fz='md'>
                    {title}
                </Text>
            }
            <Table
                verticalSpacing='xs'
                p={0}
                m={0}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            <Text
                                fw={600}
                                fz='xs'>
                                {'Player'}
                            </Text>
                        </Table.Th>
                        {shouldShowDone &&
                            <Table.Th>
                                <Text
                                    fw={600}
                                    ta='center'
                                    fz='xs'>
                                    {'Done?'}
                                </Text>
                            </Table.Th>
                        }
                        {shouldShowScore &&
                            <Table.Th>
                                <Text
                                    fw={600}
                                    ta='center'
                                    fz='xs'>
                                    {'Score'}
                                </Text>
                            </Table.Th>
                        }
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {playerStatusList.map(({
                        isDone, isWinner, player, score,
                    }, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>
                                <Text
                                    c={textColor}
                                    fz={isWinner ? 'sm' : 'xs'}
                                    fw={isWinner ? 600 : 400}
                                    className={isWinner ? classes.neonText : ''}>
                                    {player.username}
                                </Text>
                            </Table.Td>
                            {shouldShowDone &&
                                <Table.Td>
                                    <Text ta='center'>
                                        {isDone &&
                                            <IconCheck
                                                size={40}
                                                stroke={4} />
                                        }
                                    </Text>
                                </Table.Td>
                            }
                            {shouldShowScore &&
                                <Table.Td>
                                    <Group
                                        align='center'
                                        justify='center'>
                                        {isWinner &&
                                            <Text
                                                fz='xs'
                                                fw={600}
                                                className={classes.neonText}>
                                                {'+1 point'}
                                            </Text>
                                        }
                                        <Text
                                            fw={isWinner ? 600 : 400}
                                            className={isWinner ? classes.neonText : ''}
                                            ta='center'>
                                            {score}
                                        </Text>
                                    </Group>
                                </Table.Td>
                            }
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameStatusTable/type.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { PlayerStatus } from '../type';


export interface Props {
    playerStatusList : PlayerStatus[];
    shouldShowScore  : boolean;
    shouldShowDone   : boolean;
    textColor       ?: CardColor;
    title           ?: string;
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/DealerPickBlackCard.tsx

```typescript
import { GameContext } from '../../GameContext';
import { GameBanner } from '../../GameBanner';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const DealerPickBlackCard : RFC = () => {

    const { isDealer } = useContext(GameContext);

    if(!isDealer) return null;

    return (
        <GameBanner
            subtitle='You Are Dealer'
            text='Pick a Card'
            color='#fff' />
    );
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/DealerPickWinner.tsx

```typescript
import { GameContext } from '../../GameContext';
import { GameBanner } from '../../GameBanner';
import { Stack } from '@mantine/core';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const DealerPickWinner : RFC = () => {

    const { dealerDealtCard, isDealer } = useContext(GameContext);

    if(!isDealer)
        return (
            <GameBanner
                color='#fff'
                subtitle='Waiting on Dealer'
                text='Judging' />
        );

    return (
        <Stack
            justify='center'
            align='center'
            pb='xl'>
            <GameBanner
                color='#fff'
                text='Pick a Winner'
                subtitle={dealerDealtCard?.text ?? ''} />
        </Stack>
    );


}

```

## /Users/dan/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/GameHomeHeader.tsx

```typescript
import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameContext } from '../../GameContext';
import { GameCard } from '../../GameCard';
import { Flex } from '@mantine/core';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const GameHomeHeader : RFC = () => {

    const { gameState : { error_message } } = useContext(GameContext);

    if(!error_message) return null;

    return (
        <Flex
            justify='center'
            align='center'>
            <GameCard
                card={{
                ...CardDTO.Default,
                color : CardColor.Black,
                text  : error_message,
            }} />
        </Flex>
    );
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/GameResultsHeader.tsx

```typescript
import { selectIsPlayerWinner, selectWinner } from '@app/client/selector/game';
import { useDispatch, useSelector } from '../../../../client/hook';
import { GameAction } from '../../../../client/action/game.action';
import { CA } from '../../../../constant/framework/CoreAction';
import { Stack, Text, Center } from '@mantine/core';
import classes from '../GameTemplate.module.css';
import { GameContext } from '../../GameContext';
import { GameButton } from '../../GameButton';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const GameResultsHeader : RFC = () => {

    const isWinner = useSelector(selectIsPlayerWinner);
    const winner = useSelector(selectWinner);

    const { isDealer } = useContext(GameContext);

    const dispatch = useDispatch();

    const handleNextHand = () : CA => dispatch(GameAction.nextHand({}));

    return (
        <Stack mb='md'>
            <Text
                fw={600}
                fz='lg'
                pt='xs'
                ta='center'>
                {'WINNER IS'}
            </Text>
            <Text
                className={classes.neonText}
                fw={200}
                ta='center'
                fz='lg'>
                {isWinner
                    ? 'YOU!'
                    : winner?.username
                }
            </Text>
            {!isDealer &&
                <Text
                    fz='xs'
                    mt='xl'
                    fw={600}
                    ta='center'>
                    {'Waiting on Dealer'}
                </Text>
            }
            {isDealer &&
                <Center
                    mt='xl'
                    mb='md'>
                    <GameButton
                        onClick={handleNextHand}
                        text='Next' />
                </Center>
            }
        </Stack>
    );
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/HeaderContent.tsx

```typescript
import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { DealerPickBlackCard } from './DealerPickBlackCard';
import { PlayerPickWhiteCard } from './PlayerPickWhiteCard';
import { selectIsDealer } from '@app/client/selector/game';
import { GameResultsHeader } from './GameResultsHeader';
import { DealerPickWinner } from './DealerPickWinner';
import { GameContext } from '../../GameContext';
import { LobbyHeader } from './LobbyHeader';
import { useSelector } from 'react-redux';
import { RFC } from '../../../type';
import { Box } from '@mantine/core';
import { useContext } from 'react';
import { GameHomeHeader } from './GameHomeHeader';


export const HeaderContent : RFC = () => {

    const { gameState } = useContext(GameContext);

    const isDealer = useSelector(selectIsDealer);

    switch(gameState.game_stage) {
        case GameStage.GameComplete:
        case GameStage.Unknown:
            return null;

        case GameStage.Home:

            return <GameHomeHeader />;

        case GameStage.DealerPickBlackCard:  {
            if(isDealer)
                return <DealerPickBlackCard />;

            if(gameState.hand_number > 0)
                return <GameResultsHeader />;

            return <LobbyHeader />;
        }
        case GameStage.PlayerPickWhiteCard: return <PlayerPickWhiteCard />;
        case GameStage.DealerPickWinner   : return <DealerPickWinner    />;
        case GameStage.GameResults        : return <GameResultsHeader />;
        case GameStage.Lobby              : return <LobbyHeader         />;

        default: return <Box />;
    }
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/LobbyHeader.tsx

```typescript
import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { GameAction } from '../../../../client/action/game.action';
import { selectIsHost } from '../../../../client/selector/game';
import { CA } from '../../../../constant/framework/CoreAction';
import { GameContext } from '../../GameContext';
import { useDispatch } from '@app/client/hook';
import { GameBanner } from '../../GameBanner';
import { GameButton } from '../../GameButton';
import { Center, Stack } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const LobbyHeader: RFC = () => {

    const { gameState } = useContext(GameContext);
    const dispatch = useDispatch();

    const handleStartGame = (): CA =>
        dispatch(GameAction.startGame({}));

    let subtitleMessage = undefined;

    const isHost = useSelector(selectIsHost);

    const playerCount = gameState.player_list.length;
    const needMoreCount = 3 - playerCount;

    if (gameState.game_stage === GameStage.DealerPickBlackCard)
        subtitleMessage = 'Dealer is Starting';
    else if (playerCount < 3)
        subtitleMessage = `Need ${needMoreCount} More Player${needMoreCount > 1 ? 's' : ''} to Start`;
    else if (playerCount >= 3 && isHost)
        subtitleMessage = 'Players Ready';
    else if (playerCount >= 3)
        subtitleMessage = 'Waiting on Host to Start';

    return (
        <Stack>
            <GameBanner
                subtitle={subtitleMessage}
                text='Lobby'
                color='#fff' />
            {isHost && gameState.player_list.length >= 3 &&
                <Center m='xl'>
                    <GameButton
                        onClick={handleStartGame}
                        text='Start' />
                </Center>
            }
        </Stack>
    );
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/PlayerPickWhiteCard.tsx

```typescript
import { GameContext } from '../../GameContext';
import { GameBanner } from '../../GameBanner';
import { Box } from '@mantine/core';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const PlayerPickWhiteCard : RFC = () => {

    const { isDealer, playerDealtCard, dealerDealtCard } = useContext(GameContext);

    if(isDealer)
        return (
            <GameBanner
                text='Waiting'
                subtitle='Players Picking Card'
                color='#fff' />
        );

    return (
        <Box pt='md'>
            {!playerDealtCard && !isDealer &&
                <Box mb='xl'>
                    <GameBanner
                        text='Play a Card'
                        subtitle={dealerDealtCard?.text ?? '[WHOOPS]'}
                        color='#fff' />
                </Box>
            }
            {playerDealtCard && !isDealer &&
                <Box
                    ml='xl'
                    mr='xl'
                    pb='lg'>
                    <GameBanner
                        text='Waiting'
                        subtitle='Players Picking Card'
                        color='#fff' />
                </Box>
            }
        </Box>
    );
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/index.tsx

```typescript
import classes from '../GameTemplate.module.css';
import { HeaderContent } from './HeaderContent';
import { Box, Stack} from '@mantine/core';
import { GameMenu } from '../../GameMenu';
import { RFC } from '@app/ui/type';


export const GameTemplateHeader : RFC = () =>
    <Stack className={classes.menu}>
        <Box className={classes.pi}>
            <Box className={classes.symbol}>
                <GameMenu />
            </Box>
        </Box>
        <Box>
            <HeaderContent />
        </Box>
    </Stack>

```

## /Users/dan/code/crude-cards/src/ui/game/GameTemplate/index.tsx

```typescript
import { AppShell, Box, Group, MantineProvider, rem } from '@mantine/core';
import { GameTemplateHeader } from './GameTemplateHeader';
import { GameTheme } from '@app/client/GameTheme';
import classes from './GameTemplate.module.css';
import { useElementSize } from '@mantine/hooks';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { GamePopup } from '../GamePopup';
import { GameToast } from '../GameToast';
import { RFC } from '@app/ui/type';
import { Props } from './type';
import {
    selectDealerDealtCard, selectPlayerDealtCard,
    selectCurrentPlayer, selectDealerCards,
    selectGameState, selectPopupTypeId,
    selectPlayerCards, selectIsDealer,
} from '@app/client/selector/game';


export const GameTemplate : RFC<Props>= ({
    children,
}) => {

    const dealerDealtCard = useSelector(selectDealerDealtCard);
    const playerDealtCard = useSelector(selectPlayerDealtCard);
    const currentPlayer   = useSelector(selectCurrentPlayer  );
    const dealerCards     = useSelector(selectDealerCards    );
    const playerCards     = useSelector(selectPlayerCards    );
    const popupTypeId     = useSelector(selectPopupTypeId    );
    const gameState       = useSelector(selectGameState      );
    const isDealer        = useSelector(selectIsDealer       );

    const { ref, height : headerHeight } = useElementSize();

    return (
        <GameContext.Provider
            value={{
                currentPlayer, dealerCards, playerCards,
                dealerDealtCard, playerDealtCard,
                gameState,  isDealer, popupTypeId,
                headerHeight,
            }}>
            <MantineProvider
                defaultColorScheme='dark'
                forceColorScheme='dark'
                theme={GameTheme}>
                <AppShell
                    className={classes.appRoot}
                    withBorder={false}>
                    <AppShell.Header ref={ref}>
                        <GameTemplateHeader />
                    </AppShell.Header>
                    <AppShell.Main
                        pt={rem(headerHeight === 0
                            ? 0
                            : headerHeight +  50,
                        )}>
                        <GamePopup />
                        <GameToast />
                        <Group
                            wrap='nowrap'
                            justify='space-between'>
                            <Box
                                c='#000'
                                w={rem(0)}
                                hiddenFrom='xs'>
                                {'.'}
                            </Box>
                            <Box
                                c='#000'
                                w='100%'>
                                {children}
                            </Box>
                            <Box
                                w={rem(0)}
                                hiddenFrom='xs'>
                                {'.'}
                            </Box>
                        </Group>
                    </AppShell.Main>
                </AppShell>
            </MantineProvider>
        </GameContext.Provider>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameTemplate/type.tsx

```typescript

import React from 'react';


export type Props = React.PropsWithChildren<{
    appId: string;
}>;

```

## /Users/dan/code/crude-cards/src/ui/game/GameTimeout/GameTimeout.stories.tsx

```typescript
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

```

## /Users/dan/code/crude-cards/src/ui/game/GameTimeout/index.tsx

```typescript
import { Box, Text, Title } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameTimeout : RFC = () =>
    <Box
        mb='md'
        mt='lg'
        ta='center'>
        <Title>
            {'Too Slow'}
        </Title>
        <Text>
            {'You didn\'t pick a card and are banished from this round.'}
        </Text>
    </Box>

```

## /Users/dan/code/crude-cards/src/ui/game/GameToast/index.tsx

```typescript
import { selectTimer } from '@app/client/selector/game';
import { useSelector } from 'react-redux';
import classes from './style.module.css';
import { Box} from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameToast : RFC= () => {

    // get the current tick cound from selectoar
    const timer = useSelector(selectTimer);

    if(!timer.timerType)
        return null;

    let color = '#fff';
    let jiggleClass = '';

    // todo: finish making this thing wiggle a bunch
    // when it gets toward zero
    if(timer.timeLeft <= 3) {
        jiggleClass = 'jiggle-high';
        color = '#f00';
    } else if(timer.timeLeft <= 5) {
        jiggleClass = 'jiggle-medium';
        color = '#ff8c00';
    } else if(timer.timeLeft <= 10) {
        jiggleClass = 'jiggle-low';
        color = '#ffff00';
    }

    return (
        <Box className={classes.toast  + ' ' + jiggleClass} >
            <Box
                className={classes.symbol}
                c={color}
                id='pi'
                style={{
                    border : `2px solid ${color}`,
                }}>
                {`${timer.timeLeft}s Left`}
            </Box>
        </Box>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/GameToast/type.tsx

```typescript
import { PropsWithChildren } from 'react';


export type Props = PropsWithChildren;

```

## /Users/dan/code/crude-cards/src/ui/game/GameView/index.tsx

```typescript
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { GameDealerSelection } from '../GameDealerSelection/index';
import { GamePlayerSelection } from '../GamePlayerSelection';
import { GameAction } from '../../../client/action/game.action';
import { GameDealerJudge } from '../GameDealerJudge';
import { GameResults } from '../GameResults/index';
import { GameComplete } from '../GameComplete';
import { useDispatch } from '@app/client/hook';
import { useContext, useEffect } from 'react';
import { GameContext } from '../GameContext';
import { GameHome } from '../GameHome/index';
import { GameWaiting } from '../GameWaiting';
import { GameLobby } from '../GameLobby';
import { GameError } from '../GameError';
import { useRouter } from 'next/router';
import { RFC } from '../../type';


export const GameView : RFC = () => {

    const dispatch = useDispatch();
    const router   = useRouter();

    const { gameCode } = router.query;

    const { playerDealtCard, isDealer, gameState } = useContext(GameContext);

    useEffect(() => {
        if (router.pathname === '/game/game_code')
            if (gameCode && gameCode !== gameState.game_code)
                dispatch(GameAction.joinGame({
                    game_code : gameCode as string,
                }));
  }, [router.pathname, gameCode, gameState.game_code, dispatch]);

    switch(gameState.game_stage) {

        case GameStage.Home:
        case GameStage.Unknown:      return <GameHome />;
        case GameStage.GameComplete: return <GameComplete />;
        case GameStage.GameResults : return <GameResults />;
        case GameStage.Lobby       : return <GameLobby />;

        case GameStage.DealerPickBlackCard: {
            if(isDealer)
                return<GameDealerSelection />

            if(gameState.hand_number > 0)
                return <GameResults />;

            return <GameLobby />;
        }

        case GameStage.PlayerPickWhiteCard:
            return isDealer || playerDealtCard
                ? <GameWaiting />
                : <GamePlayerSelection />

        case GameStage.DealerPickWinner:
            return isDealer
                ? <GameDealerJudge />
                : <GameWaiting />;

        default:
            return <GameError />;
    }
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameWaiting/index.tsx

```typescript
import { selectIsDealer, selectPlayerWaitStatus } from '../../../client/selector/game';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardContainer } from '../GameCardContainer';
import { GameStatusTable } from '../GameStatusTable';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { Flex, Stack } from '@mantine/core';
import { GameDeck } from '../GameDeck';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameWaiting: RFC = () => {

    const {
        dealerDealtCard, playerDealtCard,
        gameState: {
            game_stage, dealer_id,
        },
    } = useContext(GameContext);

    const playerStatusList = useSelector(selectPlayerWaitStatus);
    const isDealer = useSelector(selectIsDealer);

    const playersExceptDealer = playerStatusList.filter(
        playerStatus => playerStatus.player.id !== dealer_id);

    return (
        <Flex
            justify='center'
            align='center'
            mt='xl'>
            <Stack>
                {isDealer &&
                    <GameDeck
                        cards={[
                            dealerDealtCard!,
                        ]} />
                }
                {!isDealer &&
                    <GameDeck
                        cards={[
                            dealerDealtCard!,
                            playerDealtCard!,
                        ]} />
                }
                {game_stage === GameStage.PlayerPickWhiteCard &&

                    <GameCardContainer color={CardColor.Black}>
                        <GameStatusTable
                            playerStatusList={playersExceptDealer}
                            shouldShowScore={false}
                            shouldShowDone={true}
                            title='Waiting on Players' />
                    </GameCardContainer>
                }
            </Stack>
        </Flex>
    );
}

```

## /Users/dan/code/crude-cards/src/ui/game/GameWiggleBox/GameWiggleBox.stories.tsx

```typescript
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

```

## /Users/dan/code/crude-cards/src/ui/game/GameWiggleBox/index.tsx

```typescript
import { Box } from '@mantine/core';
import seedrandom from 'seedrandom';
import { RFC } from '../../type';
import { Props } from './type';


export const GameWiggleBox : RFC<Props> = ({
    children, index,

    verticleWiggleFactor = 50,
    cardOverlapFactor    = 40,
    wiggleFactor         = 6,
    tiltFactor           = 8,
}) => {

    // stops random wobbling on rerender
    const rand = seedrandom(`${index}`);

    return (
        <Box
            style={{
                width  : '100%',
                rotate : `${rand() * tiltFactor - (tiltFactor / 2)}deg`,
                left   : wiggleFactor * (rand() - 0.5) * 10,
                top    : -cardOverlapFactor * (index + 1) + rand() * verticleWiggleFactor,
            }}>
            {children}
        </Box>
    );
};

```

## /Users/dan/code/crude-cards/src/ui/game/GameWiggleBox/type.tsx

```typescript
import { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
    verticleWiggleFactor ?: number;
    cardOverlapFactor    ?: number;
    wiggleFactor         ?: number;
    tiltFactor           ?: number;
    index                 : number;
}>;

```

## /Users/dan/code/crude-cards/src/ui/game/ShareCardContent/index.tsx

```typescript
import { Stack, Text, Tooltip, rem } from '@mantine/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import { GameContext } from '../GameContext';
import { useContext, useState } from 'react';
import { useTimeout } from '@mantine/hooks';
import { GameShare } from '../GameShare';
import { RFC } from '@app/ui/type';


export const ShareCardContent: RFC = () => {

    const { gameState } = useContext(GameContext);

    const [isCopied, setCopied] = useState(false);

    const { start } = useTimeout(() => setCopied(false), 3000);

    const handleCopy = () => {
        setCopied(true);
        start();
    };

    return (
        <>
            <Text
                ta='center'
                fw={600}
                mt='xl'>
                {'Share Game Code'}
            </Text>
            <Stack
                justify='center'
                align='center'>
                <CopyToClipboard
                    text={gameState.game_code!}
                    onCopy={handleCopy}>
                    <Tooltip
                        label='Copied'
                        opened={isCopied}
                        position='bottom'
                        offset={0}>
                        <Text
                            ta='center'
                            fw={600}
                            fz={rem(80)}>
                            {gameState.game_code}
                        </Text>
                    </Tooltip>
                </CopyToClipboard>
                <Text fz='xs'>
                    {'Share With Friends to Join Game'}
                </Text>

                <GameShare />
            </Stack>
        </>
    );
}


```

## /Users/dan/code/crude-cards/src/ui/game/TextInputDebounced/TextInputDebounced.stories.tsx

```typescript
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

```

## /Users/dan/code/crude-cards/src/ui/game/TextInputDebounced/index.tsx

```typescript
import { CA } from '../../../constant/framework/CoreAction';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const TextInputDebounced : RFC<Props> = ({
    onChange, onBlur, value, label, name,
    milliseconds = 3000,
    size ='md',
}) => {
    const [text, setText] = useState(value);
    const [debounced] = useDebouncedValue(text, milliseconds);

    useEffect(() => {
        if (debounced !== value)
            onChange(debounced, name);

    }, [debounced, name, onChange, value]);

    const handleChange = (evt : React.ChangeEvent<HTMLInputElement>) : void => {
        setText(evt.currentTarget.value);
    };

    const handleBlur = () : CA => onBlur(text, name)

    const handleKeyDownTextBox = (
        event : React.KeyboardEvent<HTMLInputElement>,
    ) : CA | void => {
        if (event.key === 'Enter')
            return handleBlur();
    };

    return (
        <TextInput
            onKeyDown={handleKeyDownTextBox}
            onChange={handleChange}
            onBlur={handleBlur}
            spellCheck={false}
            label={label}
            value={text}
            size={size}
            styles={{
                input : {
                    borderRadius : '10px',
                    border       : '1px solid #000',
                    textAlign    : 'center',
                },
            }} />
    );
};

```

## /Users/dan/code/crude-cards/src/ui/game/TextInputDebounced/type.tsx

```typescript
import { CA } from '../../../constant/framework/CoreAction';
import { MantineSize } from '@mantine/core';


export interface Props {
    milliseconds ?: number;
    onChange      : (value : string, name : string) => CA;
    onBlur        : (value : string, name : string) => CA;
    label        ?: string | null;
    value         : string;
    name          : string;
    size          : MantineSize;
}

```

## /Users/dan/code/crude-cards/src/ui/game/UsernameCardContent/index.tsx

```typescript
import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { TextInputDebounced } from '../TextInputDebounced';
import { useDispatch } from '../../../client/hook';
import { GameContext } from '../GameContext';
import { Stack, Text } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const UsernameCardContent: RFC = () => {

    const { gameState, currentPlayer } = useContext(GameContext);

    const dispatch = useDispatch();

    const handleTextUpdate = (
        updatedText: string,
    ): CA => dispatch(GameAction.updateUsername({
        username : updatedText,
    }))

    const handleTextInputBlur = (
        _value: string,
        _name: string,
    ): CA =>
        dispatch(GameAction.noOp());

    return (
        <Stack mb='xl'>
            <Text
                ta='left'
                fw={600}>
                {'Your Name'}
            </Text >
            {gameState.hand_number > 0 &&
                <Text>
                    {currentPlayer?.username}
                </Text>
            }
            {gameState.hand_number === 0 &&
                <TextInputDebounced
                    value={currentPlayer?.username ?? ''}
                    onBlur={handleTextInputBlur}
                    onChange={handleTextUpdate}
                    milliseconds={1500}
                    name='username'
                    size='md' />
            }
        </Stack>
    );
}

```

## /Users/dan/code/crude-cards/src/ui/game/UsernameCardContent/type.tsx

```typescript
export interface Props {
    text : string;
}

```

## /Users/dan/code/crude-cards/src/ui/game/constant.tsx

```typescript
import { ToastConfig } from './type';


export const DefaultToastConfig = Object.freeze(new ToastConfig());

```

## /Users/dan/code/crude-cards/src/ui/game/type.tsx

```typescript
import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../api/src/game/dtos/card.dto';


export interface GameContextType {
    dealerDealtCard : CardDTO   | null;
    playerDealtCard : CardDTO   | null;
    currentPlayer   : PlayerDTO | null;
    headerHeight    : number;
    popupTypeId     : string    | null;
    playerCards     : CardDTO[];
    dealerCards     : CardDTO[];
    gameState       : GameStateDTO;
    isDealer        : boolean;
}

export interface PlayerStatus {
    isWinner : boolean;
    player   : PlayerDTO;
    isDone   : boolean;
    score    : number;
}

export class ToastConfig {
    public isVisible : boolean = false;
    public text      : string = '';
}

```

