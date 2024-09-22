## Frontend Codebase

This document contains all the frontend codebase for the Crude Cards game.

### File Structure

- game/
  - GameBanner/
    - index.tsx
    - type.tsx
  - GameBoard/
    - index.tsx
    - type.tsx
  - GameBox/
    - index.tsx
    - type.tsx
  - GameButton/
    - GameButton.stories.tsx
    - index.tsx
    - type.tsx
  - GameCard/
    - Logic.tsx
    - index.tsx
    - type.tsx
  - GameComplete/
    - index.tsx
  - GameContext.tsx
  - GameDealerJudge/
    - index.tsx
  - GameDealerSelection/
    - index.tsx
  - GameDebug/
    - DebugTableRow.tsx
    - GameDebugTabs.tsx
    - index.tsx
    - type.tsx
  - GameDeck/
    - GameDeckCards.tsx
    - index.tsx
    - type.tsx
  - GameDeckLayout/
    - index.tsx
    - styleUtils.tsx
    - type.tsx
  - GameError/
    - index.tsx
  - GameFeedback/
    - constant.tsx
    - index.tsx
    - type.tsx
    - validation.tsx
  - GameFoe/
    - index.tsx
    - type.tsx
  - GameFoesCardContent/
    - FoeContent.tsx
    - GameFoeList.tsx
    - NoFoesMessage.tsx
    - constant.tsx
    - helperFunctions.tsx
    - index.tsx
    - type.tsx
  - GameGroup/
    - index.tsx
    - type.tsx
  - GameHome/
    - GameHomeLogic.tsx
    - GameJoinForm.tsx
    - GameTitleCard.tsx
    - ResizeButton.tsx
    - index.tsx
    - type.tsx
  - GameLobby/
    - FoeList.tsx
    - PlayerWarning.tsx
    - ShareCard.tsx
    - index.tsx
    - type.tsx
  - GameMenu/
    - GameMenuBurger.tsx
    - GameMenuDropdown.tsx
    - GameMenuItem.tsx
    - GameMenuItems.tsx
    - constant.tsx
    - index.tsx
    - menuLogic.tsx
    - type.tsx
  - GamePlayerConfirm/
    - index.tsx
  - GamePlayerSelection/
    - index.tsx
  - GamePopup/
    - PopupContent.tsx
    - PopupModal.tsx
    - index.tsx
    - type.tsx
  - GameQuit/
    - index.tsx
    - type.tsx
  - GameResults/
    - ResultsCards.tsx
    - ScoreboardSection.tsx
    - index.tsx
    - type.tsx
  - GameScoreboard/
    - index.tsx
  - GameShare/
    - GameShareButton.tsx
    - GameShareIcon.tsx
    - index.tsx
  - GameStack/
    - GameStackLogic.tsx
    - index.tsx
    - type.tsx
  - GameStatusTable/
    - GameStatusTableHeader.tsx
    - GameStatusTableRow.tsx
    - GameStatusTableTitle.tsx
    - index.tsx
    - type.tsx
  - GameTemplate/
    - GameTemplateHeader/
      - DealerPickBlackCard.tsx
      - DealerPickWinner.tsx
      - GameHomeHeader.tsx
      - GameResultsHeader.tsx
      - HeaderContent.tsx
      - LobbyHeader.tsx
      - Logic.tsx
      - PlayerPickWhiteCard.tsx
      - index.tsx
    - index.tsx
    - type.tsx
  - GameText/
    - index.tsx
    - type.tsx
  - GameTimeout/
    - index.tsx
  - GameToast/
    - TimerSymbol.tsx
    - constant.tsx
    - index.tsx
    - sharedLogic.tsx
    - type.tsx
  - GameView/
    - constant.tsx
    - index.tsx
    - sharedLogic.tsx
    - type.tsx
  - GameWaiting/
    - DeckRenderer.tsx
    - StatusTableRenderer.tsx
    - constants.tsx
    - index.tsx
    - type.tsx
  - GameWiggleBox/
    - index.tsx
    - type.tsx
  - ShareCardContent/
    - ShareCardTooltip.tsx
    - index.tsx
    - type.tsx
  - TextInputDebounced/
    - index.tsx
    - type.tsx
  - UsernameCardContent/
    - index.tsx
    - type.tsx
  - constant.tsx
  - type.tsx
  - useFormConfig.tsx


### Combined Files

## /Users/bort/code/crude-cards/src/ui/game/GameBanner/index.tsx

```typescript
import { GameTextSubtitle, GameTextTitle } from '../GameText/index';
import { GameBox } from '../GameBox';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameBanner : RFC<Props> = ({
    text, subtitle, color,
}) =>
    <GameBox>
        <GameTextTitle color={color}>
            {text}
        </GameTextTitle>
        <GameTextSubtitle color={color}>
            {subtitle}
        </GameTextSubtitle>
    </GameBox>

```

## /Users/bort/code/crude-cards/src/ui/game/GameBanner/type.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
export interface Props {
    subtitle ?: string;
    color     : CardColor;
    text      : string;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameBoard/index.tsx

```typescript
import { GameStackType } from '../GameStack/type';
import { AppContext } from '../../AppContext';
import { GameStack } from '../GameStack';
import { GameDebug } from '../GameDebug';
import { GameView } from '../GameView';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';
import { Env } from '@app/Env';


const isDebugOverlayVisible = Env.getBoolean('NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE');


export const GameBoard : RFC<Props> = () => {

    const { isDebugging } = useContext(AppContext);

    return (
        <GameStack type={GameStackType.FullHeightCentered}>
            {/* <GamePopup /> */}
            <GameView />
            <GameDebug isVisible={isDebugOverlayVisible || isDebugging} />
        </GameStack>
    );
};


```

## /Users/bort/code/crude-cards/src/ui/game/GameBoard/type.tsx

```typescript
export interface Props {
    id : string;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameBox/index.tsx

```typescript
import { GameBoxCenteredProps, GameBoxDefaultProps, GameBoxType, Props } from './type';
import { App } from '../../AppContext';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameBox : RFC<Props> = ({
    type = GameBoxType.Default,
    size = 'md',
    children,
}) => {

    const { isDebugging } = useContext(App);

    if(!children) return null;

    const commonProps = {
        mb     : size,
        mt     : size,
        border : isDebugging ? '1px solid #f90' : undefined,
    }

    switch(type) {
        case GameBoxType.Default:
            return (
                <Box {...commonProps}>
                    {children}
                </Box>
            );

        case GameBoxType.Centered:
            return (
                <Box
                    {...commonProps}
                    ta='center'>
                    {children}
                </Box>
            );

        default: throw new Error(`Unknown GameBoxType: ${type}`);
    }
}

export const GameBoxDefault : RFC<GameBoxDefaultProps> = ({ children, size }) =>
    <GameBox
        type={GameBoxType.Default}
        size={size}>
        {children}
    </GameBox>

export const GameBoxCentered : RFC<GameBoxCenteredProps> = ({ children, size }) =>
    <GameBox
        type={GameBoxType.Centered}
        size={size}>
        {children}
    </GameBox>


```

## /Users/bort/code/crude-cards/src/ui/game/GameBox/type.tsx

```typescript
import { MantineSize } from "@mantine/core";

export type GameBoxSize = Extract<MantineSize, 'sm' | 'md' | 'lg'>;

export type Props = React.PropsWithChildren<{
    type ?: GameBoxType;
    size ?: GameBoxSize;
}>;

type GameBoxCustom =  Omit<Props, 'type'>;

export type GameBoxCenteredProps = GameBoxCustom;
export type GameBoxDefaultProps  = GameBoxCustom;


export enum GameBoxType {
    Centered,
    Default,
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameButton/GameButton.stories.tsx

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

## /Users/bort/code/crude-cards/src/ui/game/GameButton/index.tsx

```typescript
import classes from './GameButton.module.css';
import { Button, Text } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameButton : RFC<Props> = ({
    text, onClick,
}) => {
    const buttonSize = 180;
    const fontSize   = 'xl';

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

## /Users/bort/code/crude-cards/src/ui/game/GameButton/type.tsx

```typescript
export interface Props {
    onClick ?: () => void;
    text     : string;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameCard/Logic.tsx

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

## /Users/bort/code/crude-cards/src/ui/game/GameCard/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { getBackgroundColor, getCardBorder } from './Logic';
import renderHtmlAsReact from 'html-react-parser';
import { Box, Center, rem } from '@mantine/core';
import { GameWiggleBox } from '../GameWiggleBox';
import classes from './GameCard.module.css';
import { useHover } from '@mantine/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { GameStack } from '../GameStack';
import { GameCardType } from '../type';
import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';
import { ReactNode } from 'react';
import {
    GameCardStackProps, GameCardDTOProps,
    GameCardRawProps, GameCardHtmlProps,
    CardCenteredProps, Props,
    GameCardChildrenProps,
} from './type';


export const GameCard: RFC<Props> = ({
    id,    cardType,  children,
    color, onClick,   card,
    hasHoverWiggle = true,
}) => {
    const { hovered: isHovered, ref: refHover } = useHover();

    const debugString = `color: ${color}, onClick: ${onClick}, id: ${id}`;

    if (color === CardColor.Unknown)
        throw new Error(`Card color is unknown: ${debugString}`);

    const colorNum = color === CardColor.Black ? 64 : 0;
    const alpha    = color === CardColor.Black ? 0.6 : 0.2;

    const handleClickCard = (evt : React.MouseEvent<HTMLDivElement>) => {

        if(!onClick) throw new Error(`onClick is not defined: ${debugString}`);

        evt.stopPropagation();

        onClick(id, { ...CardDTO.Default, ...card });
    };

    const renderCardWiggle = (
        cardContent : ReactNode | ReactNode[],
    ) =>
        !hasHoverWiggle
            ? cardContent
            : (
                <GameWiggleBox
                    uniqueKey='hover-wiggle'
                    index={0}>
                    {cardContent}
                </GameWiggleBox>
            );

    const renderCardContainer = (
        cardContent : ReactNode | ReactNode[],
    ) =>
        <Box
            style={{
                backgroundColor : getBackgroundColor(color!, isHovered && onClick !== undefined),
                boxShadow       : `4px 4px 20px 14px rgba(${colorNum}, ${colorNum}, ${colorNum}, ${alpha})`,
                maxWidth        : rem(400),
                border          : getCardBorder(color!),
            }}
            onClick={onClick
                ? handleClickCard
                : undefined
            }
            className={classes.gameCard}
            ref={refHover}
            id={id}
            p='xl'
            m='xs'>
            {cardContent}
        </Box>

    switch(cardType){
        case GameCardType.Children:
            return renderCardWiggle(
                renderCardContainer(children));

        case GameCardType.Stack:
            return renderCardWiggle(
                renderCardContainer(
                    <GameStack>
                        {children}
                    </GameStack>,
                ));

        case GameCardType.Centered:
            return renderCardWiggle(
                renderCardContainer(
                    <Center>
                        {children}
                    </Center>,
                ));

        case GameCardType.Raw:
            return renderCardWiggle(
                renderCardContainer(
                    children,
                ));

        case GameCardType.Html:
            return renderCardWiggle(
                renderCardContainer(
                    renderHtmlAsReact(children as string),
                ));

            default:
                throw new Error(`Unknown card type: ${cardType}`);
        }
}


export const GameCardChildren: RFC<GameCardChildrenProps> = ({
    children, color, onClick, id,
}) =>
    <GameCard
        cardType={GameCardType.Children}
        id={id ?? nanoid()}
        onClick={onClick}
        color={color}>
        {children}
    </GameCard>


export const GameCardDTO: RFC<GameCardDTOProps> = ({
    card, onClick, id,
}) => {

    if(!card.color || !card.text)
        throw new Error(`Card color or text is not defined: ${card}`);

    return (
        <GameCard
            id={id ?? nanoid()}
            color={card.color}
            onClick={onClick}
            cardType={GameCardType.Children}>
            <GameText>
                {card.text}
            </GameText>
        </GameCard>
    );
}

export const GameCardRaw: RFC<GameCardRawProps> = ({
    rawText, color, onClick, id,
}) => {
    return (
        <GameCard
            cardType={GameCardType.Raw}
            id={id ?? nanoid()}
            onClick={onClick}
            color={color}>
            {rawText}
        </GameCard>
    );
}

export const GameCardHtml: RFC<GameCardHtmlProps> = ({
    rawHtml, color, onClick, id,
}) => {
    return (
        <GameCard
            cardType={GameCardType.Html}
            id={id ?? nanoid()}
            onClick={onClick}
            color={color}>
            {rawHtml}
        </GameCard>
    );
}

export const GameCardStack: RFC<GameCardStackProps> = ({
    children, color, onClick, id,
}) => {
    return (
        <GameCard
            cardType={GameCardType.Stack}
            id={id ?? nanoid()}
            onClick={onClick}
            color={color}>
            {children}
        </GameCard>
    );
}

export const GameCardCentered: RFC<CardCenteredProps> = ({
    children, color, onClick, id,
}) => {
    return (
        <GameCard
            cardType={GameCardType.Raw}
            id={id ?? nanoid()}
            onClick={onClick}
            color={color}>
            {children}
        </GameCard>
    );
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameCard/type.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { GameCardType, OnClickCard } from '../type';


export type Props = {
    hasHoverWiggle ?: boolean;
    isClickable    ?: boolean;
    cardType        : GameCardType;
    children        : React.ReactNode | React.ReactNode[];
    onClick        ?: OnClickCard;
    color          ?: CardColor;
    card           ?: Partial<CardDTO>;
    id              : string;
};


export interface GameCardChildrenProps {
    hasWiggle   ?: boolean;
    children     : React.ReactNode | React.ReactNode[];
    onClick     ?: OnClickCard;
    color        : CardColor;
    id          ?: string;
}

export interface GameCardDTOProps {
    hasWiggle ?: boolean;
    onClick   ?: OnClickCard;
    card       : Partial<CardDTO>;
    id        ?: string;
}

export interface GameCardRawProps {
    hasWiggle ?: boolean;
    rawText    : string;
    onClick   ?: OnClickCard;
    color      : CardColor;
    id        ?: string;
}

export interface GameCardHtmlProps {
    hasWiggle ?: boolean;
    rawHtml    : string;
    onClick   ?: OnClickCard;
    color      : CardColor;
    id        ?: string;
}


export interface GameCardStackProps {
    hasWiggle ?: boolean;
    children   : React.ReactNode[];
    onClick   ?: OnClickCard;
    color      : CardColor;
    id        ?: string;
}

export interface CardCenteredProps {
    hasWiggle ?: boolean;
    children   : React.ReactNode | React.ReactNode[];
    onClick   ?: OnClickCard;
    color      : CardColor;
    id        ?: string;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameComplete/index.tsx

```typescript
import { GameTextBanner, GameTextNeon, GameTextSmall } from '../GameText';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { selectGameComplete } from '../../../client/selector/game';
import { GameAction } from '../../../client/action/game.action';
import { useDispatch, useSelector } from '@app/client/hook';
import { CA } from '../../../constant/framework/CoreAction';
import { GameBox, GameBoxCentered } from '../GameBox';
import { GameStatusTable } from '../GameStatusTable';
import { IconArrowRight } from '@tabler/icons-react';
import { useViewportSize } from '@mantine/hooks';
import { Button, Stack } from '@mantine/core';
import Confetti from 'react-confetti'


export const GameComplete = () => {

    const dispatch = useDispatch();
    const handleExitGame = () : CA => dispatch(GameAction.leaveGame({}));

    const { allPlayerStatus, gameChampion, isWinner } = useSelector(selectGameComplete);
    const { height, width } = useViewportSize();

    return (
        <GameBoxCentered>
            {isWinner &&
                <Confetti
                    width={width}
                    height={height}/>
            }
            <Stack>
                <GameTextBanner color={CardColor.White}>
                    {'CHAMP'}
                </GameTextBanner>
                <GameTextNeon>
                    {gameChampion?.username}
                </GameTextNeon>
                <GameBoxCentered>
                    <Button
                        onClick={handleExitGame}
                        variant='subtle'
                        size='lg'
                        mt='xl'>
                        {'Home'}
                        <IconArrowRight size={50} />
                    </Button>
                </GameBoxCentered>
                <GameTextSmall>
                    {'Scoreboard'}
                </GameTextSmall>
                <GameBox size='sm'>
                    <GameStatusTable
                        playerStatusList={allPlayerStatus}
                        shouldShowScore={true}
                        shouldShowDone={false} />
                </GameBox>
            </Stack>
        </GameBoxCentered>
    );
}


```

## /Users/bort/code/crude-cards/src/ui/game/GameContext.tsx

```typescript
import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { GameContextType } from './type';
import { createContext } from 'react';


export const GameContext = createContext<GameContextType>({
    dealerDealtCard : null,
    playerDealtCard : null,
    currentPlayer   : null,
    headerHeight    : 0,
    playerCards     : [],
    dealerCards     : [],
    popupType       : null,
    gameState       : GameStateDTO.Default,
    isDealer        : false,
});

```

## /Users/bort/code/crude-cards/src/ui/game/GameDealerJudge/index.tsx

```typescript
import { selectSelectedCards } from '@app/client/selector/game';
import { GameAction } from '../../../client/action/game.action';
import { useSelector , useDispatch } from '@app/client/hook';
import { GameDeck } from '../GameDeck';
import { GameBox } from '../GameBox';


export const GameDealerJudge = () => {

    const selectedCards = useSelector(selectSelectedCards);
    const dispatch      = useDispatch();

    const handleCardClicked = (id : string) =>
        dispatch(GameAction.dealerPickWinner({ card_id : id }));

    return (
        <GameBox>
            <GameDeck
                onCardClicked={handleCardClicked}
                cards={selectedCards} />
        </GameBox>
    );
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameDealerSelection/index.tsx

```typescript
import { GameAction } from '../../../client/action/game.action';
import { GameContext } from '../GameContext';
import { GameBoxCentered } from '../GameBox';
import { useDispatch } from 'react-redux';
import { GameDeck } from '../GameDeck';
import { useContext } from 'react';


export const GameDealerSelection = () => {

    const { dealerCards } = useContext(GameContext);
    const dispatch = useDispatch();

    const handleCardClicked = (id : string) =>
        dispatch(GameAction.dealerPickBlackCard({ card_id : id }));

    return (
        <GameBoxCentered>
            <GameDeck
                onCardClicked={handleCardClicked}
                cards={dealerCards}  />
        </GameBoxCentered>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameDebug/DebugTableRow.tsx

```typescript
import { DebugTableRowProps } from './type';
import { Table } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const DebugTableRow: RFC<DebugTableRowProps> = ({
    label, value, fontSize = 'sm',
}) => (
    <Table.Tr>
        <Table.Td
            p={0}
            pl='sm'>
            <strong>{label}</strong>
        </Table.Td>
        <Table.Td
            p={0}
            fz={fontSize}>
            {value}
        </Table.Td>
    </Table.Tr>
);

```

## /Users/bort/code/crude-cards/src/ui/game/GameDebug/GameDebugTabs.tsx

```typescript
import { Table, Tabs, Text, List, rem } from '@mantine/core';
import { DebugTableRow } from './DebugTableRow';
import { GameDebugTabsProps } from './type';
import { RFC } from '@app/ui/type';


export const GameDebugTabs: RFC<GameDebugTabsProps> = ({
    dealerDealtCard, playerDealtCard, currentPlayer,
    gameState, authToken, isDealer, isHost,
}) => {
    return (
        <Tabs defaultValue='one'>
            <Tabs.List>
                <Tabs.Tab value='one'>
                    <Text
                        fz='sm'
                        fw={600}>{"ONE"}</Text>
                </Tabs.Tab>
                <Tabs.Tab value='two'>{"TWO"}</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='one'>
                <Table
                    cellSpacing={0}
                    cellPadding={0}
                    fz='xs'
                    style={{ maxWidth : rem(220) }}>
                    <Table.Tbody>
                        {gameState.error_message && <DebugTableRow
                            label='Error'
                            value={gameState.error_message} />}
                        <DebugTableRow
                            label='IsDealer'
                            value={isDealer ? 'Yes' : 'No'} />
                        <DebugTableRow
                            label='AuthToken'
                            value={authToken} />
                        <DebugTableRow
                            label='IsHost'
                            value={isHost ? 'Yes' : 'No'} />
                        <DebugTableRow
                            label='Game Code'
                            value={gameState.game_code} />
                        <DebugTableRow
                            label='Stage'
                            value={gameState.game_stage} />
                        <DebugTableRow
                            label='PlayerId'
                            value={currentPlayer?.id}
                            fontSize='xs' />
                        <DebugTableRow
                            label='Username'
                            value={currentPlayer?.username}
                            fontSize='xs' />
                        <DebugTableRow
                            label='Score'
                            value={currentPlayer?.score} />
                        <DebugTableRow
                            label="Dealer's Card"
                            value={dealerDealtCard?.text} />
                        <DebugTableRow
                            label="Player's Card"
                            value={playerDealtCard?.text} />
                    </Table.Tbody>
                </Table>
            </Tabs.Panel>
            <Tabs.Panel value='two'>
                <List>
                    <List.Item>{"ONE"}</List.Item>
                    <List.Item>{"ONE"}</List.Item>
                    <List.Item>{"ONE"}</List.Item>
                    <List.Item>{"ONE"}</List.Item>
                </List>
            </Tabs.Panel>
        </Tabs>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameDebug/index.tsx

```typescript
import { selectIsHost } from '../../../client/selector/game';
import { useContext, useEffect, useState } from 'react';
import { CookieType } from '../../../api/src/type';
import { GameDebugTabs } from './GameDebugTabs';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import classes from './GameDebug.module.css';
import { Box, rem } from '@mantine/core';
import { RFC } from '@app/ui/type';
import Cookies from 'js-cookie';
import { Props } from './type';


export const GameDebug: RFC<Props> = ({
    isVisible,
}) => {

    const {
        gameState, isDealer, currentPlayer, dealerDealtCard, playerDealtCard,
    } = useContext(GameContext);

    const [authToken, setAuthToken] = useState<string | null>(null);
    const isHost = useSelector(selectIsHost);

    useEffect(() => {
        const token = Cookies.get(CookieType.AuthToken);

        setAuthToken(token ?? null);
    }, []);

    if (!isVisible) return null;

    return (
        <Box
            onClick={() => console.log('Admin Open')}
            className={classes.pi}
            w={rem(220)}
            h={rem(440)}>
            <GameDebugTabs
                playerDealtCard={playerDealtCard}
                dealerDealtCard={dealerDealtCard}
                currentPlayer={currentPlayer}
                gameState={gameState}
                authToken={authToken}
                isDealer={isDealer}
                isHost={isHost} />
        </Box>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameDebug/type.tsx

```typescript
import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { ReactNode } from 'react';


export interface Props {
    isVisible: boolean;
}

export interface DebugTableRowProps {

    fontSize ?: string;
    label     : string;
    value     : ReactNode;
}


export interface GameDebugTabsProps {

    dealerDealtCard ?: CardDTO | null;
    playerDealtCard ?: CardDTO | null;
    currentPlayer    : PlayerDTO | null;
    authToken        : string | null;
    gameState        : GameStateDTO;
    isDealer         : boolean;
    isHost           : boolean;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameDeck/GameDeckCards.tsx

```typescript
import { GameCardListProps } from './type';
import { GameCardDTO } from '../GameCard';
import { RFC } from '@app/ui/type';


export const GameDeckCards: RFC<GameCardListProps> = ({
    cards, onCardClicked,
}) =>
    cards.map((card, index) =>
        <GameCardDTO
            onClick={onCardClicked}
            card={card}
            key={index} />,
    );

```

## /Users/bort/code/crude-cards/src/ui/game/GameDeck/index.tsx

```typescript
import { GameDeckCards } from './GameDeckCards';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeck: RFC<Props> = ({
    onCardClicked, cards,
}) =>
    <GameDeckCards
        onCardClicked={onCardClicked}
        cards={cards} />


```

## /Users/bort/code/crude-cards/src/ui/game/GameDeck/type.tsx

```typescript
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { OnClickCard } from '../type';


export interface Props {
    onCardClicked ?: OnClickCard;
    cards          : CardDTO[];
}

export interface GameCardListProps {
    onCardClicked ?: OnClickCard;
    cards          : CardDTO[];
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameDeckLayout/index.tsx

```typescript
import { GameWiggleBox } from '../GameWiggleBox';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeckLayout: RFC<Props> = ({
    verticleWiggleFactor = 50,
    cardOverlapFactor    = 40,
    wiggleFactor         = 6,
    tiltFactor           = 8,
    cards,
    id,
}) => cards.map((card, index) =>
    <GameWiggleBox
        verticleWiggleFactor={verticleWiggleFactor}
        cardOverlapFactor={cardOverlapFactor}
        wiggleFactor={wiggleFactor}
        tiltFactor={tiltFactor}
        uniqueKey={`${id}-${index}`}
        key={`card-${index}`}
        index={index}>
        {card}
    </GameWiggleBox>)

```

## /Users/bort/code/crude-cards/src/ui/game/GameDeckLayout/styleUtils.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';

export const getBackgroundColor = (color: CardColor): string =>
    color === CardColor.Black ? '#000' : '#fff';


```

## /Users/bort/code/crude-cards/src/ui/game/GameDeckLayout/type.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { ReactNode } from 'react';

export interface Props {

    verticleWiggleFactor ?: number;
    cardOverlapFactor    ?: number;
    wiggleFactor         ?: number;
    tiltFactor           ?: number;
    color                ?: CardColor;
    cards                 : ReactNode[];
    id                    : string;
}

export interface GameDeckCardProps {

    verticleWiggleFactor : number;
    cardOverlapFactor    : number;
    wiggleFactor         : number;
    tiltFactor           : number;
    index                : number;
    card                 : CardDTO;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameError/index.tsx

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

## /Users/bort/code/crude-cards/src/ui/game/GameFeedback/constant.tsx

```typescript
export const FeedbackFormInitialValues = Object.freeze({
    name    : '',
    email   : '',
    message : '',
});

```

## /Users/bort/code/crude-cards/src/ui/game/GameFeedback/index.tsx

```typescript
import { GameAction } from '../../../client/action/game.action';
import { Group, TextInput, Textarea } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useFocusTrap } from '@mantine/hooks';
import { GameButton } from '../GameButton';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/form';
import { GameText } from '../GameText';
import { schema } from './validation';
import { FeedbackForm } from './type';
import { useState } from 'react';


export const GameFeedback = () => {

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
            <GameText>
                {'Thank you for your feedback!'}
            </GameText>
        );

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                {...form.getInputProps('name')}
                key={form.key('name')}
                withAsterisk={true}
                ref={focusTrapRef}
                aria-label='Name'
                label='Name'
                fw={600}
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
                aria-label='Message'
                withAsterisk={true}
                label='Message'
                tabIndex={0}
                fw={600}
                rows={4} />
            <Group
                justify='center'
                align='center'
                tabIndex={0}
                mt='md'>
                <GameButton text='Submit' />
            </Group>
        </form>
    );
}


```

## /Users/bort/code/crude-cards/src/ui/game/GameFeedback/type.tsx

```typescript
export interface Props {
    text : string;
    onClick : () => void;
}


export interface FeedbackForm {
    name    : string;
    email   : string;
    message : string;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameFeedback/validation.tsx

```typescript
import { z } from "zod";

export const schema = z.object({
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

```

## /Users/bort/code/crude-cards/src/ui/game/GameFoe/index.tsx

```typescript
import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameFoe : RFC<Props> = ({
    player,
}) =>
    <GameText>
        {player.username}
    </GameText>

```

## /Users/bort/code/crude-cards/src/ui/game/GameFoe/type.tsx

```typescript
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';


export interface Props {
    player : PlayerDTO;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameFoesCardContent/FoeContent.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameDeckLayout } from '../GameDeckLayout';
import { NoFoesMessage } from "./NoFoesMessage";
import { hasNoFoes } from "./helperFunctions";
import { FoeContentProps } from "./type";
import { RFC } from '../../type';


export const FoeContent : RFC<FoeContentProps> = ({
    gameCode, foes,
}) => {
    if (hasNoFoes(foes))
        return <NoFoesMessage gameCode={gameCode} />;

    return <GameDeckLayout
        color={CardColor.Black}
        cards={[]}
        id='foes' />;
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameFoesCardContent/GameFoeList.tsx

```typescript
import { GameStackType } from '../GameStack/type';
import { GameFoeListProps } from './type';
import { GameStack } from '../GameStack';
import { GameFoe } from '../GameFoe';
import { RFC } from '@app/ui/type';


export const GameFoeList: RFC<GameFoeListProps> = ({ foes }) =>
    <GameStack type={GameStackType.Centered}>
        {foes.map(player =>
            <GameFoe
                player={player}
                key={player.id} />,
        )}
    </GameStack>

```

## /Users/bort/code/crude-cards/src/ui/game/GameFoesCardContent/NoFoesMessage.tsx

```typescript
import { EMPTY_FOES_MESSAGE } from './constant';
import { NoFoesMessageProps } from './type';
import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';

export const NoFoesMessage: RFC<NoFoesMessageProps> = ({
    gameCode,
}) => (
    <GameText>
        {`${EMPTY_FOES_MESSAGE} "${gameCode}"`}
    </GameText>
);

```

## /Users/bort/code/crude-cards/src/ui/game/GameFoesCardContent/constant.tsx

```typescript
export const EMPTY_FOES_MESSAGE = 'No Players Yet, Share Game Code to Invite People';

```

## /Users/bort/code/crude-cards/src/ui/game/GameFoesCardContent/helperFunctions.tsx

```typescript
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';

export const hasNoFoes = (foes: PlayerDTO[]): boolean =>
    foes.length === 0;

```

## /Users/bort/code/crude-cards/src/ui/game/GameFoesCardContent/index.tsx

```typescript
import { GameStackType } from '../GameStack/type';
import { GameContext } from '../GameContext';
import { GameFoeList } from './GameFoeList';
import { FoeContent } from './FoeContent';
import { GameStack } from '../GameStack';
import { useContext } from 'react';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameFoesCardContent: RFC<Props> = ({ foes }) => {

    const { gameState } = useContext(GameContext);

    return (
        <GameStack type={GameStackType.Centered}>
            <FoeContent
                gameCode={gameState.game_code}
                foes={foes} />
            <GameFoeList foes={foes} />
        </GameStack>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameFoesCardContent/type.tsx

```typescript
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';

export interface Props {
    foes: PlayerDTO[];
}

export interface GameFoeListProps {
    foes: PlayerDTO[];
}

export interface NoFoesMessageProps {
    gameCode: string | null;
}

export interface FoeContentProps {
    gameCode : string | null;
    foes     : PlayerDTO[];
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameGroup/index.tsx

```typescript
import { App } from '../../AppContext';
import { Group } from '@mantine/core';
import { useContext } from 'react';
import { Props } from './type';


export const GameGroup = ({
    children,
}: Props) => {

    const { isDebugging } = useContext(App);

    return (
        <Group
            style={{
                border : isDebugging ? '1px dashed #f91' : undefined,
            }}>
            {children}
        </Group>
    );
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameGroup/type.tsx

```typescript
import { ReactNode } from "react";
import { GameStackType } from '../GameStack/type';

export interface Props {
    type     ?: GameStackType; // Use GameStackType for predefined layouts
    children  : ReactNode;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameHome/GameHomeLogic.tsx

```typescript
import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { GameHomeHandlers } from './type';


export const Logic : GameHomeHandlers = {

    sanitizeGameCode : (input : string) : string =>
        input.replace(/[^a-zA-Z0-9]/g, '').trim().toLowerCase(),

    handleStartGame : (dispatch : Dispatch<UnknownAction>) : CA =>
        dispatch(GameAction.createGame({})),

    handleJoinGame : (
        dispatch : Dispatch<UnknownAction>,
        gameCode : string,
    ) : CA =>
        dispatch(GameAction.joinGame({ game_code : gameCode })),

    handleKeyDown : (
        dispatch : Dispatch<UnknownAction>,
        e        : React.KeyboardEvent<HTMLInputElement>,
        gameCode : string,
    ) : CA => {

        e.preventDefault();

        if (e.key !== 'Enter') dispatch(GameAction.noOp())

        return Logic.handleJoinGame(dispatch, gameCode);
    },
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameHome/GameJoinForm.tsx

```typescript
import { Button, FocusTrap, Group, rem, TextInput } from "@mantine/core";
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { sanitizeGameCode } from '../GameView/sharedLogic';
import { GameTextCentered } from '../GameText/index';
import { GameCardStack } from '../GameCard/index';
import { GameJoinFormProps } from "./type";


export const GameJoinForm = ({
    gameCode, setGameCode, onJoinGame,
}: GameJoinFormProps) => {

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
        if (evt.key !== 'Enter') return;

        evt.preventDefault();
        onJoinGame();
    };

    const handleGameCodeChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const sanitizedInput = sanitizeGameCode(evt.target.value);

        setGameCode(sanitizedInput);

        if (sanitizedInput.length === 6)
            onJoinGame();
    };

    return (
        (<GameCardStack color={CardColor.White}>
            <GameTextCentered color={CardColor.Black}>
                {'~ or ~'}
            </GameTextCentered>
            <Group
                justify='center'
                align='end'>
                <form onSubmit={onJoinGame}>
                    <FocusTrap active={true}>
                        <TextInput
                            styles={{ input : { textAlign : 'center' } }}
                            onChange={handleGameCodeChange}
                            onKeyDown={handleKeyDown}
                            aria-label='Game Code'
                            value={gameCode}
                            tabIndex={0}
                            w={rem(300)}
                            size='md'
                            mb='md'/>
                    </FocusTrap>
                    <Button
                        style={{ border : `1px solid ${CardColor.Black}` }}
                        aria-label='Join Game Button'
                        variant='outline'
                        type='submit'
                        tabIndex={0}
                        size='md'
                        c={CardColor.Black}
                        mb='xl'>
                        {'Join by Code'}
                    </Button>
                </form>
            </Group>
        </GameCardStack>)
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameHome/GameTitleCard.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameTextTitle, GameTextSubtitle } from '../GameText';
import { GameBoxType } from '../GameBox/type';
import { GameCardStack } from '../GameCard';
import { GameTitleCardProps } from './type';
import { GameButton } from '../GameButton';
import { GameBox } from '../GameBox';


export const GameTitleCard = ({
    onStartGame,
}: GameTitleCardProps) =>
    <GameCardStack color={CardColor.Black}>
        <GameBox>
            <GameTextTitle>
                {'CrudeCards'}
            </GameTextTitle>
            <GameTextSubtitle>
                {'A Party Game for Terrible People.'}
            </GameTextSubtitle>
        </GameBox>
        <GameBox type={GameBoxType.Centered}>
            <GameButton
                onClick={onStartGame}
                text='Go' />
        </GameBox>
    </GameCardStack>

```

## /Users/bort/code/crude-cards/src/ui/game/GameHome/ResizeButton.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameAction } from '../../../client/action/game.action';
import { GameTextSmall } from '../GameText/index';
import { useDispatch } from "@app/client/hook";
import { Button } from "@mantine/core";
import { Env } from '../../../Env';


export const ResizeButton = () => {

    const dispatch = useDispatch();
    const homepageUrl = Env.getValue<string>('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');

    const handleResize = (): void => {
        dispatch(
            GameAction.logRelay({
                message : 'User clicked the resize button',
                payload : {
                    hello : 'world',
                },
            }),
        );

        window.open(homepageUrl, 'CrudeCards', 'width=550,height=850');
    };

    return (
        <Button
            color={CardColor.White}
            onClick={handleResize}
            c={CardColor.White}
            variant='outline'
            tabIndex={0}
            size='md'>
            <GameTextSmall>
                {'Resize'}
            </GameTextSmall>
        </Button>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameHome/index.tsx

```typescript
import { GameAction } from '../../../client/action/game.action';
import { GameDeckLayout } from '../GameDeckLayout';
import { GameStackType } from '../GameStack/type';
import { GameTitleCard } from './GameTitleCard';
import { useDispatch } from '@app/client/hook';
import { ResizeButton } from './ResizeButton';
import { GameJoinForm } from './GameJoinForm';
import { GameStack } from '../GameStack';
import { useState } from 'react';


/** Main Game Home Component */
export const GameHome = () => {
    const dispatch = useDispatch();
    const [gameCode, setGameCode] = useState('');

    const handleStartGame = () => dispatch(GameAction.createGame({}));
    const handleJoinGame  = () => dispatch(GameAction.joinGame({ game_code : gameCode }));

    return (
        <GameStack type={GameStackType.FullHeightCentered}>
            <ResizeButton />
            <GameDeckLayout
                id='home-screen'
                cards={[
                    <GameTitleCard
                        onStartGame={handleStartGame}
                        key='title-card' />,
                    <GameJoinForm
                        onJoinGame={handleJoinGame}
                        setGameCode={setGameCode}
                        gameCode={gameCode}
                        key='join-form' />,
                ]}/>
        </GameStack>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameHome/type.tsx

```typescript
import { CA } from '../../../constant/framework/CoreAction';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';


export interface GameHomeHandlers {

    sanitizeGameCode : (input    : string                                   ) => string;
    handleStartGame  : (dispatch : Dispatch<UnknownAction>                  ) => CA;
    handleJoinGame   : (dispatch : Dispatch<UnknownAction>, gameCode: string) => CA

    handleKeyDown : (
        dispatch : Dispatch<UnknownAction>,
        e        : React.KeyboardEvent<HTMLInputElement>,
        gameCode : string,
    ) => CA;
}


export interface GameJoinFormProps {
    setGameCode : (code : string) => void;
    onJoinGame  : () => void;
    gameCode    : string;
}


export interface GameTitleCardProps {
    onStartGame: () => void
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameLobby/FoeList.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardCentered, GameCardChildren } from '../GameCard';
import { GameText } from '../GameText';
import { FoeListProps } from './type';
import { List } from '@mantine/core';
import { GameFoe } from '../GameFoe';
import { RFC } from '../../type';


export const FoeList : RFC<FoeListProps> = ({
    foes, gameCode,
}) => {
    if(foes.length === 0)
        return (
            <GameCardCentered color={CardColor.White}>
                <GameText>
                    {`No Players Yet, Share Game Code "${gameCode}" to Invite People`}
                </GameText>
            </GameCardCentered>
        )

    return (
        <GameCardChildren color={CardColor.White}>
            <GameText>
                {'Other Players'}
            </GameText>
            <List>
                {foes.map(player => (
                    <List.Item key={player.id}>
                        <GameFoe player={player} />
                    </List.Item>
                ))}
            </List>
        </GameCardChildren>
    )
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameLobby/PlayerWarning.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameText, GameTextCentered } from '../GameText/index';
import { GameCardStack } from '../GameCard';
import { PlayerWarningProps } from './type';
import { RFC } from '@app/ui/type';


export const PlayerWarning : RFC<PlayerWarningProps> = ({
    foeCount,
}) => {

    if(foeCount < 3) return null;

    return (
        <GameCardStack color={CardColor.Black}>
            <GameText>
                {'Minimum 3 Players'}
            </GameText>
            <GameTextCentered>
                {`Need ${3 - foeCount} more players`}
            </GameTextCentered>
        </GameCardStack>
    );
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameLobby/ShareCard.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { ShareCardContent } from '../ShareCardContent';
import { GameCardCentered } from '../GameCard';
import { ShareCardProps } from './type';
import { RFC } from '../../type';


export const ShareCard: RFC<ShareCardProps> = ({
    gameStage,
}) => {

    if (gameStage === GameStage.DealerPickBlackCard)
        return null;

    return (
        <GameCardCentered color={CardColor.Black}>
            <ShareCardContent />
        </GameCardCentered>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameLobby/index.tsx

```typescript
import { selectFoes } from '../../../client/selector/game';
import { GameDeckLayout } from '../GameDeckLayout';
import { PlayerWarning } from './PlayerWarning';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { GameBoxCentered } from '../GameBox';
import { ShareCard } from './ShareCard';
import { FoeList } from './FoeList';
import { useContext } from 'react';


export const GameLobby = () => {

    const { gameState } = useContext(GameContext);

    if(!gameState.game_code)
        throw new Error('Game Code is not defined');

    const foes = useSelector(selectFoes);

    return (
        <GameBoxCentered>
            <GameDeckLayout
                id='game-lobby'
                verticleWiggleFactor={100}
                cardOverlapFactor={400}
                wiggleFactor={40}
                tiltFactor={10}
                cards={[
                    <ShareCard
                        gameStage={gameState.game_stage}
                        key='share-card' />,
                    <PlayerWarning
                        foeCount={foes.length}
                        key='player-warning' />,
                    <FoeList
                        foes={foes}
                        gameCode={gameState.game_code}
                        key='foe-list' />,
                ]}/>
        </GameBoxCentered>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameLobby/type.tsx

```typescript
// src/ui/game/GameLobby/type.tsx

import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';

// Props for ShareCard Component
export interface ShareCardProps {
    gameStage: GameStage;
}

// Props for PlayerWarning Component
export interface PlayerWarningProps {
    foeCount: number;
}

// Props for FoeList Component
export interface FoeListProps {
    foes: PlayerDTO[];
    gameCode: string;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameMenu/GameMenuBurger.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameMenuBurgerProps } from './type';
import { Burger } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameMenuBurger: RFC<GameMenuBurgerProps> = ({
    opened, toggle,
}) =>
    <Burger
        aria-label='Toggle Main Menu'
        color={CardColor.White}
        onClick={toggle}
        opened={opened}
        tabIndex={0}
        size='lg' />

```

## /Users/bort/code/crude-cards/src/ui/game/GameMenu/GameMenuDropdown.tsx

```typescript
import { getFilteredMenuItems } from './menuLogic';
import { GameMenuItems } from './GameMenuItems';
import { GameMenuDropdownProps } from './type';
import { GameContext } from '../GameContext';
import { GameText } from '../GameText';
import { Menu } from '@mantine/core';
import { useContext } from 'react';
import { RFC } from '@app/ui/type';


export const GameMenuDropdown: RFC<GameMenuDropdownProps> = ({ toggle }) => {

    const { gameState, currentPlayer } = useContext(GameContext);
    const finalMenuItems = getFilteredMenuItems(gameState);

    return (
        <>
            {currentPlayer?.username &&
                <Menu.Label>
                    <GameText>{currentPlayer.username}</GameText>
                </Menu.Label>
            }
            <GameMenuItems
                menuItems={finalMenuItems}
                toggle={toggle} />
        </>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameMenu/GameMenuItem.tsx

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

## /Users/bort/code/crude-cards/src/ui/game/GameMenu/GameMenuItems.tsx

```typescript
import { GameMenuItem } from './GameMenuItem';
import { GameMenuItemsProps } from './type';
import { RFC } from '@app/ui/type';


export const GameMenuItems: RFC<GameMenuItemsProps> = ({
    menuItems, toggle,
}) => menuItems.map((item, index) =>
    <GameMenuItem
        onClick={() => toggle(item.id)}
        key={`${index}-${item.id}`}
        icon={item.icon}
        text={item.text}
        id={item.id}/>)

```

## /Users/bort/code/crude-cards/src/ui/game/GameMenu/constant.tsx

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

## /Users/bort/code/crude-cards/src/ui/game/GameMenu/index.tsx

```typescript
import { getFilteredMenuItems } from './menuLogic';
import { GameMenuItems } from './GameMenuItems';
import { useDisclosure } from '@mantine/hooks';
import { GameContext } from '../GameContext';
import { GameText } from '../GameText';
import { Burger, Menu } from '@mantine/core';
import { useContext } from 'react';
import { CardColor } from '../../../api/src/constant/card-color.enum';


export const GameMenu = () => {

    const [opened, { toggle }] = useDisclosure();

    const { gameState, currentPlayer } = useContext(GameContext);
    const finalMenuItems = getFilteredMenuItems(gameState);

    return (
        <Menu
            // position='top-end'
            opened={opened}
            onChange={toggle}
            shadow='xl'>
            <Menu.Target >
                <Burger
                    aria-label='Toggle Main Menu'
                    color={CardColor.White}
                    onClick={toggle}
                    opened={opened}
                    tabIndex={0}
                    size='lg' />
            </Menu.Target>

            <Menu.Dropdown >
                <>
                    {currentPlayer?.username &&
                        <Menu.Label>
                            <GameText>
                                {currentPlayer.username}
                            </GameText>
                        </Menu.Label>
                    }
                    <GameMenuItems
                        menuItems={finalMenuItems}
                        toggle={toggle} />
                </>
            </Menu.Dropdown>
        </Menu>

    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameMenu/menuLogic.tsx

```typescript
import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { MenuItems } from './constant';


export const getFilteredMenuItems = (gameState : GameStateDTO) => {

    // Default list of menu items
    let finalMenuItemList = MenuItems;

    // If in Home stage, remove "Leave" and "Scoreboard" items
    if (gameState.game_stage === GameStage.Home)
        finalMenuItemList = MenuItems.filter(
            item => item.id !== 'Leave' && item.id !== 'Scoreboard',
        );

    return finalMenuItemList;
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameMenu/type.tsx

```typescript
import { ReactNode } from 'react';

export interface MenuItemProps {
    onClick : (id : string) => void;
    text    : string;
    icon    : ReactNode;
    id      : string;
}

export interface MenuLogicProps {
    current_player_id : string;
    game_stage        : string;
    game_code         : string;
}

export interface GameMenuBurgerProps {
    opened : boolean;
    toggle : () => void;
}

export interface GameMenuDropdownProps {
    toggle : () => void;
}

export interface GameMenuItemsProps {
    menuItems : { id : string; icon : React.ReactNode; text : string }[];
    toggle    : (is : string) => void;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GamePlayerConfirm/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameBox, GameBoxCentered } from '../GameBox';
import { CloseButton } from '@mantine/core';
import { GameBanner } from '../GameBanner';
import { GameButton } from '../GameButton';
import { GameCardDTO } from '../GameCard';


export const GamePlayerConfirm = () => {

    const handleClick = () : void => {
    }

    return (
        <GameBox>
            <CloseButton />
            <GameBanner
                subtitle='Confirm Your Choice'
                color={CardColor.Black}
                text='Play this?' />
            <GameCardDTO
                card={{
                    color : CardColor.Black,
                    text  : 'Doing the Hustle',
                }} />
            <GameCardDTO
                card={{
                    color : CardColor.Black,
                    text  : 'Doing the Hustle',
                }} />
            <GameBoxCentered>
                <GameButton
                    onClick={handleClick}
                    text='Yep' />
            </GameBoxCentered>
        </GameBox>
    );
}


```

## /Users/bort/code/crude-cards/src/ui/game/GamePlayerSelection/index.tsx

```typescript
import { GameAction } from '../../../client/action/game.action';
import { useDispatch } from '../../../client/hook';
import { GameStackType } from '../GameStack/type';
import { GameContext } from '../GameContext';
import { GameStack } from '../GameStack';
import { GameDeck } from '../GameDeck';
import { useContext } from 'react';


export const GamePlayerSelection = () => {

    const { playerCards, playerDealtCard } = useContext(GameContext);
    const dispatch = useDispatch();

    const handlePlayWhiteCard = (id : string) =>
        dispatch(GameAction.playerSelectCard({ card_id : id }));

    return (
        <GameStack type={GameStackType.Centered}>
            {!playerDealtCard &&
                <GameDeck
                    onCardClicked={handlePlayWhiteCard}
                    cards={playerCards} />
            }
        </GameStack>
    );
}


```

## /Users/bort/code/crude-cards/src/ui/game/GamePopup/PopupContent.tsx

```typescript
import { GamePopupType } from '../../../api/src/constant/game-popup-type.enum';
import { GameScoreboard } from '../GameScoreboard';
import { GameFeedback } from '../GameFeedback';
import { PopupContentProps } from './type';
import { GameError } from '../GameError';
import { GameQuit } from '../GameQuit';
import { RFC } from '@app/ui/type';


export const PopupContent: RFC<PopupContentProps> = ({
    popupType,
}) => {

    switch (popupType) {

        case GamePopupType.Scoreboard : return <GameScoreboard />;
        case GamePopupType.Feedback   : return <GameFeedback   />;
        case GamePopupType.Leave      : return <GameQuit       />;

        default: return <GameError />;
    }
};

```

## /Users/bort/code/crude-cards/src/ui/game/GamePopup/PopupModal.tsx

```typescript
import { Modal, Flex, rem } from '@mantine/core';
import { PopupContent } from './PopupContent';
import { PopupModalProps } from './type';
import { RFC } from '@app/ui/type';


export const PopupModal: RFC<PopupModalProps> = ({
    popupType, handleClosePopup,
}) => {
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
                <PopupContent popupType={popupType} />
            </Flex>
        </Modal>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GamePopup/index.tsx

```typescript
import { GameAction } from '../../../client/action/game.action';
import { useDispatch } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { PopupModal } from './PopupModal';
import { useContext } from 'react';

export const GamePopup = () => {

    const { popupType } = useContext(GameContext);
    const dispatch = useDispatch();

    if (!popupType) return null;

    const handleClosePopup = () => dispatch(GameAction.closePopup());

    return (
        <PopupModal
            handleClosePopup={handleClosePopup}
            popupType={popupType} />
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GamePopup/type.tsx

```typescript
import { GamePopupType } from '../../../api/src/constant/game-popup-type.enum';
import { PropsWithChildren } from 'react';


export type Props = PropsWithChildren;

export interface PopupContentProps {
    popupType : GamePopupType;
}

export interface PopupModalProps {
    handleClosePopup : () => void;
    popupType        : GamePopupType;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameQuit/index.tsx

```typescript
import { GameAction } from '../../../client/action/game.action';
import { GameBox, GameBoxCentered } from '../GameBox';
import { useDispatch } from '@app/client/hook';
import { GameTextSubtitle } from '../GameText';
import { GameButton } from '../GameButton';


export const GameQuit = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(GameAction.leaveGame({}));
        dispatch(GameAction.closePopup());
    }

    return (
        <GameBox size='lg'>
            <GameTextSubtitle>
                {'Double Checking'}
            </GameTextSubtitle>
            <GameBoxCentered>
                <GameButton
                    onClick={handleClick}
                    text='Exit' />
            </GameBoxCentered>
        </GameBox>
    );
}


```

## /Users/bort/code/crude-cards/src/ui/game/GameQuit/type.tsx

```typescript
export interface Props {
    onClick : () => void;
    text    : string;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameResults/ResultsCards.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { ResultsCardsProps } from './type';
import { GameCardDTO } from '../GameCard';
import { RFC } from '@app/ui/type';


export const ResultsCards : RFC<ResultsCardsProps> = ({
    dealerCard, winnerCard, endMessage,
}) =>
    <>
        <GameCardDTO card={dealerCard} />
        <GameCardDTO card={winnerCard} />
        <GameCardDTO
            card={{
                color : CardColor.Black,
                text  : endMessage,
            }} />
    </>

```

## /Users/bort/code/crude-cards/src/ui/game/GameResults/ScoreboardSection.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardStack } from '../GameCard';
import { GameStatusTable } from '../GameStatusTable';
import { ScoreboardSectionProps } from './type';
import { Text } from '@mantine/core';
import { GameBox } from '../GameBox';
import { RFC } from '@app/ui/type';


export const ScoreboardSection: RFC<ScoreboardSectionProps> = ({
    playerStatus,
}) =>
    <GameBox>
        <GameCardStack color={CardColor.Black}>
            <Text
                fz='sm'
                ta='center'>{"3 Points to Win"}</Text>
            <GameStatusTable
                title='Scoreboard'
                playerStatusList={playerStatus}
                shouldShowDone={false}
                shouldShowScore={true}/>
        </GameCardStack>
    </GameBox>

```

## /Users/bort/code/crude-cards/src/ui/game/GameResults/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { selectGameResults } from '../../../client/selector/game';
import { ScoreboardSection } from './ScoreboardSection';
import { GameDeckLayout } from '../GameDeckLayout';
import { GameStackType } from '../GameStack/type';
import { useViewportSize } from '@mantine/hooks';
import { useSelector } from '@app/client/hook';
import { ResultsCards } from './ResultsCards';
import { GameStack } from '../GameStack';
import Confetti from 'react-confetti';

export const GameResults = () => {

    const {
        sessionEndMessage, allPlayerStatus, isPlayerWinner,
        previousHandDealerCard, previousHandWinnerCard,
    } = useSelector(selectGameResults);

    const { height, width } = useViewportSize();

    return (
        <GameStack type={GameStackType.Centered}>
            {isPlayerWinner &&
                <Confetti
                    height={height}
                    width={width} />
            }
            <GameDeckLayout
                id='game-results'
                color={CardColor.Black}
                cards={[
                    <ResultsCards
                        key='uno'
                        dealerCard={previousHandDealerCard}
                        winnerCard={previousHandWinnerCard}
                        endMessage={sessionEndMessage} />,
                    <ScoreboardSection
                        key='dos'
                        playerStatus={allPlayerStatus} />,
                ]} />
        </GameStack>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameResults/type.tsx

```typescript
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { PlayerStatus } from "../type";


export interface ResultsCardsProps {
    dealerCard : CardDTO;
    winnerCard : CardDTO;
    endMessage : string;
}


export interface ScoreboardSectionProps {
    playerStatus : PlayerStatus[];
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameScoreboard/index.tsx

```typescript
import { selectAllPlayerStatus } from '../../../client/selector/game';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStatusTable } from '../GameStatusTable';
import { useSelector } from '@app/client/hook';
import { GameStack } from '../GameStack';
import { GameText } from '../GameText';


export const GameScoreboard = () => {

    const allPlayerStatus = useSelector(selectAllPlayerStatus);

    return (
        <GameStack>
            <GameText size='sm'>
                {'3 Points to Win'}
            </GameText>
            <GameStatusTable
                textColor={CardColor.Black}
                playerStatusList={allPlayerStatus!}
                shouldShowScore={true}
                shouldShowDone={false} />
        </GameStack>
    );
}


```

## /Users/bort/code/crude-cards/src/ui/game/GameShare/GameShareButton.tsx

```typescript
import { Env } from '../../../Env';
import {
    WhatsappShareButton, TwitterShareButton, EmailIcon,
    EmailShareButton, WhatsappIcon, TwitterIcon,
} from 'react-share';


const shareUrl = Env.getValue<string>('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');


export const GameShareButton = () =>
    <>
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
    </>;

```

## /Users/bort/code/crude-cards/src/ui/game/GameShare/GameShareIcon.tsx

```typescript
import { IconPaperclip } from '@tabler/icons-react';
import classes from './GameShare.module.css';
import { Flex, Stack } from '@mantine/core';


export const GameShareIcon = () =>
    <Flex className={classes.iconContainer}>
        <Stack className={classes.paperclipIcon}>
            <IconPaperclip
                stroke={2}
                size={30} />
        </Stack>
    </Flex>


```

## /Users/bort/code/crude-cards/src/ui/game/GameShare/index.tsx

```typescript
import { GameShareButton } from './GameShareButton';
import { GameShareIcon } from './GameShareIcon';
import { Group } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameShare: RFC = () =>
    <Group fz='xs'>
        <GameShareIcon />
        <GameShareButton />
    </Group>;

```

## /Users/bort/code/crude-cards/src/ui/game/GameStack/GameStackLogic.tsx

```typescript
import { GameStackType } from "./type";

const getLayoutProps = (stackType: GameStackType) => {
    switch (stackType) {

        case GameStackType.FullHeightCentered:
            return { justify : 'center',     align : 'center',  spacing : 'lg', h : '100vh' };

        case GameStackType.Centered          : return { justify : 'center',     align : 'center',  spacing : 'md' };
        case GameStackType.Default           : return { justify : 'flex-start', align : 'stretch', spacing : 'md' };
        case GameStackType.Roomy             : return { justify : 'flex-start', align : 'stretch', spacing : 'xl' };

        default: throw new Error(`Invalid GameStackType: ${stackType}`);
    }
};

export const GameStackLogic = {
    getLayoutProps,
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameStack/index.tsx

```typescript
import { GameStackLogic as Logic } from './GameStackLogic';
import { Props, GameStackType } from './type';
import { App } from '../../AppContext';
import { Stack } from '@mantine/core';
import { useContext } from 'react';

export const GameStack = ({
    children, type = GameStackType.Default, isDebug = false,
}: Props) => {

    const isDebugging = useContext(App).isDebugging || isDebug;

    return (
        <Stack
            {...Logic.getLayoutProps(type)}
            style={{
                border : isDebugging ? '1px dashed #f91' : undefined,
            }}>
            {children}
        </Stack>
    );
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameStack/type.tsx

```typescript
import { ReactNode } from "react";

export interface Props {
    children  : ReactNode;
    isDebug  ?: boolean;
    type     ?: GameStackType; // Use GameStackType for predefined layouts
}


export enum GameStackType {
    FullHeightCentered = 'FullHeightCentered',
    Centered           = 'Centered',
    Default            = 'Default',
    Roomy              = 'Roomy',
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameStatusTable/GameStatusTableHeader.tsx

```typescript
import { GameStatusTableHeaderProps } from './type';
import { GameText } from '../GameText';
import { Table } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameStatusTableHeader: RFC<GameStatusTableHeaderProps> = ({
  shouldShowDone, shouldShowScore,
}) =>
    <Table.Thead>
        <Table.Tr>
            <Table.Th>
                <GameText>
                    {'Player'}
                </GameText>
            </Table.Th>
            {shouldShowDone &&
                <Table.Th>
                    <GameText>
                        {'Done?'}
                    </GameText>
                </Table.Th>}
            {shouldShowScore &&
                <Table.Th>
                    <GameText>
                        {'Score'}
                    </GameText>
                </Table.Th>}
        </Table.Tr>
    </Table.Thead>;

```

## /Users/bort/code/crude-cards/src/ui/game/GameStatusTable/GameStatusTableRow.tsx

```typescript
import classes from './GameStatusTable.module.css';
import { GameStackType } from '../GameStack/type';
import { GameStatusTableRowProps } from './type';
import { IconCheck } from '@tabler/icons-react';
import { GameText } from '../GameText/index';
import { Table, Text } from '@mantine/core';
import { GameTextNeon } from '../GameText';
import { GameStack } from '../GameStack';
import { RFC } from '@app/ui/type';


export const GameStatusTableRow: RFC<GameStatusTableRowProps> = ({
  playerStatus, shouldShowDone, shouldShowScore, textColor,
}) =>
    <Table.Tr>
        <Table.Td>
            <Text
                className={playerStatus.isWinner ? classes.neonText : ''}
                fz={playerStatus.isWinner ? 'sm' : 'xs'}
                fw={playerStatus.isWinner ? 600 : 400}
                c={textColor}>
                {playerStatus.player.username}
            </Text>
        </Table.Td>
        {shouldShowDone &&
            <Table.Td>

                {playerStatus.isDone &&
                    <GameText>
                        <IconCheck className={classes.doneIcon} />
                    </GameText>
                    }

            </Table.Td>
        }
        {shouldShowScore &&
            <Table.Td>
                <GameStack type={GameStackType.Centered}>
                    {playerStatus.isWinner &&
                        <GameTextNeon>
                            {"+1 point"}
                        </GameTextNeon>
                    }
                    <Text
                        fw={playerStatus.isWinner ? 600 : 400}
                        className={playerStatus.isWinner ? classes.neonText : ''}
                        ta='center'>
                        {playerStatus.score}
                    </Text>
                </GameStack>
            </Table.Td>
    }
    </Table.Tr>


```

## /Users/bort/code/crude-cards/src/ui/game/GameStatusTable/GameStatusTableTitle.tsx

```typescript
import { GameStatusTableTitleProps } from './type'
import { GameText } from '../GameText'
import { RFC } from '@app/ui/type'


export const GameStatusTableTitle: RFC<GameStatusTableTitleProps> = ({ title }) =>
    <GameText size='lg'>
        {title}
    </GameText>

```

## /Users/bort/code/crude-cards/src/ui/game/GameStatusTable/index.tsx

```typescript
import { GameStatusTableHeader } from './GameStatusTableHeader'
import { GameStatusTableTitle } from './GameStatusTableTitle'
import { GameStatusTableRow } from './GameStatusTableRow'
import classes from './GameStatusTable.module.css'
import { Table } from '@mantine/core'
import { RFC } from '@app/ui/type'
import { Props } from './type'


export const GameStatusTable: RFC<Props> = ({
  playerStatusList, title, shouldShowScore, shouldShowDone, textColor,
}) =>
    <>
        {title &&
            <GameStatusTableTitle title={title} />
        }
        <Table
            className={classes.tableContainer}
            verticalSpacing='xs'>
            <GameStatusTableHeader
                shouldShowScore={shouldShowScore}
                shouldShowDone={shouldShowDone} />
            <Table.Tbody>
                {playerStatusList.map((playerStatus, index) =>
                    <GameStatusTableRow
                        shouldShowScore={shouldShowScore}
                        shouldShowDone={shouldShowDone}
                        playerStatus={playerStatus}
                        textColor={textColor}
                        key={index} />,
        )}
            </Table.Tbody>
        </Table>
    </>


```

## /Users/bort/code/crude-cards/src/ui/game/GameStatusTable/type.tsx

```typescript
import { PlayerStatus } from "../type"

export interface Props {
    playerStatusList : PlayerStatus[]
    shouldShowScore  : boolean
    shouldShowDone   : boolean
    textColor       ?: string
    title           ?: string
}


export interface GameStatusTableRowProps {
    shouldShowScore : boolean;
    shouldShowDone  : boolean;
    playerStatus    : PlayerStatus;
    textColor      ?: string;
}

export interface GameStatusTableHeaderProps {
    shouldShowScore : boolean
    shouldShowDone  : boolean
}

export interface GameStatusTableTitleProps {
    title : string
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/DealerPickBlackCard.tsx

```typescript
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameContext } from '../../GameContext';
import { GameBanner } from '../../GameBanner';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const DealerPickBlackCard : RFC = () => {

    const { isDealer } = useContext(GameContext);

    if(!isDealer) return null;

    return (
        <GameBanner
            color={CardColor.White}
            subtitle='You Are Dealer'
            text='Pick a Card' />
    );
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/DealerPickWinner.tsx

```typescript
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameStackType } from '../../GameStack/type';
import { GameContext } from '../../GameContext';
import { GameBanner } from '../../GameBanner';
import { GameStack } from '../../GameStack';
import { useContext } from 'react';


export const DealerPickWinner = () => {

    const { dealerDealtCard, isDealer } = useContext(GameContext);

    if(!isDealer)
        return (
            <GameBanner
                color={CardColor.White}
                subtitle='Waiting on Dealer'
                text='Judging' />
        );

    return (
        <GameStack type={GameStackType.Centered}>
            <GameBanner
                subtitle={dealerDealtCard?.text ?? ''}
                color={CardColor.White}
                text='Pick a Winner' />
        </GameStack>
    );
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/GameHomeHeader.tsx

```typescript
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameContext } from '../../GameContext';
import { GameCardDTO } from '../../GameCard';
import { Flex } from '@mantine/core';
import { useContext } from 'react';


export const GameHomeHeader = () => {

    const { gameState : { error_message } } = useContext(GameContext);

    if(!error_message) return null;

    return (
        <Flex
            justify='center'
            align='center'>
            {'hello?'}
            <GameCardDTO
                card={{
                color : CardColor.Black,
                text  : error_message,
            }} />
        </Flex>
    );
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/GameResultsHeader.tsx

```typescript
import { selectIsPlayerWinner, selectWinner } from '@app/client/selector/game';
import { GameTextNeon, GameTextSmall, GameTextSubtitle } from '../../GameText';
import { useDispatch, useSelector } from '../../../../client/hook';
import { GameAction } from '../../../../client/action/game.action';
import { GameStackType } from '../../GameStack/type';
import { GameContext } from '../../GameContext';
import { GameButton } from '../../GameButton'
import { GameStack } from '../../GameStack';
import { useContext } from 'react';


export const GameResultsHeader = () => {

    const isWinner = useSelector(selectIsPlayerWinner);
    const winner   = useSelector(selectWinner);

    const { isDealer } = useContext(GameContext);
    const dispatch = useDispatch();

    const handleNextHand = () => dispatch(GameAction.nextHand({}));

    return (
        <GameStack>
            <GameTextSubtitle>
                {'WINNER IS'}
            </GameTextSubtitle>
            <GameTextNeon>
                {isWinner
                    ? 'YOU!'
                    : winner?.username
                }
            </GameTextNeon>
            {!isDealer &&
                <GameTextSmall>
                    {'Waiting on Dealer'}
                </GameTextSmall>
            }
            {isDealer &&
                <GameStack type={GameStackType.Centered}>
                    <GameButton
                        onClick={handleNextHand}
                        text='Next' />
                </GameStack>
            }
        </GameStack>
    );
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/HeaderContent.tsx

```typescript
import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { DealerPickBlackCard } from './DealerPickBlackCard';
import { PlayerPickWhiteCard } from './PlayerPickWhiteCard';
import { selectIsDealer } from '@app/client/selector/game';
import { GameResultsHeader } from './GameResultsHeader';
import { DealerPickWinner } from './DealerPickWinner';
import { GameHomeHeader } from './GameHomeHeader';
import { GameContext } from '../../GameContext';
import { LobbyHeader } from './LobbyHeader';
import { useSelector } from 'react-redux';
import { Box } from '@mantine/core';
import { useContext } from 'react';


export const HeaderContent = () => {

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

## /Users/bort/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/LobbyHeader.tsx

```typescript
import { GameStage } from '../../../../api/src/constant/game-stage.enum';
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameAction } from '../../../../client/action/game.action';
import { selectIsHost } from '../../../../client/selector/game';
import { CA } from '../../../../constant/framework/CoreAction';
import { MinimumPlayerCount } from '../../constant';
import { GameContext } from '../../GameContext';
import { useDispatch } from '@app/client/hook';
import { GameBanner } from '../../GameBanner';
import { GameButton } from '../../GameButton';
import { Box, Center } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useContext } from 'react';


export const LobbyHeader = () => {

    const { gameState } = useContext(GameContext);
    const dispatch = useDispatch();

    const handleStartGame = (): CA => dispatch(GameAction.startGame({}));

    const isHost = useSelector(selectIsHost);

    const playerCount = gameState.player_list.length;
    const needMoreCount = MinimumPlayerCount - playerCount;

    const isDealerPickingBlackCard = () => gameState.game_stage === GameStage.DealerPickBlackCard;
    const showHostStartButton      = () => isHost && hasEnoughPlayers();
    const hasEnoughPlayers         = () => !isTooFewPlayers();
    const isTooFewPlayers          = () => gameState.player_list.length < MinimumPlayerCount;
    const isWaitingOnHost          = () => !isHost && hasEnoughPlayers();

    let subtitle = undefined;

    if (isDealerPickingBlackCard()) subtitle = 'Dealer is Starting';
    else if (isTooFewPlayers())     subtitle = `Need ${needMoreCount} More Player${needMoreCount > 1 ? 's' : ''} to Start`;
    else if (showHostStartButton()) subtitle = 'Players Ready';
    else if (isWaitingOnHost())     subtitle = 'Waiting on Host to Start';

    return (
        <Box>
            <GameBanner
                color={CardColor.White}
                subtitle={subtitle}
                text='Lobby' />
            {showHostStartButton() &&
                <Center m='xl'>
                    <GameButton
                        onClick={handleStartGame}
                        text='Start' />
                </Center>
            }
        </Box>
    );
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/Logic.tsx

```typescript
import { CardDTO } from '../../../../api/src/game/dtos/card.dto';


// Helper function to determine if the player should play a card
export const shouldPlayCard = (
    playerDealtCard: CardDTO | null, isDealer: boolean,
) => !playerDealtCard && !isDealer;

// Helper function to determine if the player is waiting
export const isPlayerWaiting = (
    playerDealtCard: CardDTO | null, isDealer: boolean,
) => playerDealtCard && !isDealer;

```

## /Users/bort/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/PlayerPickWhiteCard.tsx

```typescript
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { isPlayerWaiting, shouldPlayCard } from './Logic';
import { GameContext } from '../../GameContext';
import { GameBanner } from '../../GameBanner';
import { GameBox } from '../../GameBox';
import { useContext } from 'react';


export const PlayerPickWhiteCard = () => {

    const { isDealer, playerDealtCard, dealerDealtCard } = useContext(GameContext);

    if(isDealer)
        return (
            <GameBanner
                subtitle='Players Picking Card'
                color={CardColor.White}
                text='Waiting' />
        );

    return (
        <GameBox>
            {shouldPlayCard(playerDealtCard, isDealer) &&
                <GameBox size='lg'>
                    <GameBanner
                        text='Play a Card'
                        subtitle={dealerDealtCard?.text ?? '[WHOOPS]'}
                        color={CardColor.White} />
                </GameBox>
            }
            {isPlayerWaiting(playerDealtCard, isDealer) &&
                <GameBox size='lg'>
                    <GameBanner
                        text='Waiting'
                        subtitle='Players Picking Card'
                        color={CardColor.White} />
                </GameBox>
            }
        </GameBox>
    );
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameTemplate/GameTemplateHeader/index.tsx

```typescript
import classes from '../GameTemplate.module.css';
import { HeaderContent } from './HeaderContent';
import { Box, Group } from '@mantine/core';
import { GameMenu } from '../../GameMenu';
import { App } from '../../../AppContext';
import { useContext } from 'react';


export const GameTemplateHeader = () => {

    const { isDebugging } = useContext(App);

    const debugStyle = {
        border : isDebugging ? '1px solid #290' : undefined,
    };

    return (
        <Group
            className={classes.headerShadow}
            style={debugStyle}>
            <Box
                className={classes.pi}
                style={debugStyle}>
                <Box
                    className={classes.symbol}
                    style={debugStyle}>
                    <GameMenu />
                </Box>
            </Box>
            <Box
                w='100%'
                style={debugStyle}>
                <HeaderContent />
            </Box>
        </Group>
    );
}


```

## /Users/bort/code/crude-cards/src/ui/game/GameTemplate/index.tsx

```typescript
import { AppShell, Box, Group, MantineProvider, rem } from '@mantine/core';
import { GameTemplateHeader } from './GameTemplateHeader';
import { GameTheme } from '@app/client/GameTheme';
import classes from './GameTemplate.module.css';
import { useElementSize } from '@mantine/hooks';
import { AppContext } from '@app/ui/AppContext';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { GamePopup } from '../GamePopup';
import { GameToast } from '../GameToast';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import {
    selectDealerDealtCard, selectPlayerDealtCard,
    selectCurrentPlayer, selectDealerCards,
    selectPlayerCards, selectIsDealer,
    selectGameState, selectPopupType,
} from '@app/client/selector/game';


export const GameTemplate : RFC<Props>= ({
    children,
}) => {

    const dealerDealtCard = useSelector(selectDealerDealtCard);
    const playerDealtCard = useSelector(selectPlayerDealtCard);
    const currentPlayer   = useSelector(selectCurrentPlayer  );
    const dealerCards     = useSelector(selectDealerCards    );
    const playerCards     = useSelector(selectPlayerCards    );
    const popupType       = useSelector(selectPopupType      );
    const gameState       = useSelector(selectGameState      );
    const isDealer        = useSelector(selectIsDealer       );

    const { ref, height : headerHeight } = useElementSize();

    const { isDebugging } = useContext(AppContext);

    const debugProps = {
        bd : isDebugging ? '1px solid #f00' : undefined,
    };

    return (
        <GameContext.Provider
            value={{
                gameState, isDealer, popupType, headerHeight,
                currentPlayer, dealerCards, playerCards,
                dealerDealtCard, playerDealtCard,
            }}>
            <MantineProvider
                defaultColorScheme='dark'
                forceColorScheme='dark'
                theme={GameTheme}>
                <AppShell
                    className={classes.appRoot}
                    withBorder={false}>
                    <AppShell.Header
                        ref={ref}
                        {...debugProps}>
                        <GameTemplateHeader />
                    </AppShell.Header>
                    <AppShell.Main
                        bd={isDebugging ? '1px solid #0f0' : undefined}
                        pt={rem(headerHeight === 0
                            ? 0
                            : headerHeight +  50,
                        )}>
                        <GamePopup />
                        <GameToast />
                        <Group
                            bd={isDebugging ? '1px dashed #0fd' : undefined}
                            wrap='nowrap'
                            justify='space-between'>
                            <Box
                                c={CardColor.Black}
                                w={rem(0)}
                                hiddenFrom='xs'>
                                {'.'}
                            </Box>
                            <Box
                                bd={isDebugging ? '1px solid #cf0' : undefined}
                                c={CardColor.Black}
                                w='100%'>
                                {children}
                            </Box>
                            <Box
                                c={CardColor.Black}
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

## /Users/bort/code/crude-cards/src/ui/game/GameTemplate/type.tsx

```typescript

import React from 'react';


export type Props = React.PropsWithChildren<{
    appId: string;
}>;

```

## /Users/bort/code/crude-cards/src/ui/game/GameText/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { PropsWithChildren, useContext } from 'react';
import { Box, Text, Title } from '@mantine/core';
import { AppContext } from '../../AppContext';
import classes from './GameText.module.css';
import { RFC } from '@app/ui/type';
import {
    GameTextSubtitleProps, GameTextCenteredProps,
    GameTextBannerProps,   GameTextSmallProps,
    GameTextTitleProps,    GameTextCardProps,
    GameTextType,          Props,
} from './type';


export const GameText: RFC<Props> = ({
    color = CardColor.White,
    type = GameTextType.Default,
    size = 'md',
    children,
    ...propsMysterioso
}) => {

    let { isDebugging } = useContext(AppContext);

    isDebugging = false;

    if (!children)
        return null;

    const overrideColor = isDebugging
        ? '#FFA500'
        : undefined;

    const overrideBackgroundColor = undefined;

    switch (type) {

        case GameTextType.Default:
        case GameTextType.Medium:
            return (
                <Text
                    className={classes.gameDefault}
                    c={overrideColor ?? color}
                    fz={size}
                    bg={overrideBackgroundColor}
                    {...propsMysterioso}>
                    {children}
                </Text>
            );

        case GameTextType.Subtitle:
            return (
                <Title
                    order={2}
                    className={classes.gameSubtitle}
                    c={overrideColor ?? color}
                    fz='md'
                    {...propsMysterioso}>
                    {children}
                </Title>
            );

        case GameTextType.Title:
            return (
                <Title
                    className={classes.gameTitle}
                    c={overrideColor ?? color}
                    fz='xl'
                    {...propsMysterioso}>
                    {children}
                </Title>
            );

        case GameTextType.Small:
            return (
                <Text
                    className={classes.gameSmall}
                    c={overrideColor ?? color}
                    fz='sm'
                    {...propsMysterioso}>
                    {children}
                </Text>
            );

        case GameTextType.Banner:
            return (
                <Text
                    className={classes.bannerText}
                    {...propsMysterioso}>
                    {'THIS ONE3!'}
                    {children}
                </Text>
            );

        default:
            throw new Error(`Unknown GameTextType: ${type}`);
    }
}

export const GameTextSubtitle: RFC<GameTextSubtitleProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Subtitle}
        ta='center'
        color={color}
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextCentered: RFC<GameTextCenteredProps> = ({
    children, color, ...propsMysterioso
}) =>
    <Box ta='center'>
        <GameText
            color={color}
            {...propsMysterioso}>
            {children}
        </GameText>
    </Box>

export const GameTextCard: RFC<GameTextCardProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Card}
        color={color}
        {...propsMysterioso}>
        <div
            dangerouslySetInnerHTML={{
                __html : children ?? '[MISSING TEXT]',
            }}
            style={{
                color : CardColor.White,
            }} />
    </GameText>

export const GameTextTitle: RFC<GameTextTitleProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Title}
        color={color}
        ta='center'
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextSmall: RFC<GameTextSmallProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Small}
        color={color}
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextBanner: RFC<GameTextBannerProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Banner}
        color={color}
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextNeon: RFC<PropsWithChildren> = ({
    children, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Neon}
        {...propsMysterioso}>
        {children}
    </GameText>


```

## /Users/bort/code/crude-cards/src/ui/game/GameText/type.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { PropsWithChildren } from 'react';


export enum GameTextType {
    Subtitle = 'Subtitle',
    Default  = 'Default',
    Banner   = 'Banner',
    Medium   = 'Medium',
    Title    = 'Title',
    Small    = 'Small',
    Neon     = 'Neon',
    Card     = 'Card',
}

// props with children
export type Props = PropsWithChildren<{
    color ?: CardColor;
    type  ?: GameTextType;
    size  ?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    ta    ?: 'left' | 'center' | 'right';
}>;

type GameTextCustomProps = Omit<Props, 'type'>;

export type GameTextSubtitleProps = GameTextCustomProps;
export type GameTextBannerProps   = GameTextCustomProps;
export type GameTextTitleProps    = GameTextCustomProps;
export type GameTextSmallProps    = GameTextCustomProps;
export type GameTextCardProps     = GameTextCustomProps;

export type GameTextCenteredProps = GameTextCustomProps;

```

## /Users/bort/code/crude-cards/src/ui/game/GameTimeout/index.tsx

```typescript
import { GameText, GameTextTitle } from '../GameText';
import { GameBoxCentered } from '../GameBox';
import { RFC } from '@app/ui/type';


export const GameTimeout : RFC = () =>
    <GameBoxCentered>
        <GameTextTitle>
            {'Too Slow'}
        </GameTextTitle>
        <GameText>
            {'You didn\'t pick a card and are banished from this round.'}
        </GameText>
    </GameBoxCentered>

```

## /Users/bort/code/crude-cards/src/ui/game/GameToast/TimerSymbol.tsx

```typescript
import { TimerSymbolProps } from './type';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const TimerSymbol: RFC<TimerSymbolProps> = ({
    timeLeft, color,
}) => (
    <Box
        style={{ border : `2px solid ${color}`, color }}
        className='symbol'>
        {`${timeLeft}s Left`}
    </Box>
);

```

## /Users/bort/code/crude-cards/src/ui/game/GameToast/constant.tsx

```typescript
export const TimeThresholds = Object.freeze([{
    jiggleClass : 'jiggleHigh',
    limit       : 3,
    color       : '#ff0000',
}, {
    jiggleClass : 'jiggleMedium',
    limit       : 5,
    color       : '#ff8c00',
}, {
    jiggleClass : 'jiggleLow',
    limit       : 10,
    color       : '#ffff00',
}]);

```

## /Users/bort/code/crude-cards/src/ui/game/GameToast/index.tsx

```typescript
import { selectTimer } from '@app/client/selector/game';
import { getTimeConfig } from './sharedLogic';
import classes from './GameToast.module.css';
import { TimerSymbol } from './TimerSymbol';
import { useSelector } from 'react-redux';
import { Box } from '@mantine/core';


export const GameToast = () => {

    const timer = useSelector(selectTimer);

    if (!timer.timerType)
        return null;

    const { color, jiggleClass } = getTimeConfig(timer.timeLeft);

    return (
        <Box className={`${classes.toast} ${classes[jiggleClass]}`}>
            <TimerSymbol
                timeLeft={timer.timeLeft}
                color={color} />
        </Box>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameToast/sharedLogic.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';

import { TimeThresholds } from './constant';
import { TimeConfig } from "./type";


/**
 * Get the time configuration for the given time left.
 *
 * @param timeLeft - The time left.
 *
 * @returns The time configuration.
 */
export const getTimeConfig = (
    timeLeft: number,
) : TimeConfig => {
    for (const threshold of TimeThresholds)
        if (timeLeft <= threshold.limit)
            return {
                jiggleClass : threshold.jiggleClass,
                color       : threshold.color,
                timeLeft,
            };

    return {
        jiggleClass : '',
        color       : CardColor.White,
        timeLeft,
    };
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameToast/type.tsx

```typescript
import { PropsWithChildren } from 'react';


export type Props = PropsWithChildren;

export interface TimerSymbolProps {
    timeLeft : number;
}

export interface TimerSymbolProps {
    timeLeft : number;
    color    : string;
}

export interface TimeConfig {
    jiggleClass : string;
    timeLeft    : number;
    color       : string;

}

```

## /Users/bort/code/crude-cards/src/ui/game/GameView/constant.tsx

```typescript
// constant.tsx
export const API_URL = 'https://api.example.com';

```

## /Users/bort/code/crude-cards/src/ui/game/GameView/index.tsx

```typescript
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { GameAction } from '../../../client/action/game.action';
import { GameDealerSelection } from '../GameDealerSelection';
import { GamePlayerSelection } from '../GamePlayerSelection';
import { GameDealerJudge } from '../GameDealerJudge';
import { GameComplete } from '../GameComplete';
import { useEffect, useContext } from 'react';
import { GameContext } from '../GameContext';
import { GameResults } from '../GameResults';
import { GameWaiting } from '../GameWaiting';
import { useDispatch } from 'react-redux';
import { GameLobby } from '../GameLobby';
import { GameError } from '../GameError';
import { useRouter } from 'next/router';
import { GameHome } from '../GameHome';


export const GameView = () => {

    const dispatch = useDispatch();
    const router   = useRouter();

    const { gameState, isDealer, playerDealtCard } = useContext(GameContext);
    const { gameCode } = router.query;


    useEffect(() => {
        if (router.pathname === '/game/game_code' && gameCode && gameCode !== gameState.game_code)
            dispatch(GameAction.joinGame({ game_code : gameCode as string }));

    }, [router.pathname, gameCode, gameState.game_code, dispatch]);

    switch (gameState.game_stage) {

        case GameStage.GameComplete : return <GameComplete />;
        case GameStage.GameResults  : return <GameResults />;
        case GameStage.Lobby        : return <GameLobby />;
        case GameStage.Home         : return <GameHome />;

        case GameStage.PlayerPickWhiteCard :
            return isDealer || playerDealtCard
                ? <GameWaiting />
                : <GamePlayerSelection />;

        case GameStage.DealerPickBlackCard :
            return isDealer
                ? <GameDealerSelection />
                : <GameLobby />;

        case GameStage.DealerPickWinner    :
            return isDealer
                ? <GameDealerJudge />
                : <GameWaiting />;

        default:
            return <GameError />;
    }
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameView/sharedLogic.tsx

```typescript
export const sanitizeGameCode = (input: string): string =>
  input.replace(/[^a-zA-Z0-9]/g, '').trim().toLowerCase();

```

## /Users/bort/code/crude-cards/src/ui/game/GameView/type.tsx

```typescript
import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';


export interface GameViewProps {
    playerDealtCard ?: CardDTO;
    gameState        : GameStateDTO;
    gameCode        ?: string;
    isDealer         : boolean;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameWaiting/DeckRenderer.tsx

```typescript
import { DeckRendererProps } from './type';
import { GameDeck } from '../GameDeck';

export const DeckRenderer: React.FC<DeckRendererProps> = ({
    isDealer, dealerDealtCard, playerDealtCard,
}) => {
    if (isDealer)
        return <GameDeck cards={[dealerDealtCard!]} />;

    return <GameDeck cards={[dealerDealtCard!, playerDealtCard!]} />;
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameWaiting/StatusTableRenderer.tsx

```typescript
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStatusTable } from '../GameStatusTable';
import { StatusTableRendererProps } from './type';
import { GameCardChildren } from '../GameCard';


export const StatusTableRenderer: React.FC<StatusTableRendererProps> = ({
    gameStage, playersExceptDealer,
}) => {

    if (gameStage !== GameStage.PlayerPickWhiteCard)
        return null;

    return (
        <GameCardChildren color={CardColor.Black}>
            <GameStatusTable
                playerStatusList={playersExceptDealer}
                shouldShowScore={false}
                shouldShowDone={true}
                title='Waiting on Players'/>
        </GameCardChildren>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameWaiting/constants.tsx

```typescript
export const MaxPlayerCount = 4;

```

## /Users/bort/code/crude-cards/src/ui/game/GameWaiting/index.tsx

```typescript
import { selectGameWaitingPage } from '../../../client/selector/game';
import { StatusTableRenderer } from './StatusTableRenderer';
import { GameStackType } from '../GameStack/type';
import { useSelector } from '@app/client/hook';
import { DeckRenderer } from './DeckRenderer';
import { GameContext } from '../GameContext';
import { GameStack } from '../GameStack';
import { useContext } from 'react';


export const GameWaiting = () => {

    const { dealerDealtCard, playerDealtCard, gameState } = useContext(GameContext);
    const { playersExceptDealer, isDealer } = useSelector(selectGameWaitingPage);

    if(!dealerDealtCard || !playerDealtCard) {
        console.error('dealerDealtCard or playerDealtCard is not defined', {
            dealerDealtCard, playerDealtCard });

        return null;
    }

    return (
        <GameStack type={GameStackType.Centered}>
            <DeckRenderer
                playerDealtCard={playerDealtCard}
                dealerDealtCard={dealerDealtCard}
                isDealer={isDealer} />
            <StatusTableRenderer
                playersExceptDealer={playersExceptDealer}
                gameStage={gameState.game_stage} />
        </GameStack>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameWaiting/type.tsx

```typescript
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { PlayerStatus } from '../type';


export interface GameStatusTableProps {
    playerStatusList : PlayerStatus[];
    shouldShowScore  : boolean;
    shouldShowDone   : boolean;
    title            : string;
}

export interface GameCardProps {
    children : React.ReactNode;
    color    : string;
}

export interface DeckRendererProps {
    playerDealtCard ?: CardDTO;
    dealerDealtCard  : CardDTO;
    isDealer         : boolean;
}

export interface StatusTableRendererProps {
    playersExceptDealer : PlayerStatus[];
    gameStage           : GameStage;
}

```

## /Users/bort/code/crude-cards/src/ui/game/GameWiggleBox/index.tsx

```typescript
import { App } from '../../AppContext';
import { Box } from '@mantine/core';
import seedrandom from 'seedrandom';
import { useContext } from 'react';
import { RFC } from '../../type';
import { Props } from './type';


export const GameWiggleBox : RFC<Props> = ({
    children, index,

    verticleWiggleFactor = 50,
    cardOverlapFactor    = 40,
    wiggleFactor         = 6,
    tiltFactor           = 8,

    uniqueKey = '',
}) => {

    // const id = useId();

    // stops random wobbling on rerender
    const rand = seedrandom(uniqueKey);

    const { isDebugging } = useContext(App);


    return (
        <Box
            style={{
                border : isDebugging ? '1px solid #f90' : undefined,
                rotate : `${rand() * tiltFactor - (tiltFactor / 2)}deg`,
                width  : '100%',
                left   : wiggleFactor * (rand() - 0.5) * 10,
                top    : -cardOverlapFactor * (index + 1) + rand() * verticleWiggleFactor,
            }}>
            {children}
        </Box>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/GameWiggleBox/type.tsx

```typescript
import { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
    verticleWiggleFactor ?: number;
    cardOverlapFactor    ?: number;
    wiggleFactor         ?: number;
    tiltFactor           ?: number;
    index                 : number;
    uniqueKey            ?: string;
}>;

```

## /Users/bort/code/crude-cards/src/ui/game/ShareCardContent/ShareCardTooltip.tsx

```typescript
import { ShareCardTooltipProps } from './type';
import { GameTextTitle } from "../GameText"
import { Tooltip } from "@mantine/core"
import { RFC } from '../../type';

export const ShareCardTooltip : RFC<ShareCardTooltipProps> = ({
    gameState, isCopied,
}) =>
    <Tooltip
        label={`Copied "${gameState.game_code}"`}
        opened={isCopied}
        position='bottom'
        offset={0}>
        <GameTextTitle>
            {gameState.game_code}
        </GameTextTitle>
    </Tooltip>

```

## /Users/bort/code/crude-cards/src/ui/game/ShareCardContent/index.tsx

```typescript
import { GameTextSmall, GameTextTitle } from '../GameText';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ShareCardTooltip } from './ShareCardTooltip';
import { GameStackType } from '../GameStack/type';
import { GameStack } from '../GameStack/index';
import { GameContext } from '../GameContext';
import { useContext, useState } from 'react';
import { useTimeout } from '@mantine/hooks';
import { GameShare } from '../GameShare';


export const ShareCardContent = () => {

    const { gameState } = useContext(GameContext);

    const [isCopied, setCopied] = useState(false);

    const { start } = useTimeout(() => setCopied(false), 3000);

    const handleCopy = () => {
        debugger;

        setCopied(true);
        start();
    };

    return (
        <>
            <GameTextTitle>
                {'Share Game Code'}
            </GameTextTitle>
            <GameStack type={GameStackType.Centered}>
                <CopyToClipboard
                    text={gameState.game_code!}
                    onCopy={handleCopy}>
                    <ShareCardTooltip
                        gameState={gameState}
                        isCopied={isCopied} />
                </CopyToClipboard>
                <GameTextSmall>
                    {'Share With Friends to Join Game'}
                </GameTextSmall>
                <GameShare />
            </GameStack>
        </>
    );
}


```

## /Users/bort/code/crude-cards/src/ui/game/ShareCardContent/type.tsx

```typescript
import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto';

export interface ShareCardTooltipProps {
    gameState : GameStateDTO;
    isCopied  : boolean;

}

```

## /Users/bort/code/crude-cards/src/ui/game/TextInputDebounced/index.tsx

```typescript
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState, useContext } from 'react';
import { TextInput } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';
import { App } from '../../AppContext';


export const TextInputDebounced: RFC<Props> = ({
    onChange, onBlur, value, label, name,
    milliseconds = 3000,
    size = 'md',
}) => {

    const [text, setText] = useState(value);
    const [debounced] = useDebouncedValue(text, milliseconds);

    const { isDebugging } = useContext(App);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
        setText(evt.currentTarget.value);

    const handleBlur = () => onBlur(text, name);

    useEffect(() => {

        if (debounced !== value)
            onChange(debounced, name);

    }, [debounced, value, onChange, name]);

    const handleKeyDownTextBox = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter')
            handleBlur();
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
            style={{
                border : isDebugging
                    ? '1px dotted #f9d'
                    : undefined,
                input : {
                    borderRadius : '10px',
                    textAlign    : 'center',
                    border       : `1px solid ${CardColor.Black}`,
                },
            }} />
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/TextInputDebounced/type.tsx

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

## /Users/bort/code/crude-cards/src/ui/game/UsernameCardContent/index.tsx

```typescript
import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { TextInputDebounced } from '../TextInputDebounced';
import { useDispatch } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { GameStack } from '../GameStack';
import { GameText } from '../GameText';
import { useContext } from 'react';


export const UsernameCardContent = () => {

    const { gameState, currentPlayer } = useContext(GameContext);
    const dispatch = useDispatch();

    const handleTextUpdate = (updatedText: string): CA =>
        dispatch(GameAction.updateUsername({ username : updatedText }));

    const handleTextInputBlur = (): CA => dispatch(GameAction.noOp());

    return (
        <GameStack>
            <GameText>
                {'Your Name'}
            </GameText>
            {gameState.hand_number > 0 ?
                <GameText>{currentPlayer?.username}</GameText>
             :
                <TextInputDebounced
                    value={currentPlayer?.username ?? ''}
                    onBlur={handleTextInputBlur}
                    onChange={handleTextUpdate}
                    milliseconds={1500}
                    name='username'
                    size='md'/>
            }
        </GameStack>
    );
};

```

## /Users/bort/code/crude-cards/src/ui/game/UsernameCardContent/type.tsx

```typescript
export interface Props {
    text : string;
}

```

## /Users/bort/code/crude-cards/src/ui/game/constant.tsx

```typescript
import { ToastConfig } from './type';


export const DefaultToastConfig = Object.freeze(new ToastConfig());

export const MinimumPlayerCount = 3

```

## /Users/bort/code/crude-cards/src/ui/game/type.tsx

```typescript
import { GamePopupType } from '../../api/src/constant/game-popup-type.enum';
import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../api/src/game/dtos/card.dto'

export type OnClickCard = (id : string, card ?: CardDTO) => unknown;

export interface GameContextType {
    dealerDealtCard : CardDTO   | null;
    playerDealtCard : CardDTO   | null;
    currentPlayer   : PlayerDTO | null;
    headerHeight    : number;
    playerCards     : CardDTO[];
    dealerCards     : CardDTO[];
    popupType       : GamePopupType | null;
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

export enum GameCardType {
    Children,
    Centered,
    Unknown,
    Stack,
    Html,
    Raw,
}

```

## /Users/bort/code/crude-cards/src/ui/game/useFormConfig.tsx

```typescript
import { zodResolver } from 'mantine-form-zod-resolver';
import { useDispatch } from '@app/client/hook';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { ZodType } from 'zod';

export const useFormConfig = (
    schema        : ZodType,
    initialValues : Record<string, unknown>,
    action        : any) => {
    const form = useForm({
        validate : zodResolver(schema),
        mode     : 'uncontrolled',
        initialValues,
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (values: any): void => {
        dispatch(action(values));
        setIsSubmitted(true);
    };

    return {
        form,
        isSubmitted,
        handleSubmit,
        setIsSubmitted,
    };
};

```

