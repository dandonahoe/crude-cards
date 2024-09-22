## Attorney AI Codebase

This document contains the codebase for the Attorney AI project.

### File Structure

- src/
  - Env.tsx
  - Setting.tsx
  - asset/
    - boblawbot/
    - contractgenie/
    - feature/
    - font/
      - Elianto/
    - hoanalyzer/
    - image/
      - developer/
      - homepage/
      - pub/
    - patent/
    - rentersadvantage/
    - ticketblaster/
  - client/
    - AppContextProvider.tsx
    - AppProvider.tsx
    - AppStore.tsx
    - AppTheme.tsx
    - Browser.tsx
    - GameTheme.tsx
    - RootSlice.tsx
    - SagaHelper.tsx
    - SharedAction.ts
    - action/
      - game.action.tsx
    - hook.tsx
    - index.tsx
    - saga/
      - WebSocks.tsx
      - index.tsx
    - selector/
      - common.tsx
      - game.tsx
    - store.tsx
  - constant/
    - UI.tsx
    - framework/
      - BrowserWindowLocationOrigin.tsx
      - ColorTheme.tsx
      - CoreAction.tsx
      - InitialState.tsx
      - MakeConstant.tsx
      - Namespace.tsx
      - Orientation.tsx
      - ProjectName.tsx
      - Pusher.tsx
      - ScreenSize.tsx
      - SpecialId.tsx
    - labels.tsx
    - route/
      - RouteHref.tsx
  - middleware.tsx
  - pages/
    - 500.tsx
    - AppContent/
      - AppHeadGame.tsx
      - AppScript.tsx
    - _app.tsx
    - _document.tsx
    - game.tsx
    - index.tsx
  - test/
    - MockData.ts
    - __mocks__/
    - constant/
      - Boolean.ts
      - Date.ts
      - Invalid.ts
      - JSON.ts
      - Number.ts
      - String.ts
      - Unserializable.ts
    - type.ts
  - type/
    - CoreHash.tsx
    - CoreId.ts
    - framework/
      - core/
        - AppContextModel.tsx
        - CoreAppRoot.tsx
        - CoreSaga.tsx
        - NetworkStatus.tsx
      - data/
        - Optional.tsx
        - P.ts
      - template/
        - CustomPageProps.tsx
  - ui/
    - AppContext.tsx
    - UtilityUI.tsx
    - __tests__/
      - toFormattedDate.spec.tsx
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
    - page/
      - site/
        - PageGame/
          - PageGame.stories.tsx
          - index.tsx
    - type.tsx


### Combined Files

## /Users/bort/code/crude-cards/src/Env.tsx

```typescript
if(!process.env.NODE_ENV)
    throw new Error('NODE_ENV not set, bailing. Thanks, bye.');


const toStringOrExplode = (value : unknown, context : string = '') : string => {

    if (typeof value === 'string')
        return value.trim();

    throw new Error(`Invalid string value: ${value} context (${context})`);
}

// create dedicated function to get value from environment variables


const getValue = <T = string,>(name : string) : T => {

    let value : T | null = null;

    // build injected variables (NEXT_PUBLIC_*) must be looked
    // up via dot notation because of webpack things, don't try to make it look normal,
    // it won't work. Since they're all stored the same way and treated equally as regular build time variables,
    // we push this logic down here to keep it from having to repeat logic outside of this function.

    /* eslint-disable max-len */

    switch (name) {

        //  string Values
        case 'NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN' : return toStringOrExplode(process.env.NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN, 'NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN')as unknown as T;
        case 'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'            : return toStringOrExplode(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,            'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'           )as unknown as T;
        case 'NEXT_PUBLIC_APP_ID'                         : return toStringOrExplode(process.env.NEXT_PUBLIC_APP_ID,                         'NEXT_PUBLIC_APP_ID'                        )as unknown as T;


        case 'NEXT_PUBLIC_NEXT_COUNTDOWN_TIMER_DURATION_SECONDS' : return toStringOrExplode(process.env.NEXT_PUBLIC_NEXT_COUNTDOWN_TIMER_DURATION_SECONDS, 'NEXT_PUBLIC_NEXT_COUNTDOWN_TIMER_DURATION_SECONDS')as unknown as T;

        case 'NEXT_GOOGLE_GEMINI_API_KEY' : return toStringOrExplode(process.env.NEXT_GOOGLE_GEMINI_API_KEY, 'NEXT_GOOGLE_GEMINI_API_KEY') as unknown as T;
        case 'NEXT_PUSHER_APP_ID'         : return toStringOrExplode(process.env.NEXT_PUSHER_APP_ID,         'NEXT_PUSHER_APP_ID'        ) as unknown as T;
        case 'NEXT_PUSHER_SECRET'         : return toStringOrExplode(process.env.NEXT_PUSHER_SECRET,         'NEXT_PUSHER_SECRET'        ) as unknown as T;

        case 'NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE' : return toStringOrExplode(process.env.NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE, 'NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE')as unknown as T;
        case 'NEXT_PUBLIC_WEB_SOCKET_HOST_ORIGIN'   : return toStringOrExplode(process.env.NEXT_PUBLIC_WEB_SOCKET_HOST_ORIGIN,   'NEXT_PUBLIC_WEB_SOCKET_HOST_ORIGIN' ) as T;


        default: value = process.env[name] as T;
    }

    /* eslint-enable max-len */

    if (!value)
        console.log('Unable to find value for', name);

    return value as T;
};

const getNumber = (name : string) : number =>
    parseInt(getValue(name));

const getBoolean = (name : string) : boolean =>
    getValue(name) === 'true';

const getArray = (name : string) : string[] =>
    getValue(name).split(',');

const getObject = (name : string) : Record<string, unknown> =>
    JSON.parse(getValue(name));

export const getSubdomain = () : string | null => {
    const parts = window.location.hostname.split('.');

    if (parts.length > 2)
        return parts[0].toLowerCase().trim();
    else
        return null;
}


const getHttpProtocol =  () : 'http' | 'https' =>
    process.env.NODE_ENV === 'production' ? 'https' : 'http';

const isDevelopment = () : boolean => process.env.NODE_ENV === 'development';
const isProduction  = () : boolean => process.env.NODE_ENV === 'production';
const isClient      = () : boolean => typeof window !== 'undefined';
const isServer      = () : boolean => !isClient();
const isTest        = () : boolean => process.env.NODE_ENV === 'test';
const isBuilding    = () : boolean => process.env.IS_BUILDING ? true : false;


export const Env = {
    getHttpProtocol,
    isDevelopment,
    isProduction,
    getSubdomain,
    isBuilding,
    getBoolean,
    getNumber,
    getObject,
    getValue,
    isClient,
    isServer,
    getArray,
    isTest,
};

```

## /Users/bort/code/crude-cards/src/Setting.tsx

```typescript


const get = <T = string,>(_name : string) : T => {

    return 'gpt-4-0125-preview' as T;

    // return 'gpt-4' as T;
    // return 'gpt-4-1106-preview' as T;
};


export const Setting = {
    get,
};

```

## /Users/bort/code/crude-cards/src/client/AppContextProvider.tsx

```typescript
import { AppContextModel } from '../type/framework/core/AppContextModel';
import { NetworkStatus } from '../type/framework/core/NetworkStatus';
import { ColorTheme } from '@app/constant/framework/ColorTheme';
import { ScreenSize } from '@app/constant/framework/ScreenSize';
import React, { PropsWithChildren, useMemo } from 'react';
import { DefaultAppContext } from '../ui/AppContext';
import { App } from '@app/ui/AppContext';
import { RFC } from '@app/ui/type';
import {
    useColorScheme, useMediaQuery, useNetwork, useOs,
    useDocumentVisibility, useReducedMotion, useIdle,
} from '@mantine/hooks';


export const AppContextProvider : RFC<PropsWithChildren> = ({
    children,
}) => {
    const isReducedMotion = useReducedMotion(DefaultAppContext.isReducedMotion);
    const tabVisibility   = useDocumentVisibility();
    const networkStatus   = useNetwork() as NetworkStatus;
    const colorScheme     = useColorScheme(DefaultAppContext.colorTheme);
    const isIdle          = useIdle(5000);
    const os              = useOs() || DefaultAppContext.os;

    // todo - this has never worked reliably but seems close
    const colorTheme = colorScheme === ColorTheme.Dark
        ? ColorTheme.Dark
        : ColorTheme.Light;

    // todo - remove hard coded values
    const isPhone  = useMediaQuery('(max-width: 36em)') || DefaultAppContext.isPhone;
    const isTablet = useMediaQuery('(max-width: 75em)') || DefaultAppContext.isTablet;

    const screenSize : ScreenSize =
        isPhone
            ? ScreenSize.Phone
            : isTablet
                ? ScreenSize.Tablet
                : ScreenSize.Desktop;

    const isDesktop = screenSize === ScreenSize.Desktop;
    const isMobile  = isPhone || isTablet;

    const appContext = useMemo(() => ({
        isDebugging : DefaultAppContext.isDebugging,
        tabVisibility, isReducedMotion, networkStatus, isDesktop, os,
        isTablet, isMobile, isPhone, colorTheme, screenSize, isIdle,
    } as AppContextModel), [
        tabVisibility, isReducedMotion, networkStatus, isDesktop, os,
        isTablet, isMobile, isPhone, colorTheme, screenSize, isIdle,
    ]);

    return (
        <App.Provider value={appContext}>
            {children}
        </App.Provider>
    );
};

```

## /Users/bort/code/crude-cards/src/client/AppProvider.tsx

```typescript
import { AppContextProvider } from './AppContextProvider';
import React, { PropsWithChildren } from 'react';
import { AppStore } from './AppStore';
import { RFC } from '@app/ui/type';


export const AppProvider : RFC<PropsWithChildren> = ({
    children,
}) =>
    <AppStore>
        <AppContextProvider>
            {children}
        </AppContextProvider>
    </AppStore>

```

## /Users/bort/code/crude-cards/src/client/AppStore.tsx

```typescript
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { RFC } from '@app/ui/type';
import store from './store';


export const AppStore : RFC<PropsWithChildren> = ({
    children,
}) =>
    <Provider store={store}>
        {children}
    </Provider>

```

## /Users/bort/code/crude-cards/src/client/AppTheme.tsx

```typescript
import { createTheme, MantineColor, rem } from '@mantine/core';

export const AppTheme = createTheme({
    fontFamily : 'Helvetica Neue, sans-serif',

    fontSizes : {
        xs : rem(10),
        sm : rem(11),
        md : rem(14),
        lg : rem(16),
        xl : rem(20),
    },
    colors : {
        white : ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
        black : ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
    },
    components : {
        Text : {
            defaultProps : {
                color : 'white', // Default text color
                fw    : 600,    // Default font weight for text
            },
            styles : {
                root : {
                    // color : 'white', // Ensure text is white by default
                },
            },
        },
        Button : {
            defaultProps : {
                color : 'white', // Default button text color
            },
        },
        Box : {
            styles : (theme: { colors: { white: MantineColor[]; }; }) => ({
                root : {
                    color : theme.colors.white[0], // Apply default white text
                },
            }),
        },
        Heading : {
            defaultProps : {
                fw : 600, // Apply bold font weight to headings by default
            },
        },

    },
});

```

## /Users/bort/code/crude-cards/src/client/Browser.tsx

```typescript
import { P } from '@app/type/framework/data/P';


const signOut = async () : P<unknown> =>
    await window.Clerk.signOut();

const redirect = async (targetUrl : string) : P<void> => {
    window.location.href = targetUrl;
};

export const Browser = {
    redirect,
    signOut,
};

```

## /Users/bort/code/crude-cards/src/client/GameTheme.tsx

```typescript
import { createTheme, rem } from '@mantine/core';


export const GameTheme = createTheme({

    fontFamily : '\'Helvetica Neue Bold\', Arial, sans-serif',

    fontSizes : {
        xs : rem(16),
        sm : rem(24),
        md : rem(36),
        lg : rem(48),
        xl : rem(60),
    },

    headings : {
        sizes : {
            h1 : {
                fontSize : rem(72),
            },
        },
    },
});


```

## /Users/bort/code/crude-cards/src/client/RootSlice.tsx

```typescript
import { GamePopupType } from '../api/src/constant/game-popup-type.enum';
import { InitialState } from '@app/constant/framework/InitialState';
import { GameStateDTO } from '../api/src/game/dtos/game-state.dto';
import { ProjectName } from '@app/constant/framework/ProjectName';
import { GameStage } from '../api/src/constant/game-stage.enum';
import { PlayerDTO } from '../api/src/game/dtos/player.dto';
import { CardDTO } from '../api/src/game/dtos/card.dto';
import { GameAction } from './action/game.action';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';


const slice = createSlice({
    initialState : InitialState,
    reducers     : {},
    name         : ProjectName,

    extraReducers : builder => {

        builder.addCase(GameAction.resetGameState, state => {
            state.game.gameState = GameStateDTO.Default;
            state.game.popupType = null;
        });

        builder.addCase(GameAction.updateGameState, (state, { payload : gameStateString }) => {
            const gameState = JSON.parse(gameStateString) as GameStateDTO;

            const {
                new_deck_card_list, player_list,
                ...rootGameState
            } = gameState;

            if(rootGameState.game_stage === GameStage.Home) {
                state.game.previousHandDealerCardId = null;
                state.game.previousHandWinnerCardId = null;
                state.game.gameState = gameState;

                return;
            }

            const playerLookup = player_list.reduce((acc, player) => {

                acc[player.id!] = player;

                return acc;
            }, {} as {[key : string] : PlayerDTO});

            let newCardDeck : {[key : string] : CardDTO} | null = null;

            // Create a lookup table by card id for the new deck
            if(new_deck_card_list) {
                console.log('Update includes the deck adding it to the state', new_deck_card_list);

                newCardDeck = new_deck_card_list.reduce((acc, cardDTO) => {
                    acc[cardDTO.id!] = {
                        id    : cardDTO.id!,
                        color : cardDTO.color!,
                        text  : cardDTO.text!,
                    }

                    return acc;
                }, {} as {[key : string] : CardDTO});
            }

            // this lets the players stay on the results screen
            // while the session is being updated by the dealer
            // of the upcoming round
            if(gameState.game_stage === GameStage.GameResults) {
                console.log('updateGameState::Results Screen', gameState);

                // foofindme
                console.log('updateGameState::Results Screen', gameState);
                state.game.previousHandDealerCardId = gameState.dealer_card_id;
                state.game.previousHandWinnerCardId = gameState.winner_card_id;
            } else {
                console.log('updateGameState::Not on GameResults stage');
            }

            state.game.playerLookup  = playerLookup;

            state.game.gameState = {
                ...rootGameState,
                new_deck_card_list : null,
            };

            // keep it separate from the main game update since
            // it the update generally returns a null deck and
            // it would disappear if we just set it in the main update
            if(newCardDeck)
                state.game.cardDeck = newCardDeck;
        });

        // same thing, but doesnt trigger the counter loop again
        builder.addCase(GameAction.updateTimer, (state, { payload : startTimer }) => {
            state.game.timer = startTimer;
        });

        builder.addCase(GameAction.menuItemClicked, (state, { payload : menuItemClicked }) => {
            state.game = {
                ...state.game,
                popupType : menuItemClicked.item_id as GamePopupType,
            };
        });

        builder.addCase(GameAction.closePopup, state => {
            state.game = {
                ...state.game,
                popupType : null,
            };
        });
    },
});

// eslint-disable-next-line import/no-default-export
export default slice;

```

## /Users/bort/code/crude-cards/src/client/SagaHelper.tsx

```typescript
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { CoreAction } from '../constant/framework/CoreAction';
import { all, fork, call, take } from 'typed-redux-saga';
import { Saga } from '../type/framework/core/CoreSaga';
import { GameAction } from './action/game.action';
import { AxiosError } from 'axios';
import { sagaDispatch } from '.';


// helper function to templatize the take effect and return just the payload object
export function* takePayload<T>(
    type : ActionCreatorWithPayload<T>,
) : Saga<T> {

    const { payload } = (yield take(type)) as CoreAction<T>;

    return payload;
}

export function* takePayloadList<T>(
    types : ActionCreatorWithPayload<T>[],
) : Saga<T> {

    const { payload } = (yield take(types)) as CoreAction<T>;

    return payload;
}


function* handleError(exc : unknown) : Saga {

    if (exc instanceof AxiosError)
        return;

    // console.log(exc.response?.data?.message || exc.message);

    if (exc instanceof Error) {

        console.log(exc.message)

        return;
    }

    yield null;
}

export const sagaDispatchAll = (actions : CoreAction[]) : Saga<unknown> =>
    all(actions.map(action => sagaDispatch(action ?? GameAction.noOp())));

export const forkWhile = (saga : () => Saga) : Saga<unknown> =>
    fork(whileSaga, saga);

export const forkWhileAll = (sagas : (() => Saga)[]) : Saga<unknown> =>
    all(sagas.map(saga => forkWhile(saga)));

// utility function to fork a saga and repeatedely call a callback method
// even if it thros an exception.
function* whileSaga(saga : () => Saga) : Saga {

    while (true) try {
        yield* call(saga);
    } catch (exc) {
        yield* call(handleError, exc);
    }
}

export const SagaHelper = {
    sagaDispatchAll,
    forkWhileAll,
    takePayload,
    forkWhile,
};

```

## /Users/bort/code/crude-cards/src/client/SharedAction.ts

```typescript
import { localConstant } from '@app/constant/framework/MakeConstant';
import { createAction } from '@reduxjs/toolkit';


const ActionTypePrefix = localConstant('Action');

export const actionName = (name: string): string => ActionTypePrefix(name);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const action = <T = undefined>(actionNamePrefix: string, usePrefix : boolean = true) =>
    createAction<T>(
        usePrefix
            ? actionName(actionNamePrefix)
            : actionNamePrefix);

```

## /Users/bort/code/crude-cards/src/client/action/game.action.tsx

```typescript
import { DealerPickBlackCardDTO } from '../../api/src/game/dtos/dealer-pick-black-card.dto';
import { DealerPickWinnerDTO } from '../../api/src/game/dtos/dealer-pick-winner.dto';
import { PlayerSelectCardDTO } from '../../api/src/game/dtos/player-select-card.dto';
import { MenuItemClickedDTO } from '../../api/src/game/dtos/menu-item-clicked.dto';
import { WebSocketEventType } from '../../api/src/constant/websocket-event.enum';
import { SubmitFeedbackDTO } from '../../api/src/game/dtos/submit-feedback.dto';
import { UpdateUsernameDTO } from '../../api/src/game/dtos/update-username.dto';
import { TimerCompleteDTO } from '../../api/src/game/dtos/timer-complete.dto';
import { UpdateTimerDTO } from '../../api/src/game/dtos/update-timer.dto';
import { CreateGameDTO } from '../../api/src/game/dtos/create-game.dto';
import { StartGameDTO } from '../../api/src/game/dtos/start-game.dto';
import { LeaveGameDTO } from '../../api/src/game/dtos/leave-game.dto';
import { NextHandDTO } from '../../api/src/game/dtos/next-hand.dto';
import { JoinGameDTO } from '../../api/src/game/dtos/join-game.dto';
import { LogRelayDTO } from '../../api/src/game/dtos/log-relay.dto';
import { action } from '../SharedAction';


// todo: move this
export interface WebSocketMessage {
    type : string;
    data : unknown;
}

export const GameAction = {
    sendWebSocketMessage : action<WebSocketMessage      >('SendWebSocketMessage'                       ),
    dealerPickBlackCard  : action<DealerPickBlackCardDTO>(WebSocketEventType.DealerPickBlackCard, false), // No Prefix to Match Server
    dealerPickWinner     : action<DealerPickWinnerDTO   >(WebSocketEventType.DealerPickWinner,    false), // No Prefix to Match Server
    playerSelectCard     : action<PlayerSelectCardDTO   >(WebSocketEventType.PlayerSelectCard,    false), // No Prefix to Match Server
    menuItemClicked      : action<MenuItemClickedDTO    >(WebSocketEventType.MenuItemClicked,     false), // No Prefix to Match Server
    updateGameState      : action<string                >('UpdateGameState'                            ),
    submitFeedback       : action<SubmitFeedbackDTO     >(WebSocketEventType.SubmitFeedback,      false), // No Prefix to Match Server
    updateUsername       : action<UpdateUsernameDTO     >(WebSocketEventType.UpdateUsername,      false), // No Prefix to Match Server
    resetGameState       : action<void                  >('ResetGameState'                             ),
    timerComplete        : action<TimerCompleteDTO      >('TimerComplete'                              ),
    updateTimer          : action<UpdateTimerDTO        >('UpdateTimer'                                ),
    closePopup           : action<void                  >('ClosePopup'                                 ),
    createGame           : action<CreateGameDTO         >(WebSocketEventType.CreateGame,          false), // No Prefix to Match Server
    updateGame           : action<void                  >(WebSocketEventType.UpdateGame,          false), // No Prefix to Match Server
    startGame            : action<StartGameDTO          >(WebSocketEventType.StartGame,           false), // No Prefix to Match Server
    leaveGame            : action<LeaveGameDTO          >(WebSocketEventType.LeaveGame,           false), // No Prefix to Match Server
    nextHand             : action<NextHandDTO           >(WebSocketEventType.NextHand,            false), // No Prefix to Match Server
    joinGame             : action<JoinGameDTO           >(WebSocketEventType.JoinGame,            false), // No Prefix to Match Server
    noOp                 : action<void                  >('NoOp'                                       ),
    logRelay             : action<LogRelayDTO           >(WebSocketEventType.LogRelay,            false), // No Prefix to Match Server
};

```

## /Users/bort/code/crude-cards/src/client/hook.tsx

```typescript
import { useDispatch as useDispatchGeneric, useSelector as useSelectorGeneric } from 'react-redux';
import { useRouter as useRouterGeneric } from 'next/router';
import { type AppDispatch, type RootState } from './store';
import type { TypedUseSelectorHook } from 'react-redux';
import { type Dispatch } from '@reduxjs/toolkit';


export const useRouter = useRouterGeneric;

export const useDispatch = () : Dispatch => useDispatchGeneric<AppDispatch>();
export const useSelector : TypedUseSelectorHook<RootState> = useSelectorGeneric;

export const Hook = {
    useDispatch,
    useSelector,
    useRouter,
};


```

## /Users/bort/code/crude-cards/src/client/index.tsx

```typescript
export { delay, put as sagaDispatch, select, call } from 'typed-redux-saga';

```

## /Users/bort/code/crude-cards/src/client/saga/WebSocks.tsx

```typescript
import { selectCurrentPlayer, selectGameState, selectIsDealer, selectTimer } from '../selector/game';
import { WebSocketEventType } from '../../api/src/constant/websocket-event.enum';
import { call, delay, select, take, takeEvery } from 'typed-redux-saga';
import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { GameStage } from '../../api/src/constant/game-stage.enum';
import { TimerType, CookieType } from '../../api/src/type';
import { Saga } from '../../type/framework/core/CoreSaga';
import { GameAction } from '../action/game.action';
import { PayloadAction } from '@reduxjs/toolkit';
import { Socket, io } from 'socket.io-client';
import { takePayload } from '../SagaHelper';
import { eventChannel } from 'redux-saga';
import { sagaDispatch } from '..';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { Env } from '@app/Env';


let socket: Socket | null = null;

const CountdownTimerDurationSeconds = Env.getValue<number>('NEXT_PUBLIC_NEXT_COUNTDOWN_TIMER_DURATION_SECONDS');

// skip initalizing the websocket when building or running tests
if (!Env.isBuilding() && !Env.isTest()) {

    // const origin = 'https://crude-cards-api-service-326275095555.us-west1.run.app';
    const origin = Env.getValue<string>('NEXT_PUBLIC_WEB_SOCKET_HOST_ORIGIN');

    console.log('Connecting to WebSocket:', origin);

    socket = io(origin, {
        withCredentials : true,
        auth            : {
            AuthToken : Cookies.get(CookieType.AuthToken),
        },
    });
}

if (socket)
    socket.on('connect', () => {
        console.log('Client WebSocket Connected');

        socket.on('connect_error', (error: Error) => {
            if (socket.active)
                console.log('Reconnecting WebSocket...');
            else
                console.log('connect_error', error.message);
        });

        socket.on(WebSocketEventType.UpdatePlayerValidation, (validation: string) => {
            console.log('CLIENT GOT: validation', validation);

            Cookies.set(CookieType.AuthToken, validation);
        });
    });


// this function creates an event channel from a given socket
// Setup subscription to incoming update events
export function createGameUpdateReceiverSagaChannel(socket : Socket) {
    console.log('createGameUpdateReceiverSagaChannel ');

    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel(emit => {

        socket.on(WebSocketEventType.UpdateGame,
            (gameState : GameStateDTO) =>
                emit(gameState),
        );

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            socket.off(WebSocketEventType.UpdateGame);
        }

        return unsubscribe
    })
}

// All this does is listen, no sending
function* sagaStartUpdateListener(): Saga {
    if (!socket)
        return;

    console.log('sagaStartUpdateListener started');

    // listen and respond only to GameUpdate events pushed from the server

    const channelGameUpdateListener = yield* call(
        createGameUpdateReceiverSagaChannel, socket);

    console.log('Socket channel created');

    while (true) {

        let previousGameState = yield* select(selectGameState);
        console.log('Initial game state:', previousGameState);

        console.log('Waiting for new game state...');
        const newGameState = (yield* take(channelGameUpdateListener)) as GameStateDTO;

        console.log('New game state received:', newGameState);
        const newGameStateString = JSON.stringify(newGameState);

        yield* sagaDispatch(GameAction.updateGameState(newGameStateString));

        // This can happen when the server is disconnecting a player
        if(newGameState.new_auth_token) {
            console.log('New Auth Token Received in Game Update', newGameState.new_auth_token);
            Cookies.set(CookieType.AuthToken, newGameState.new_auth_token);
        }

        if(newGameState.game_stage === GameStage.Home) {
            console.log('Game stage is Home, clearing game code from url');
            Router.push('/');
        }

        console.log('Game State Updated, checking timers');

        if (newGameState.game_stage == previousGameState.game_stage) {
            console.log(`State didn't change from ${newGameState.game_stage}, skipping timer`);
            continue;
        }

        // On any page but the homepage, put the game code in the url
        if(newGameState.game_stage !== GameStage.Home) {
            console.log(`Non homepage stage, updating url with game code $newGameState.game_stage}`);
            Router.push(`/game/${newGameState.game_code}`);
        }

        console.log(`State changed to ${newGameState.game_stage}, updating timer`);
        yield* sagaDispatch(GameAction.updateTimer({
            timerType : null,
            timeLeft  : 0,
        }));

        const isDealer = yield* select(selectIsDealer);
        console.log('Is dealer:', isDealer);

        switch (newGameState.game_stage) {
            case GameStage.DealerPickBlackCard: {
                console.log('Game stage: DealerPickBlackCard');

                if (isDealer) {
                    console.log('Starting timer for DealerPickBlackCard');

                    yield* sagaDispatch(GameAction.updateTimer({
                        timerType : TimerType.DealerPickBlackCard,
                        timeLeft  : CountdownTimerDurationSeconds,
                    }));
                }
            } break;

            case GameStage.PlayerPickWhiteCard: {
                console.log('Game stage: PlayerPickWhiteCard');

                yield* sagaDispatch(GameAction.updateTimer({
                    timerType : TimerType.PlayerSelectWhiteCard,
                    timeLeft  : CountdownTimerDurationSeconds,
                }));
            } break;

            case GameStage.DealerPickWinner: {
                console.log('Game stage: DealerPickWinner');

                if (isDealer) {
                    console.log('Starting timer for DealerPickWinner');
                    yield* sagaDispatch(GameAction.updateTimer({
                        timerType : TimerType.DealerPickWinner,
                        timeLeft  : CountdownTimerDurationSeconds,
                    }));
                }
            } break;

            default: {
                console.log('Noop game stage for timers:', newGameState.game_stage);
            }
        }

        previousGameState = newGameState;

        console.log('Previous game state updated:', previousGameState);
    }
}


// eslint-disable-next-line require-yield
function* onSendWebSocketMessage(
    action : PayloadAction<Record<string, unknown>>,
) : Saga {
    console.log('Received an Action to Send a WebSocket Message', action);

    if(!socket) {
        console.error('No socket available');

        return;
    }

    // puggyback the auth token onto every websocket request.
    // Again, this probably should be handled via JWTs of something
    const auth_token = Cookies.get(CookieType.AuthToken);

    console.log('Auth Token:', auth_token);

    const payload = action.payload as Record<string, unknown>;

    // if there's already a game code in the action, use it. For instance when
    // a player joins a game, the game code is what they type.

    const game_code =
        // if game_code was included in the payload, prioritize it over the url
        payload['game_code']?.toString()
        || Router.query['gameCode']?.toString()
        || null; // todo: Use Standard Error String or something

    // todo: add runtimeContext
    const socketPayload = {
        ...action.payload as Record<string, unknown>,
        auth_token,
        game_code,
    };

    // Pew pew pew!
    console.log(socketPayload);

    socket.emit(action.type, socketPayload);
}

// Double check this logic, i think its fallen out of date
// and might be spawning lots of listeners., ideally get rid o this
// and just use the relay channel

function* sagaSendWebSocketMessage(): Saga {
    yield* takeEvery([
        GameAction.dealerPickBlackCard,
        GameAction.playerSelectCard,
        GameAction.dealerPickWinner,
        GameAction.updateUsername,
        GameAction.submitFeedback,
        GameAction.createGame,
        GameAction.startGame,
        GameAction.leaveGame,
        GameAction.joinGame,
        GameAction.nextHand,
        // GameAction.logRelay, // reenable this
    ], onSendWebSocketMessage);
}


function* sagaStartTimer(): Saga {

    let timer = yield* select(selectTimer);

    while (true) {
        yield delay(1000);

        timer = yield* select(selectTimer);

        if (!timer.timerType) continue;

        if (timer.timeLeft <= 0) {

            yield* sagaDispatch(GameAction.updateTimer({
                timerType : null,
                timeLeft  : 0,
            }));

            yield* sagaDispatch(GameAction.timerComplete({
                timerType : timer.timerType,
            }));

            continue;
        }

        yield* sagaDispatch(GameAction.updateTimer({
            ...timer,
            timeLeft : timer.timeLeft - 1,
        }));
    }
}

function* sagaTimerComplete(): Saga {

    const timerComplete = yield* takePayload(GameAction.timerComplete);

    const currentPlayer = yield* select(selectCurrentPlayer);
    const isDealer = yield* select(selectIsDealer);
    const game = yield* select(selectGameState);

    switch (timerComplete.timerType) {
        case TimerType.DealerPickBlackCard: {
            if (isDealer)
                yield* sagaDispatch(GameAction.dealerPickBlackCard({
                    card_id : game.dealer_card_id_list[0],
                }));
        } break;

        case TimerType.PlayerSelectWhiteCard: {
            if (!isDealer)
                yield* sagaDispatch(GameAction.playerSelectCard({
                    card_id : currentPlayer?.card_id_list[0] ?? null,
                }));
        } break;

        case TimerType.DealerPickWinner: {
            if (isDealer)
                yield* sagaDispatch(GameAction.dealerPickWinner({
                    card_id : game.selected_card_id_list[0],
                }));
        } break;
    }
}


export const WebSocks = {
    sagaSendWebSocketMessage,
    sagaStartUpdateListener,
    sagaTimerComplete,
    sagaStartTimer,

    *[Symbol.iterator]() {
        yield this.sagaSendWebSocketMessage;
        yield this.sagaStartUpdateListener;
        yield this.sagaTimerComplete;
        yield this.sagaStartTimer;
    },
};

```

## /Users/bort/code/crude-cards/src/client/saga/index.tsx

```typescript
import { type Saga } from '@app/type/framework/core/CoreSaga';
import { forkWhileAll } from '../SagaHelper';
import { WebSocks } from './WebSocks';


function* saga() : Saga {
    yield* forkWhileAll([
        ...WebSocks,
    ]);
}

// eslint-disable-next-line import/no-default-export
export default saga;

```

## /Users/bort/code/crude-cards/src/client/selector/common.tsx

```typescript

import { CoreAppRoot } from '@app/type/framework/core/CoreAppRoot';


export const selectState = (
    state : CoreAppRoot,
) : CoreAppRoot => state;


```

## /Users/bort/code/crude-cards/src/client/selector/game.tsx

```typescript
import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../api/src/game/dtos/player.dto';
import { createSelector } from '@reduxjs/toolkit';
import { PlayerStatus } from '@app/ui/game/type';
import { selectState } from './common';
import { intersection } from 'lodash';


export const selectGame = createSelector(
    selectState,
    state => state.game,
);

export const selectCardDeck = createSelector(
    selectGame,
    game => game.cardDeck,
);

export const selectTimer = createSelector(
    selectGame,
    game => game.timer,
);

export const selectPlayerLookup = createSelector(
    selectGame,
    game => game.playerLookup,
);

export const selectPreviousHandDealerCard = createSelector(
    selectGame, selectCardDeck,
    (game, cardDeck) => cardDeck[game.previousHandDealerCardId!],
);

export const selectPreviousHandWinnerCard = createSelector(
    selectGame, selectCardDeck,
    (game, cardDeck) => cardDeck[game.previousHandWinnerCardId!],
);

export const selectGameState = createSelector(
    selectGame,
    game => {
        const player_list = Object
            .keys(game.playerLookup)
            .map(key => game.playerLookup[key]);

        return {
            ...game.gameState,
            player_list,
        } as GameStateDTO;
    },
);

export const selectCurrentPlayer = createSelector(
    selectGameState, selectPlayerLookup,
    (gameState, playerLookup) => {

        if(!gameState.current_player_id)
            return null;

        return (playerLookup[gameState.current_player_id] ?? null) as PlayerDTO;
    },
);

export const selectSessionEndMessage = createSelector(
    selectGameState,
    gameState => gameState.game_end_message ?? '[NO MESSAGE]',
);

export const selectWinner = createSelector(
    selectGameState, selectPlayerLookup,
    (gameState, playerLookup) => {

        if(!gameState.winner_player_id)
            return null;

        return playerLookup[gameState.winner_player_id];
    },
);

export const selectIsPlayerWinner = createSelector(
    selectGameState,
    gameState => gameState.winner_player_id === gameState.current_player_id,
);


export const selectWinnerCard = createSelector(
    selectGameState, selectCardDeck,
    (gameState, cardDeck) => {

        if(!gameState.winner_card_id)
            return null;

        return cardDeck[gameState.winner_card_id];
    },
);

export const selectPopupType = createSelector(
    selectGame,
    game => game.popupType,
);

export const selectIsDealer = createSelector(
    selectGameState,
    rootGameState =>
        rootGameState.current_player_id && rootGameState.dealer_id
        ? rootGameState.current_player_id === rootGameState.dealer_id
        : false,
);

export const selectIsHost = createSelector(
    selectCurrentPlayer, selectGameState,
    (player, rootGameState) =>
        player?.id
            ? player?.id === rootGameState.host_player_id
            : false,
);

export const selectDealerDealtCard = createSelector(
    selectGameState, selectCardDeck,
    (gameState, cardDeck) => {

        if(!gameState.dealer_card_id)
            return null;

        return cardDeck[gameState.dealer_card_id];
    },
);

export const selectPlayerDealtCard = createSelector(
    selectGameState, selectCurrentPlayer, selectCardDeck,
    (gameState, currentPlayer, cardDeck) => {

        const testing = intersection(
            currentPlayer?.card_id_list,
            gameState.selected_card_id_list,
        );

        if(testing.length !== 1)
            return null;

        const playerSelectedCardId = testing[0]

        return cardDeck[playerSelectedCardId];
    },
);

export const selectPlayerList = createSelector(
    selectGameState,
    gameState => gameState.player_list,
);


export const selectFoes = createSelector(
    selectGameState, selectPlayerList,
    (gameState, playerList) =>
        playerList.filter(player =>
            player.id !== gameState.current_player_id),
);


export const selectAllPlayerStatus = createSelector(
    selectGameState, selectPlayerList, selectPlayerLookup,
    (gameState, playerList, playerLookup) =>
        playerList.map(player => {

            const isDone = intersection(
                player?.card_id_list,
                gameState.selected_card_id_list,
            ).length > 0;

            const playerDTO = playerLookup[player.id!];

            return {
                isWinner : player.id === gameState.winner_player_id || player.id === gameState.champion_player_id,
                player   : playerDTO,
                score    : playerDTO.score,
                isDone,
            } as PlayerStatus;

        }).sort((a, b) =>
            b.player.score - a.player.score,
        ));

export const selectPlayerWaitStatus = createSelector(
    selectAllPlayerStatus, selectGameState,
    (allPlayerStatus, gameState) =>
        allPlayerStatus.filter(stat =>
            stat.player.id !== gameState.dealer_id));

export const selectGameChampion = createSelector(
    selectGameState, selectPlayerLookup,
    (gameState, playerLookup) => {

        if(!gameState.champion_player_id)
            return null;

        return playerLookup[gameState.champion_player_id];
    },
);

export const selectPlayerCards = createSelector(
    selectCurrentPlayer, selectCardDeck,
    (currentPlayer, cardDeck) => {

        if(!currentPlayer?.card_id_list)
            return [];

        return currentPlayer?.card_id_list.map(
            card_id => cardDeck[card_id]);
    },
);

export const selectGameComplete = createSelector(
    selectAllPlayerStatus, selectGameChampion, selectIsPlayerWinner,
    (allPlayerStatus, gameChampion, isWinner) => ({
        allPlayerStatus,
        gameChampion,
        isWinner,
    }),
);

export const selectSelectedCards = createSelector(
    selectGameState, selectCardDeck,
    (gameState, cardDeck) => gameState.selected_card_id_list.map(
        card_id => cardDeck[card_id]),
);

export const selectDealerCards = createSelector(
    selectGameState, selectCardDeck,
    (gameState, cardDeck) => gameState.dealer_card_id_list.map(
        card_id => cardDeck[card_id]),
);

export const selectGameResults = createSelector(
    selectPreviousHandDealerCard, selectPreviousHandWinnerCard, selectSessionEndMessage, selectAllPlayerStatus, selectIsPlayerWinner,
    (previousHandDealerCard, previousHandWinnerCard, sessionEndMessage, allPlayerStatus, isPlayerWinner) => ({
        previousHandDealerCard, previousHandWinnerCard, sessionEndMessage, allPlayerStatus, isPlayerWinner,
    }),
);

/*
import { selectPlayerWaitStatus, selectIsDealer } from '../../../client/selector/game';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { GameStackType } from '../GameStack/type';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { StatusTable } from './StatusTable';
import { DealerDeck } from './DealerDeck';
import { PlayerDeck } from './PlayerDeck';
import { GameStack } from '../GameStack';
import { useContext } from 'react';


export const GameWaiting = () => {

    const { dealerDealtCard, playerDealtCard, gameState } = useContext(GameContext);

    const { isDealer, playersExceptDealer } = useSelector(selectGameWaitingPage);

    const playerStatusList = useSelector(selectPlayerWaitStatus);
    const isDealer         = useSelector(selectIsDealer);

    const playersExceptDealer = playerStatusList.filter(playerStatus =>
        playerStatus.player.id !== gameState.dealer_id);

    if(!dealerDealtCard || !playerDealtCard) {
        const errorMessage = 'Dealer has not dealt a card';

        console.error(errorMessage, { isDealer, dealerDealtCard, playerDealtCard });

        throw new Error(errorMessage);
    }

    return (
        <GameStack type={GameStackType.Centered}>
            {isDealer
                ? <DealerDeck dealerDealtCard={dealerDealtCard} />
                : (<PlayerDeck
                        dealerDealtCard={dealerDealtCard}
                        playerDealtCard={playerDealtCard} />)
            }
            {gameState.game_stage === GameStage.PlayerPickWhiteCard &&
                <StatusTable playerStatusList={playersExceptDealer} />
            }
        </GameStack>
    );
};
making this work
*/
export const selectGameWaitingPage = createSelector(
    selectPlayerWaitStatus, selectIsDealer, selectGameState,
    (playerStatusList, isDealer, gameState) => {

        const playersExceptDealer = playerStatusList.filter(playerStatus =>
            playerStatus.player.id !== gameState.dealer_id) ?? [];

        return {
            playersExceptDealer, isDealer,
        };
    },
);

```

## /Users/bort/code/crude-cards/src/client/store.tsx

```typescript
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import Saga from '@app/client/saga';
import rootSlice from './RootSlice';
import { Env } from '@app/Env';


const sagaMiddleware = createSagaMiddleware();

const shouldLoadDevTools = !Env.isProduction();

if(shouldLoadDevTools)
    console.log('Will load devtools');

const store = configureStore({
    devTools   : shouldLoadDevTools,
    reducer    : rootSlice.reducer,
    middleware : gDM => gDM({}).concat(sagaMiddleware),
});

sagaMiddleware.run(Saga);


export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line import/no-default-export
export default store;// as ToolkitStore<CoreAppRoot>;

```

## /Users/bort/code/crude-cards/src/constant/UI.tsx

```typescript
export const UI = {

    Navbar : {
        Width : 200,
    },
    Header : {
        Height : 120,
    },
    PathwayBuilderTitle : 'Patent Template',
} as const;

// export default UI;

```

## /Users/bort/code/crude-cards/src/constant/framework/BrowserWindowLocationOrigin.tsx

```typescript
import { Env } from '@app/Env';


export const BrowserWindowLocationOrigin = Env.getValue('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');

```

## /Users/bort/code/crude-cards/src/constant/framework/ColorTheme.tsx

```typescript
export enum ColorTheme {
    Light = 'light',
    Dark  = 'dark',
}

```

## /Users/bort/code/crude-cards/src/constant/framework/CoreAction.tsx

```typescript
import { type PayloadAction } from '@reduxjs/toolkit';


export type CoreAction<T = unknown> = PayloadAction<T>;

export type CA = CoreAction;

```

## /Users/bort/code/crude-cards/src/constant/framework/InitialState.tsx

```typescript
import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { CoreAppRoot } from '@app/type/framework/core/CoreAppRoot';

const {
    player_list : _player_list,
    ...gameState
} = GameStateDTO.Default;


export const InitialState : CoreAppRoot = {

    // todo: Have different apps init different stores, this is dumb
    game : {
        previousHandDealerCardId : null,
        previousHandWinnerCardId : null,

        popupType : null,

        playerLookup : {},
        cardDeck     : {},

        timer : {
            timerType : null,
            timeLeft  : 0,
        },

        gameState,
    },
} as const;


```

## /Users/bort/code/crude-cards/src/constant/framework/MakeConstant.tsx

```typescript
import { Namespace } from './Namespace';


export const localConstant = (namespace = Namespace) =>
    (name : string) => `${namespace}/${name}` as const;

```

## /Users/bort/code/crude-cards/src/constant/framework/Namespace.tsx

```typescript

export const Namespace = 'Game';

```

## /Users/bort/code/crude-cards/src/constant/framework/Orientation.tsx

```typescript
export enum Orientation {
    Horizontal = 'horizontal',
    Vertical   = 'vertical',
}

```

## /Users/bort/code/crude-cards/src/constant/framework/ProjectName.tsx

```typescript
import { Namespace } from './Namespace';


export const ProjectName = Namespace;

```

## /Users/bort/code/crude-cards/src/constant/framework/Pusher.tsx

```typescript
export const PusherServerAction = 'PusherServerAction';
export const PusherChannel      = 'PusherChannel';

```

## /Users/bort/code/crude-cards/src/constant/framework/ScreenSize.tsx

```typescript
export enum ScreenSize {
    Desktop = 'Desktop',
    Tablet  = 'Tablet',
    Phone   = 'Phone',
}

```

## /Users/bort/code/crude-cards/src/constant/framework/SpecialId.tsx

```typescript
import { nanoid } from '@reduxjs/toolkit';


export const SpecialId = {
    InvalidString : 'special-invalid',
    PlaceholderId : 'special-placeholder',
    EmptyString   : '',
    RandomHash    : (prefix = '[rand]-') : string => `${prefix}${nanoid()}`,
    DefaultJob    : 'default-job',
    CreateHash    : 'create-hash',
    InvalidId     : Number.NEGATIVE_INFINITY,
    DefaultId     : Number.NEGATIVE_INFINITY,
    Unknown       : 'Unknown',
    Null          : 'special-null',
} as const;

```

## /Users/bort/code/crude-cards/src/constant/labels.tsx

```typescript
export const UnknownFileType = 'Unknown File Type';

```

## /Users/bort/code/crude-cards/src/constant/route/RouteHref.tsx

```typescript
export enum RouteHref {
    Blog = 'https://blog.construct.works',
}



```

## /Users/bort/code/crude-cards/src/middleware.tsx

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(_request : NextRequest) {
  return NextResponse.next()
}


export const config = {
    matcher : [
        '/((?!.*\\..*|_next).*)',
        '/(api|trpc)(.*)',
        '/',
    ],
};

```

## /Users/bort/code/crude-cards/src/pages/500.tsx

```typescript
import ErrorImage from '@app/asset/image/500.png'
import { Card, Center } from '@mantine/core';
import Image from 'next/image';

// eslint-disable-next-line import/no-default-export
export default function Page500() : React.JSX.Element {
    return (
        <>
            <title>{'500 Internal Server Error'}</title>
            <Center h='100dvh'>
                <Card>
                    <Image
                        src={ErrorImage.src}
                        alt='Minor Catastrophe'
                        height={300}
                        width={300} />

                    <h1 style={{textAlign : 'center'}}>{'500 Internal Server Error'}</h1>
                    {'Oops! Something went wrong on our end. We are working to fix this issue. Please try again later.'}
                </Card>
            </Center>
        </>
    );
}

```

## /Users/bort/code/crude-cards/src/pages/AppContent/AppHeadGame.tsx

```typescript
/* eslint-disable no-useless-escape */

import { RFC } from '@app/ui/type';


/* eslint-disable max-len */

export const AppHeadGame : RFC = () =>
    <>
        <meta charSet='UTF-8' />
        <meta
            httpEquiv='X-UA-Compatible'
            content='IE=edge' />
        <meta
            content='width=device-width, initial-scale=1.0'
            name='viewport' />
        <title>
            {'CrudeCards'}
        </title>

        <script type='text/javascript'>{`
            ;window.NREUM||(NREUM={});NREUM.init={distributed_tracing:{enabled:true},privacy:{cookies_enabled:true},ajax:{deny_list:["bam.nr-data.net"]}};

            ;NREUM.loader_config={accountID:"3845356",trustKey:"3845356",agentID:"1120329542",licenseKey:"NRJS-e4478536838fe93e8d1",applicationID:"1120329542"};
            ;NREUM.info={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",licenseKey:"NRJS-e4478536838fe93e8d1",applicationID:"1120329542",sa:1};
            ;/*! For license information please see nr-loader-spa-1.264.0.min.js.LICENSE.txt */
            (()=>{var e,t,r={2983:(e,t,r)=>{"use strict";r.d(t,{D0:()=>v,gD:()=>y,Vp:()=>s,oC:()=>x,fr:()=>_,jD:()=>P,hR:()=>A,xN:()=>b,x1:()=>c,aN:()=>T,V:()=>j});var n=r(384),i=r(7864);const o={beacon:n.NT.beacon,errorBeacon:n.NT.errorBeacon,licenseKey:void 0,applicationID:void 0,sa:void 0,queueTime:void 0,applicationTime:void 0,ttGuid:void 0,user:void 0,account:void 0,product:void 0,extra:void 0,jsAttributes:{},userAttributes:void 0,atts:void 0,transactionName:void 0,tNamePlain:void 0},a={};function s(e){if(!e)throw new Error("All info objects require an agent identifier!");if(!a[e])throw new Error("Info for ".concat(e," was never set"));return a[e]}function c(e,t){if(!e)throw new Error("All info objects require an agent identifier!");a[e]=(0,i.a)(t,o);const r=(0,n.nY)(e);r&&(r.info=a[e])}var u=r(993);const d=e=>{if(!e||"string"!=typeof e)return!1;try{document.createDocumentFragment().querySelector(e)}catch{return!1}return!0};var l=r(2614),f=r(944);const h="[data-nr-mask]",g=()=>{const e={mask_selector:"*",block_selector:"[data-nr-block]",mask_input_options:{color:!1,date:!1,"datetime-local":!1,email:!1,month:!1,number:!1,range:!1,search:!1,tel:!1,text:!1,time:!1,url:!1,week:!1,textarea:!1,select:!1,password:!0}};return{ajax:{deny_list:void 0,block_internal:!0,enabled:!0,harvestTimeSeconds:10,autoStart:!0},distributed_tracing:{enabled:void 0,exclude_newrelic_header:void 0,cors_use_newrelic_header:void 0,cors_use_tracecontext_headers:void 0,allowed_origins:void 0},feature_flags:[],generic_events:{enabled:!0,harvestTimeSeconds:30,autoStart:!0},harvest:{tooManyRequestsDelay:60},jserrors:{enabled:!0,harvestTimeSeconds:10,autoStart:!0},logging:{enabled:!0,harvestTimeSeconds:10,autoStart:!0,level:u.p_.INFO},metrics:{enabled:!0,autoStart:!0},obfuscate:void 0,page_action:{enabled:!0},page_view_event:{enabled:!0,autoStart:!0},page_view_timing:{enabled:!0,harvestTimeSeconds:30,long_task:!1,autoStart:!0},privacy:{cookies_enabled:!0},proxy:{assets:void 0,beacon:void 0},session:{expiresMs:l.wk,inactiveMs:l.BB},session_replay:{autoStart:!0,enabled:!1,harvestTimeSeconds:60,preload:!1,sampling_rate:10,error_sampling_rate:100,collect_fonts:!1,inline_images:!1,inline_stylesheet:!0,fix_stylesheets:!0,mask_all_inputs:!0,get mask_text_selector(){return e.mask_selector},set mask_text_selector(t){d(t)?e.mask_selector="".concat(t,",").concat(h):""===t||null===t?e.mask_selector=h:(0,f.R)(5,t)},get block_class(){return"nr-block"},get ignore_class(){return"nr-ignore"},get mask_text_class(){return"nr-mask"},get block_selector(){return e.block_selector},set block_selector(t){d(t)?e.block_selector+=",".concat(t):""!==t&&(0,f.R)(6,t)},get mask_input_options(){return e.mask_input_options},set mask_input_options(t){t&&"object"==typeof t?e.mask_input_options={...t,password:!0}:(0,f.R)(7,t)}},session_trace:{enabled:!0,harvestTimeSeconds:10,autoStart:!0},soft_navigations:{enabled:!0,harvestTimeSeconds:10,autoStart:!0},spa:{enabled:!0,harvestTimeSeconds:10,autoStart:!0},ssl:void 0}},p={},m="All configuration objects require an agent identifier!";function v(e){if(!e)throw new Error(m);if(!p[e])throw new Error("Configuration for ".concat(e," was never set"));return p[e]}function b(e,t){if(!e)throw new Error(m);p[e]=(0,i.a)(t,g());const r=(0,n.nY)(e);r&&(r.init=p[e])}function y(e,t){if(!e)throw new Error(m);var r=v(e);if(r){for(var n=t.split("."),i=0;i<n.length-1;i++)if("object"!=typeof(r=r[n[i]]))return;r=r[n[n.length-1]]}return r}const w={accountID:void 0,trustKey:void 0,agentID:void 0,licenseKey:void 0,applicationID:void 0,xpid:void 0},R={};function x(e){if(!e)throw new Error("All loader-config objects require an agent identifier!");if(!R[e])throw new Error("LoaderConfig for ".concat(e," was never set"));return R[e]}function T(e,t){if(!e)throw new Error("All loader-config objects require an agent identifier!");R[e]=(0,i.a)(t,w);const r=(0,n.nY)(e);r&&(r.loader_config=R[e])}const A=(0,n.dV)().o;var E=r(6154),N=r(9324);const S={buildEnv:N.F3,distMethod:N.Xs,version:N.xv,originTime:E.WN},O={customTransaction:void 0,disabled:!1,isolatedBacklog:!1,loaderType:void 0,maxBytes:3e4,onerror:void 0,origin:""+E.gm.location,ptid:void 0,releaseIds:{},appMetadata:{},session:void 0,denyList:void 0,harvestCount:0,timeKeeper:void 0},I={};function _(e){if(!e)throw new Error("All runtime objects require an agent identifier!");if(!I[e])throw new Error("Runtime for ".concat(e," was never set"));return I[e]}function j(e,t){if(!e)throw new Error("All runtime objects require an agent identifier!");I[e]={...(0,i.a)(t,O),...S};const r=(0,n.nY)(e);r&&(r.runtime=I[e])}function P(e){return function(e){try{const t=s(e);return!!t.licenseKey&&!!t.errorBeacon&&!!t.applicationID}catch(e){return!1}}(e)}},7864:(e,t,r)=>{"use strict";r.d(t,{a:()=>i});var n=r(944);function i(e,t){try{if(!e||"object"!=typeof e)return(0,n.R)(3);if(!t||"object"!=typeof t)return(0,n.R)(4);const r=Object.create(Object.getPrototypeOf(t),Object.getOwnPropertyDescriptors(t)),o=0===Object.keys(r).length?e:r;for(let a in o)if(void 0!==e[a])try{if(null===e[a]){r[a]=null;continue}Array.isArray(e[a])&&Array.isArray(t[a])?r[a]=Array.from(new Set([...e[a],...t[a]])):"object"==typeof e[a]&&"object"==typeof t[a]?r[a]=i(e[a],t[a]):r[a]=e[a]}catch(e){(0,n.R)(1,e)}return r}catch(e){(0,n.R)(2,e)}}},9324:(e,t,r)=>{"use strict";r.d(t,{F3:()=>i,Xs:()=>o,Yq:()=>a,xv:()=>n});const n="1.264.0",i="PROD",o="CDN",a="2.0.0-alpha.12"},6154:(e,t,r)=>{"use strict";r.d(t,{A4:()=>s,OF:()=>d,RI:()=>i,Vr:()=>h,WN:()=>g,bv:()=>o,gm:()=>a,lR:()=>f,m:()=>u,mw:()=>c,sb:()=>l});var n=r(1863);const i="undefined"!=typeof window&&!!window.document,o="undefined"!=typeof WorkerGlobalScope&&("undefined"!=typeof self&&self instanceof WorkerGlobalScope&&self.navigator instanceof WorkerNavigator||"undefined"!=typeof globalThis&&globalThis instanceof WorkerGlobalScope&&globalThis.navigator instanceof WorkerNavigator),a=i?window:"undefined"!=typeof WorkerGlobalScope&&("undefined"!=typeof self&&self instanceof WorkerGlobalScope&&self||"undefined"!=typeof globalThis&&globalThis instanceof WorkerGlobalScope&&globalThis),s="complete"===a?.document?.readyState,c=Boolean("hidden"===a?.document?.visibilityState),u=""+a?.location,d=/iPad|iPhone|iPod/.test(a.navigator?.userAgent),l=d&&"undefined"==typeof SharedWorker,f=(()=>{const e=a.navigator?.userAgent?.match(/Firefox[/\s](\d+\.\d+)/);return Array.isArray(e)&&e.length>=2?+e[1]:0})(),h=!!a.navigator?.sendBeacon,g=Date.now()-(0,n.t)()},4777:(e,t,r)=>{"use strict";r.d(t,{J:()=>o});var n=r(944);const i={agentIdentifier:"",ee:void 0};class o{constructor(e){try{if("object"!=typeof e)return(0,n.R)(8);this.sharedContext={},Object.assign(this.sharedContext,i),Object.entries(e).forEach((e=>{let[t,r]=e;Object.keys(i).includes(t)&&(this.sharedContext[t]=r)}))}catch(e){(0,n.R)(9,e)}}}},7295:(e,t,r)=>{"use strict";r.d(t,{Xv:()=>a,gX:()=>i,iW:()=>o});var n=[];function i(e){if(!e||o(e))return!1;if(0===n.length)return!0;for(var t=0;t<n.length;t++){var r=n[t];if("*"===r.hostname)return!1;if(s(r.hostname,e.hostname)&&c(r.pathname,e.pathname))return!1}return!0}function o(e){return void 0===e.hostname}function a(e){if(n=[],e&&e.length)for(var t=0;t<e.length;t++){let r=e[t];if(!r)continue;0===r.indexOf("http://")?r=r.substring(7):0===r.indexOf("https://")&&(r=r.substring(8));const i=r.indexOf("/");let o,a;i>0?(o=r.substring(0,i),a=r.substring(i)):(o=r,a="");let[s]=o.split(":");n.push({hostname:s,pathname:a})}}function s(e,t){return!(e.length>t.length)&&t.indexOf(e)===t.length-e.length}function c(e,t){return 0===e.indexOf("/")&&(e=e.substring(1)),0===t.indexOf("/")&&(t=t.substring(1)),""===e||e===t}},1687:(e,t,r)=>{"use strict";r.d(t,{Ak:()=>s,Ze:()=>d,x3:()=>c});var n=r(7836),i=r(3606),o=r(860);const a={};function s(e,t){const r={staged:!1,priority:o.P[t]||0};u(e),a[e].get(t)||a[e].set(t,r)}function c(e,t){e&&a[e]&&(a[e].get(t)&&a[e].delete(t),f(e,t,!1),a[e].size&&l(e))}function u(e){if(!e)throw new Error("agentIdentifier required");a[e]||(a[e]=new Map)}function d(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"feature",r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(u(e),!e||!a[e].get(t)||r)return f(e,t);a[e].get(t).staged=!0,l(e)}function l(e){const t=Array.from(a[e]);t.every((e=>{let[t,r]=e;return r.staged}))&&(t.sort(((e,t)=>e[1].priority-t[1].priority)),t.forEach((t=>{let[r]=t;a[e].delete(r),f(e,r)})))}function f(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];const o=e?n.ee.get(e):n.ee,a=i.i.handlers;if(!o.aborted&&o.backlog&&a){if(r){const e=o.backlog[t],r=a[t];if(r){for(let t=0;e&&t<e.length;++t)h(e[t],r);Object.entries(r).forEach((e=>{let[t,r]=e;Object.values(r||{}).forEach((e=>{e[0].on(t,e[1])}))}))}}o.isolatedBacklog||delete a[t],o.backlog[t]=null,o.emit("drain-"+t,[])}}function h(e,t){var r=e[1];Object.values(t[r]||{}).forEach((t=>{var r=e[0];if(t[0]===r){var n=t[1],i=e[3],o=e[2];n.apply(i,o)}}))}},7836:(e,t,r)=>{"use strict";r.d(t,{P:()=>c,ee:()=>u});var n=r(384),i=r(8990),o=r(2983),a=r(2646),s=r(5607);const c="nr@context:".concat(s.W),u=function e(t,r){var n={},s={},d={},l=!1;try{l=16===r.length&&(0,o.fr)(r).isolatedBacklog}catch(e){}var f={on:g,addEventListener:g,removeEventListener:function(e,t){var r=n[e];if(!r)return;for(var i=0;i<r.length;i++)r[i]===t&&r.splice(i,1)},emit:function(e,r,n,i,o){!1!==o&&(o=!0);if(u.aborted&&!i)return;t&&o&&t.emit(e,r,n);for(var a=h(n),c=p(e),d=c.length,l=0;l<d;l++)c[l].apply(a,r);var g=v()[s[e]];g&&g.push([f,e,r,a]);return a},get:m,listeners:p,context:h,buffer:function(e,t){const r=v();if(t=t||"feature",f.aborted)return;Object.entries(e||{}).forEach((e=>{let[n,i]=e;s[i]=t,t in r||(r[t]=[])}))},abort:function(){f._aborted=!0,Object.keys(f.backlog).forEach((e=>{delete f.backlog[e]}))},isBuffering:function(e){return!!v()[s[e]]},debugId:r,backlog:l?{}:t&&"object"==typeof t.backlog?t.backlog:{},isolatedBacklog:l};return Object.defineProperty(f,"aborted",{get:()=>{let e=f._aborted||!1;return e||(t&&(e=t.aborted),e)}}),f;function h(e){return e&&e instanceof a.y?e:e?(0,i.I)(e,c,(()=>new a.y(c))):new a.y(c)}function g(e,t){n[e]=p(e).concat(t)}function p(e){return n[e]||[]}function m(t){return d[t]=d[t]||e(f,t)}function v(){return f.backlog}}(void 0,"globalEE"),d=(0,n.Zm)();d.ee||(d.ee=u)},2646:(e,t,r)=>{"use strict";r.d(t,{y:()=>n});class n{constructor(e){this.contextId=e}}},9908:(e,t,r)=>{"use strict";r.d(t,{d:()=>n,p:()=>i});var n=r(7836).ee.get("handle");function i(e,t,r,i,o){o?(o.buffer([e],i),o.emit(e,t,r)):(n.buffer([e],i),n.emit(e,t,r))}},3606:(e,t,r)=>{"use strict";r.d(t,{i:()=>o});var n=r(9908);o.on=a;var i=o.handlers={};function o(e,t,r,o){a(o||n.d,i,e,t,r)}function a(e,t,r,i,o){o||(o="feature"),e||(e=n.d);var a=t[o]=t[o]||{};(a[r]=a[r]||[]).push([e,i])}},3878:(e,t,r)=>{"use strict";r.d(t,{DD:()=>c,jT:()=>a,sp:()=>s});var n=r(6154);let i=!1,o=!1;try{const e={get passive(){return i=!0,!1},get signal(){return o=!0,!1}};n.gm.addEventListener("test",null,e),n.gm.removeEventListener("test",null,e)}catch(e){}function a(e,t){return i||o?{capture:!!e,passive:i,signal:t}:!!e}function s(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3?arguments[3]:void 0;window.addEventListener(e,t,a(r,n))}function c(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3?arguments[3]:void 0;document.addEventListener(e,t,a(r,n))}},5607:(e,t,r)=>{"use strict";r.d(t,{W:()=>n});const n=(0,r(9566).bz)()},9566:(e,t,r)=>{"use strict";r.d(t,{LA:()=>s,ZF:()=>c,bz:()=>a,el:()=>u});var n=r(6154);const i="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";function o(e,t){return e?15&e[t]:16*Math.random()|0}function a(){const e=n.gm?.crypto||n.gm?.msCrypto;let t,r=0;return e&&e.getRandomValues&&(t=e.getRandomValues(new Uint8Array(30))),i.split("").map((e=>"x"===e?o(t,r++).toString(16):"y"===e?(3&o()|8).toString(16):e)).join("")}function s(e){const t=n.gm?.crypto||n.gm?.msCrypto;let r,i=0;t&&t.getRandomValues&&(r=t.getRandomValues(new Uint8Array(e)));const a=[];for(var s=0;s<e;s++)a.push(o(r,i++).toString(16));return a.join("")}function c(){return s(16)}function u(){return s(32)}},2614:(e,t,r)=>{"use strict";r.d(t,{BB:()=>a,H3:()=>n,g:()=>u,iL:()=>c,tS:()=>s,uh:()=>i,wk:()=>o});const n="NRBA",i="SESSION",o=144e5,a=18e5,s={STARTED:"session-started",PAUSE:"session-pause",RESET:"session-reset",RESUME:"session-resume",UPDATE:"session-update"},c={SAME_TAB:"same-tab",CROSS_TAB:"cross-tab"},u={OFF:0,FULL:1,ERROR:2}},1863:(e,t,r)=>{"use strict";function n(){return Math.floor(performance.now())}r.d(t,{t:()=>n})},7485:(e,t,r)=>{"use strict";r.d(t,{D:()=>i});var n=r(6154);function i(e){if(0===(e||"").indexOf("data:"))return{protocol:"data"};try{const t=new URL(e,location.href),r={port:t.port,hostname:t.hostname,pathname:t.pathname,search:t.search,protocol:t.protocol.slice(0,t.protocol.indexOf(":")),sameOrigin:t.protocol===n.gm?.location?.protocol&&t.host===n.gm?.location?.host};return r.port&&""!==r.port||("http:"===t.protocol&&(r.port="80"),"https:"===t.protocol&&(r.port="443")),r.pathname&&""!==r.pathname?r.pathname.startsWith("/")||(r.pathname="/".concat(r.pathname)):r.pathname="/",r}catch(e){return{}}}},944:(e,t,r)=>{"use strict";function n(e,t){"function"==typeof console.debug&&console.debug("New Relic Warning: https://github.com/newrelic/newrelic-browser-agent/blob/main/docs/warning-codes.md#".concat(e),t)}r.d(t,{R:()=>n})},5284:(e,t,r)=>{"use strict";r.d(t,{t:()=>c,B:()=>s});var n=r(7836),i=r(6154);const o="newrelic";const a=new Set,s={};function c(e,t){const r=n.ee.get(t);s[t]??={},e&&"object"==typeof e&&(a.has(t)||(r.emit("rumresp",[e]),s[t]=e,a.add(t),function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};try{i.gm.dispatchEvent(new CustomEvent(o,{detail:e}))}catch(e){}}({loaded:!0})))}},8990:(e,t,r)=>{"use strict";r.d(t,{I:()=>i});var n=Object.prototype.hasOwnProperty;function i(e,t,r){if(n.call(e,t))return e[t];var i=r();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(e,t,{value:i,writable:!0,enumerable:!1}),i}catch(e){}return e[t]=i,i}},6389:(e,t,r)=>{"use strict";function n(e){var t=this;let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const i=n?.leading||!1;let o;return function(){for(var n=arguments.length,a=new Array(n),s=0;s<n;s++)a[s]=arguments[s];i&&void 0===o&&(e.apply(t,a),o=setTimeout((()=>{o=clearTimeout(o)}),r)),i||(clearTimeout(o),o=setTimeout((()=>{e.apply(t,a)}),r))}}function i(e){var t=this;let r=!1;return function(){if(!r){r=!0;for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];e.apply(t,i)}}}r.d(t,{J:()=>i,s:()=>n})},3304:(e,t,r)=>{"use strict";r.d(t,{A:()=>o});var n=r(7836);const i=()=>{const e=new WeakSet;return(t,r)=>{if("object"==typeof r&&null!==r){if(e.has(r))return;e.add(r)}return r}};function o(e){try{return JSON.stringify(e,i())}catch(e){try{n.ee.emit("internal-error",[e])}catch(e){}}}},5289:(e,t,r)=>{"use strict";r.d(t,{GG:()=>o,sB:()=>a});var n=r(3878);function i(){return"undefined"==typeof document||"complete"===document.readyState}function o(e,t){if(i())return e();(0,n.sp)("load",e,t)}function a(e){if(i())return e();(0,n.DD)("DOMContentLoaded",e)}},384:(e,t,r)=>{"use strict";r.d(t,{NT:()=>o,US:()=>d,Zm:()=>a,bQ:()=>c,dV:()=>s,nY:()=>u,pV:()=>l});var n=r(6154),i=r(1863);const o={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net"};function a(){return n.gm.NREUM||(n.gm.NREUM={}),void 0===n.gm.newrelic&&(n.gm.newrelic=n.gm.NREUM),n.gm.NREUM}function s(){let e=a();return e.o||(e.o={ST:n.gm.setTimeout,SI:n.gm.setImmediate,CT:n.gm.clearTimeout,XHR:n.gm.XMLHttpRequest,REQ:n.gm.Request,EV:n.gm.Event,PR:n.gm.Promise,MO:n.gm.MutationObserver,FETCH:n.gm.fetch}),e}function c(e,t){let r=a();r.initializedAgents??={},t.initializedAt={ms:(0,i.t)(),date:new Date},r.initializedAgents[e]=t}function u(e){let t=a();return t.initializedAgents?.[e]}function d(e,t){a()[e]=t}function l(){return function(){let e=a();const t=e.info||{};e.info={beacon:o.beacon,errorBeacon:o.errorBeacon,...t}}(),function(){let e=a();const t=e.init||{};e.init={...t}}(),s(),function(){let e=a();const t=e.loader_config||{};e.loader_config={...t}}(),a()}},2843:(e,t,r)=>{"use strict";r.d(t,{u:()=>i});var n=r(3878);function i(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0;(0,n.DD)("visibilitychange",(function(){if(t)return void("hidden"===document.visibilityState&&e());e(document.visibilityState)}),r,i)}},8941:(e,t,r)=>{"use strict";r.d(t,{um:()=>f,NZ:()=>R,vC:()=>A,Ri:()=>O,Ak:()=>_,o8:()=>P,MO:()=>U,bX:()=>F});var n=r(7836),i=r(3434),o=r(8990),a=r(6154);const s={},c=a.gm.XMLHttpRequest,u="addEventListener",d="removeEventListener",l="nr@wrapped:".concat(n.P);function f(e){var t=function(e){return(e||n.ee).get("events")}(e);if(s[t.debugId]++)return t;s[t.debugId]=1;var r=(0,i.YM)(t,!0);function f(e){r.inPlace(e,[u,d],"-",g)}function g(e,t){return e[1]}return"getPrototypeOf"in Object&&(a.RI&&h(document,f),h(a.gm,f),h(c.prototype,f)),t.on(u+"-start",(function(e,t){var n=e[1];if(null!==n&&("function"==typeof n||"object"==typeof n)){var i=(0,o.I)(n,l,(function(){var e={object:function(){if("function"!=typeof n.handleEvent)return;return n.handleEvent.apply(n,arguments)},function:n}[typeof n];return e?r(e,"fn-",null,e.name||"anonymous"):n}));this.wrapped=e[1]=i}})),t.on(d+"-start",(function(e){e[1]=this.wrapped||e[1]})),t}function h(e,t){let r=e;for(;"object"==typeof r&&!Object.prototype.hasOwnProperty.call(r,u);)r=Object.getPrototypeOf(r);for(var n=arguments.length,i=new Array(n>2?n-2:0),o=2;o<n;o++)i[o-2]=arguments[o];r&&t(r,...i)}var g="fetch-",p=g+"body-",m=["arrayBuffer","blob","json","text","formData"],v=a.gm.Request,b=a.gm.Response,y="prototype";const w={};function R(e){const t=function(e){return(e||n.ee).get("fetch")}(e);if(!(v&&b&&a.gm.fetch))return t;if(w[t.debugId]++)return t;function r(e,r,i){var o=e[r];"function"==typeof o&&(e[r]=function(){var e,r=[...arguments],a={};t.emit(i+"before-start",[r],a),a[n.P]&&a[n.P].dt&&(e=a[n.P].dt);var s=o.apply(this,r);return t.emit(i+"start",[r,e],s),s.then((function(e){return t.emit(i+"end",[null,e],s),e}),(function(e){throw t.emit(i+"end",[e],s),e}))})}return w[t.debugId]=1,m.forEach((e=>{r(v[y],e,p),r(b[y],e,p)})),r(a.gm,"fetch",g),t.on(g+"end",(function(e,r){var n=this;if(r){var i=r.headers.get("content-length");null!==i&&(n.rxSize=i),t.emit(g+"done",[null,r],n)}else t.emit(g+"done",[e],n)})),t}const x={},T=["pushState","replaceState"];function A(e){const t=function(e){return(e||n.ee).get("history")}(e);return!a.RI||x[t.debugId]++||(x[t.debugId]=1,(0,i.YM)(t).inPlace(window.history,T,"-")),t}var E=r(3878);const N={},S=["appendChild","insertBefore","replaceChild"];function O(e){const t=function(e){return(e||n.ee).get("jsonp")}(e);if(!a.RI||N[t.debugId])return t;N[t.debugId]=!0;var r=(0,i.YM)(t),o=/[?&](?:callback|cb)=([^&#]+)/,s=/(.*)\.([^.]+)/,c=/^(\w+)(\.|$)(.*)$/;function u(e,t){if(!e)return t;const r=e.match(c),n=r[1];return u(r[3],t[n])}return r.inPlace(Node.prototype,S,"dom-"),t.on("dom-start",(function(e){!function(e){if(!e||"string"!=typeof e.nodeName||"script"!==e.nodeName.toLowerCase())return;if("function"!=typeof e.addEventListener)return;var n=(i=e.src,a=i.match(o),a?a[1]:null);var i,a;if(!n)return;var c=function(e){var t=e.match(s);if(t&&t.length>=3)return{key:t[2],parent:u(t[1],window)};return{key:e,parent:window}}(n);if("function"!=typeof c.parent[c.key])return;var d={};function l(){t.emit("jsonp-end",[],d),e.removeEventListener("load",l,(0,E.jT)(!1)),e.removeEventListener("error",f,(0,E.jT)(!1))}function f(){t.emit("jsonp-error",[],d),t.emit("jsonp-end",[],d),e.removeEventListener("load",l,(0,E.jT)(!1)),e.removeEventListener("error",f,(0,E.jT)(!1))}r.inPlace(c.parent,[c.key],"cb-",d),e.addEventListener("load",l,(0,E.jT)(!1)),e.addEventListener("error",f,(0,E.jT)(!1)),t.emit("new-jsonp",[e.src],d)}(e[0])})),t}const I={};function _(e){const t=function(e){return(e||n.ee).get("mutation")}(e);if(!a.RI||I[t.debugId])return t;I[t.debugId]=!0;var r=(0,i.YM)(t),o=a.gm.MutationObserver;return o&&(window.MutationObserver=function(e){return this instanceof o?new o(r(e,"fn-")):o.apply(this,arguments)},MutationObserver.prototype=o.prototype),t}const j={};function P(e){const t=function(e){return(e||n.ee).get("promise")}(e);if(j[t.debugId])return t;j[t.debugId]=!0;var r=t.context,o=(0,i.YM)(t),s=a.gm.Promise;return s&&function(){function e(r){var n=t.context(),i=o(r,"executor-",n,null,!1);const a=Reflect.construct(s,[i],e);return t.context(a).getCtx=function(){return n},a}a.gm.Promise=e,Object.defineProperty(e,"name",{value:"Promise"}),e.toString=function(){return s.toString()},Object.setPrototypeOf(e,s),["all","race"].forEach((function(r){const n=s[r];e[r]=function(e){let i=!1;[...e||[]].forEach((e=>{this.resolve(e).then(a("all"===r),a(!1))}));const o=n.apply(this,arguments);return o;function a(e){return function(){t.emit("propagate",[null,!i],o,!1,!1),i=i||!e}}}})),["resolve","reject"].forEach((function(r){const n=s[r];e[r]=function(e){const r=n.apply(this,arguments);return e!==r&&t.emit("propagate",[e,!0],r,!1,!1),r}})),e.prototype=s.prototype;const n=s.prototype.then;s.prototype.then=function(){var e=this,i=r(e);i.promise=e;for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];s[0]=o(s[0],"cb-",i,null,!1),s[1]=o(s[1],"cb-",i,null,!1);const u=n.apply(this,s);return i.nextPromise=u,t.emit("propagate",[e,!0],u,!1,!1),u},s.prototype.then[i.Jt]=n,t.on("executor-start",(function(e){e[0]=o(e[0],"resolve-",this,null,!1),e[1]=o(e[1],"resolve-",this,null,!1)})),t.on("executor-err",(function(e,t,r){e[1](r)})),t.on("cb-end",(function(e,r,n){t.emit("propagate",[n,!0],this.nextPromise,!1,!1)})),t.on("propagate",(function(e,r,n){this.getCtx&&!r||(this.getCtx=function(){if(e instanceof Promise)var r=t.context(e);return r&&r.getCtx?r.getCtx():this})}))}(),t}const C={},k="setTimeout",L="setInterval",D="clearTimeout",H="-start",M="-",K=[k,"setImmediate",L,D,"clearImmediate"];function U(e){const t=function(e){return(e||n.ee).get("timer")}(e);if(C[t.debugId]++)return t;C[t.debugId]=1;var r=(0,i.YM)(t);return r.inPlace(a.gm,K.slice(0,2),k+M),r.inPlace(a.gm,K.slice(2,3),L+M),r.inPlace(a.gm,K.slice(3),D+M),t.on(L+H,(function(e,t,n){e[0]=r(e[0],"fn-",null,n)})),t.on(k+H,(function(e,t,n){this.method=n,this.timerDuration=isNaN(e[1])?0:+e[1],e[0]=r(e[0],"fn-",this,n)})),t}var G=r(944);const B={},V=["open","send"];function F(e){var t=e||n.ee;const r=function(e){return(e||n.ee).get("xhr")}(t);if(B[r.debugId]++)return r;B[r.debugId]=1,f(t);var o=(0,i.YM)(r),s=a.gm.XMLHttpRequest,c=a.gm.MutationObserver,u=a.gm.Promise,d=a.gm.setInterval,l="readystatechange",h=["onload","onerror","onabort","onloadstart","onloadend","onprogress","ontimeout"],g=[],p=a.gm.XMLHttpRequest=function(e){const t=new s(e),n=r.context(t);try{r.emit("new-xhr",[t],n),t.addEventListener(l,(i=n,function(){var e=this;e.readyState>3&&!i.resolved&&(i.resolved=!0,r.emit("xhr-resolved",[],e)),o.inPlace(e,h,"fn-",R)}),(0,E.jT)(!1))}catch(e){(0,G.R)(15,e);try{r.emit("internal-error",[e])}catch(e){}}var i;return t};function m(e,t){o.inPlace(t,["onreadystatechange"],"fn-",R)}if(function(e,t){for(var r in e)t[r]=e[r]}(s,p),p.prototype=s.prototype,o.inPlace(p.prototype,V,"-xhr-",R),r.on("send-xhr-start",(function(e,t){m(e,t),function(e){g.push(e),c&&(v?v.then(w):d?d(w):(b=-b,y.data=b))}(t)})),r.on("open-xhr-start",m),c){var v=u&&u.resolve();if(!d&&!u){var b=1,y=document.createTextNode(b);new c(w).observe(y,{characterData:!0})}}else t.on("fn-end",(function(e){e[0]&&e[0].type===l||w()}));function w(){for(var e=0;e<g.length;e++)m(0,g[e]);g.length&&(g=[])}function R(e,t){return t}return r}},3434:(e,t,r)=>{"use strict";r.d(t,{Jt:()=>o,YM:()=>c});var n=r(7836),i=r(5607);const o="nr@original:".concat(i.W);var a=Object.prototype.hasOwnProperty,s=!1;function c(e,t){return e||(e=n.ee),r.inPlace=function(e,t,n,i,o){n||(n="");const a="-"===n.charAt(0);for(let s=0;s<t.length;s++){const c=t[s],u=e[c];d(u)||(e[c]=r(u,a?c+n:n,i,c,o))}},r.flag=o,r;function r(t,r,n,s,c){return d(t)?t:(r||(r=""),nrWrapper[o]=t,function(e,t,r){if(Object.defineProperty&&Object.keys)try{return Object.keys(e).forEach((function(r){Object.defineProperty(t,r,{get:function(){return e[r]},set:function(t){return e[r]=t,t}})})),t}catch(e){u([e],r)}for(var n in e)a.call(e,n)&&(t[n]=e[n])}(t,nrWrapper,e),nrWrapper);function nrWrapper(){var o,a,d,l;try{a=this,o=[...arguments],d="function"==typeof n?n(o,a):n||{}}catch(t){u([t,"",[o,a,s],d],e)}i(r+"start",[o,a,s],d,c);try{return l=t.apply(a,o)}catch(e){throw i(r+"err",[o,a,e],d,c),e}finally{i(r+"end",[o,a,l],d,c)}}}function i(r,n,i,o){if(!s||t){var a=s;s=!0;try{e.emit(r,n,i,t,o)}catch(t){u([t,r,n,i],e)}s=a}}}function u(e,t){t||(t=n.ee);try{t.emit("internal-error",e)}catch(e){}}function d(e){return!(e&&"function"==typeof e&&e.apply&&!e[o])}},9300:(e,t,r)=>{"use strict";r.d(t,{T:()=>n});const n=r(860).K.ajax},3333:(e,t,r)=>{"use strict";r.d(t,{T:()=>n});const n=r(860).K.genericEvents},6774:(e,t,r)=>{"use strict";r.d(t,{T:()=>n});const n=r(860).K.jserrors},993:(e,t,r)=>{"use strict";r.d(t,{ET:()=>o,It:()=>s,TZ:()=>a,p_:()=>i});var n=r(860);const i={ERROR:"ERROR",WARN:"WARN",INFO:"INFO",DEBUG:"DEBUG",TRACE:"TRACE"},o="log",a=n.K.logging,s=1e6},3785:(e,t,r)=>{"use strict";r.d(t,{R:()=>c,b:()=>u});var n=r(9908),i=r(1863),o=r(860),a=r(3969),s=r(993);function c(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:s.p_.INFO;(0,n.p)(a.xV,["API/logging/".concat(c.toLowerCase(),"/called")],void 0,o.K.metrics,e),(0,n.p)(s.ET,[(0,i.t)(),t,r,c],void 0,o.K.logging,e)}function u(e){return"string"==typeof e&&Object.values(s.p_).some((t=>t===e))}},3969:(e,t,r)=>{"use strict";r.d(t,{TZ:()=>n,XG:()=>s,rs:()=>i,xV:()=>a,z_:()=>o});const n=r(860).K.metrics,i="sm",o="cm",a="storeSupportabilityMetrics",s="storeEventMetrics"},6630:(e,t,r)=>{"use strict";r.d(t,{T:()=>n});const n=r(860).K.pageViewEvent},782:(e,t,r)=>{"use strict";r.d(t,{T:()=>n});const n=r(860).K.pageViewTiming},6344:(e,t,r)=>{"use strict";r.d(t,{BB:()=>f,G4:()=>o,It:()=>c,No:()=>u,Qb:()=>h,TZ:()=>i,Ug:()=>a,_s:()=>s,bc:()=>l,yP:()=>d});var n=r(2614);const i=r(860).K.sessionReplay,o={RECORD:"recordReplay",PAUSE:"pauseReplay",REPLAY_RUNNING:"replayRunning",ERROR_DURING_REPLAY:"errorDuringReplay"},a=.12,s={DomContentLoaded:0,Load:1,FullSnapshot:2,IncrementalSnapshot:3,Meta:4,Custom:5},c=1e6,u=64e3,d={[n.g.ERROR]:15e3,[n.g.FULL]:3e5,[n.g.OFF]:0},l={RESET:{message:"Session was reset",sm:"Reset"},IMPORT:{message:"Recorder failed to import",sm:"Import"},TOO_MANY:{message:"429: Too Many Requests",sm:"Too-Many"},TOO_BIG:{message:"Payload was too large",sm:"Too-Big"},CROSS_TAB:{message:"Session Entity was set to OFF on another tab",sm:"Cross-Tab"},ENTITLEMENTS:{message:"Session Replay is not allowed and will not be started",sm:"Entitlement"}},f=5e3,h={API:"api"}},5270:(e,t,r)=>{"use strict";r.d(t,{Aw:()=>s,CT:()=>c,SR:()=>a});var n=r(2983),i=r(7767),o=r(6154);function a(e){return!!n.hR.MO&&(0,i.V)(e)&&!0===(0,n.gD)(e,"session_trace.enabled")}function s(e){return!0===(0,n.gD)(e,"session_replay.preload")&&a(e)}function c(e,t){const r=t.correctAbsoluteTimestamp(e);return{originalTimestamp:e,correctedTimestamp:r,timestampDiff:e-r,originTime:o.WN,correctedOriginTime:t.correctedOriginTime,originTimeDiff:Math.floor(o.WN-t.correctedOriginTime)}}},3738:(e,t,r)=>{"use strict";r.d(t,{He:()=>i,Kp:()=>s,Lc:()=>u,Rz:()=>d,TZ:()=>n,bD:()=>o,d3:()=>a,jx:()=>l,uP:()=>c});const n=r(860).K.sessionTrace,i="bstResource",o="resource",a="-start",s="-end",c="fn"+a,u="fn"+s,d="pushState",l=1e3},3962:(e,t,r)=>{"use strict";r.d(t,{AM:()=>o,O2:()=>s,Qu:()=>c,TZ:()=>a,ih:()=>u,tC:()=>i});var n=r(860);const i=["click","keydown","submit"],o="api",a=n.K.softNav,s={INITIAL_PAGE_LOAD:"",ROUTE_CHANGE:1,UNSPECIFIED:2},c={INTERACTION:1,AJAX:2,CUSTOM_END:3,CUSTOM_TRACER:4},u={IP:"in progress",FIN:"finished",CAN:"cancelled"}},7378:(e,t,r)=>{"use strict";r.d(t,{$p:()=>x,BR:()=>b,Kp:()=>R,L3:()=>y,Lc:()=>c,NC:()=>o,SG:()=>d,TZ:()=>i,U6:()=>g,UT:()=>m,d3:()=>w,dT:()=>f,e5:()=>A,gx:()=>v,l9:()=>l,oW:()=>h,op:()=>p,rw:()=>u,tH:()=>E,uP:()=>s,wW:()=>T,xq:()=>a});var n=r(2983);const i=r(860).K.spa,o=["click","submit","keypress","keydown","keyup","change"],a=999,s="fn-start",c="fn-end",u="cb-start",d="api-ixn-",l="remaining",f="interaction",h="spaNode",g="jsonpNode",p="fetch-start",m="fetch-done",v="fetch-body-",b="jsonp-end",y=n.hR.ST,w="-start",R="-end",x="-body",T="cb"+R,A="jsTime",E="fetch"},4234:(e,t,r)=>{"use strict";r.d(t,{W:()=>i});var n=r(7836);class i{constructor(e,t,r){this.agentIdentifier=e,this.aggregator=t,this.ee=n.ee.get(e),this.featureName=r,this.blocked=!1}}},7767:(e,t,r)=>{"use strict";r.d(t,{V:()=>o});var n=r(2983),i=r(6154);const o=e=>i.RI&&!0===(0,n.gD)(e,"privacy.cookies_enabled")},425:(e,t,r)=>{"use strict";r.d(t,{j:()=>O});var n=r(860),i=r(2983),o=r(9908),a=r(7836),s=r(1687),c=r(5289),u=r(6154),d=r(944),l=r(3969),f=r(384),h=r(6344);const g=["setErrorHandler","finished","addToTrace","addRelease","addPageAction","setCurrentRouteName","setPageViewName","setCustomAttribute","interaction","noticeError","setUserId","setApplicationVersion","start",h.G4.RECORD,h.G4.PAUSE,"log","wrapLogger"],p=["setErrorHandler","finished","addToTrace","addRelease"];var m=r(1863),v=r(2614),b=r(993),y=r(3785),w=r(2646),R=r(3434);function x(e,t,r,n){if("object"!=typeof t||!t||"string"!=typeof r||!r||"function"!=typeof t[r])return(0,d.R)(29);const i=function(e){return(e||a.ee).get("logger")}(e),o=(0,R.YM)(i),s=new w.y(a.P);return s.level=n.level,s.customAttributes=n.customAttributes,o.inPlace(t,[r],"wrap-logger-",s),i}function T(){const e=(0,f.pV)();g.forEach((t=>{e[t]=function(){for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];let o=[];return Object.values(e.initializedAgents).forEach((e=>{e&&e.api?e.exposed&&e.api[t]&&o.push(e.api[t](...n)):(0,d.R)(38,t)})),o.length>1?o:o[0]}(t,...n)}}))}const A={};var E=r(5284);const N=e=>{const t=e.startsWith("http");e+="/",r.p=t?e:"https://"+e};let S=!1;function O(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},g=arguments.length>2?arguments[2]:void 0,w=arguments.length>3?arguments[3]:void 0,{init:R,info:O,loader_config:I,runtime:_={},exposed:j=!0}=t;_.loaderType=g;const P=(0,f.pV)();O||(R=P.init,O=P.info,I=P.loader_config),(0,i.xN)(e.agentIdentifier,R||{}),(0,i.aN)(e.agentIdentifier,I||{}),O.jsAttributes??={},u.bv&&(O.jsAttributes.isWorker=!0),(0,i.x1)(e.agentIdentifier,O);const C=(0,i.D0)(e.agentIdentifier),k=[O.beacon,O.errorBeacon];S||(C.proxy.assets&&(N(C.proxy.assets),k.push(C.proxy.assets)),C.proxy.beacon&&k.push(C.proxy.beacon),T(),(0,f.US)("activatedFeatures",E.B),e.runSoftNavOverSpa&&=!0===C.soft_navigations.enabled&&C.feature_flags.includes("soft_nav")),_.denyList=[...C.ajax.deny_list||[],...C.ajax.block_internal?k:[]],_.ptid=e.agentIdentifier,(0,i.V)(e.agentIdentifier,_),e.ee=a.ee.get(e.agentIdentifier),void 0===e.api&&(e.api=function(e,t){let f=arguments.length>2&&void 0!==arguments[2]&&arguments[2];t||(0,s.Ak)(e,"api");const g={};var w=a.ee.get(e),R=w.get("tracer");A[e]=v.g.OFF,w.on(h.G4.REPLAY_RUNNING,(t=>{A[e]=t}));var T="api-",E=T+"ixn-";function N(t,r,n,o){const a=(0,i.Vp)(e);return null===r?delete a.jsAttributes[t]:(0,i.x1)(e,{...a,jsAttributes:{...a.jsAttributes,[t]:r}}),I(T,n,!0,o||null===r?"session":void 0)(t,r)}function S(){}g.log=function(e){let{customAttributes:t={},level:r=b.p_.INFO}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(0,o.p)(l.xV,["API/log/called"],void 0,n.K.metrics,w),(0,y.R)(w,e,t,r)},g.wrapLogger=function(e,t){let{customAttributes:r={},level:i=b.p_.INFO}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};(0,o.p)(l.xV,["API/wrapLogger/called"],void 0,n.K.metrics,w),x(w,e,t,{customAttributes:r,level:i})},p.forEach((e=>{g[e]=I(T,e,!0,"api")})),g.addPageAction=I(T,"addPageAction",!0,n.K.genericEvents),g.setPageViewName=function(t,r){if("string"==typeof t)return"/"!==t.charAt(0)&&(t="/"+t),(0,i.fr)(e).customTransaction=(r||"http://custom.transaction")+t,I(T,"setPageViewName",!0)()},g.setCustomAttribute=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if("string"==typeof e){if(["string","number","boolean"].includes(typeof t)||null===t)return N(e,t,"setCustomAttribute",r);(0,d.R)(40,typeof t)}else(0,d.R)(39,typeof e)},g.setUserId=function(e){if("string"==typeof e||null===e)return N("enduser.id",e,"setUserId",!0);(0,d.R)(41,typeof e)},g.setApplicationVersion=function(e){if("string"==typeof e||null===e)return N("application.version",e,"setApplicationVersion",!1);(0,d.R)(42,typeof e)},g.start=()=>{try{(0,o.p)(l.xV,["API/start/called"],void 0,n.K.metrics,w),w.emit("manual-start-all")}catch(e){(0,d.R)(23,e)}},g[h.G4.RECORD]=function(){(0,o.p)(l.xV,["API/recordReplay/called"],void 0,n.K.metrics,w),(0,o.p)(h.G4.RECORD,[],void 0,n.K.sessionReplay,w)},g[h.G4.PAUSE]=function(){(0,o.p)(l.xV,["API/pauseReplay/called"],void 0,n.K.metrics,w),(0,o.p)(h.G4.PAUSE,[],void 0,n.K.sessionReplay,w)},g.interaction=function(e){return(new S).get("object"==typeof e?e:{})};const O=S.prototype={createTracer:function(e,t){var r={},i=this,a="function"==typeof t;return(0,o.p)(l.xV,["API/createTracer/called"],void 0,n.K.metrics,w),f||(0,o.p)(E+"tracer",[(0,m.t)(),e,r],i,n.K.spa,w),function(){if(R.emit((a?"":"no-")+"fn-start",[(0,m.t)(),i,a],r),a)try{return t.apply(this,arguments)}catch(e){const t="string"==typeof e?new Error(e):e;throw R.emit("fn-err",[arguments,this,t],r),t}finally{R.emit("fn-end",[(0,m.t)()],r)}}}};function I(e,t,r,i){return function(){return(0,o.p)(l.xV,["API/"+t+"/called"],void 0,n.K.metrics,w),i&&(0,o.p)(e+t,[(0,m.t)(),...arguments],r?null:this,i,w),r?void 0:this}}function _(){r.e(478).then(r.bind(r,8778)).then((t=>{let{setAPI:r}=t;r(e),(0,s.Ze)(e,"api")})).catch((e=>{(0,d.R)(27,e),w.abort()}))}return["actionText","setName","setAttribute","save","ignore","onEnd","getContext","end","get"].forEach((e=>{O[e]=I(E,e,void 0,f?n.K.softNav:n.K.spa)})),g.setCurrentRouteName=f?I(E,"routeName",void 0,n.K.softNav):I(T,"routeName",!0,n.K.spa),g.noticeError=function(t,r){"string"==typeof t&&(t=new Error(t)),(0,o.p)(l.xV,["API/noticeError/called"],void 0,n.K.metrics,w),(0,o.p)("err",[t,(0,m.t)(),!1,r,!!A[e]],void 0,n.K.jserrors,w)},u.RI?(0,c.GG)((()=>_()),!0):_(),g}(e.agentIdentifier,w,e.runSoftNavOverSpa)),void 0===e.exposed&&(e.exposed=j),S=!0}},8374:(e,t,r)=>{r.nc=(()=>{try{return document?.currentScript?.nonce}catch(e){}return""})()},860:(e,t,r)=>{"use strict";r.d(t,{K:()=>n,P:()=>i});const n={ajax:"ajax",genericEvents:"generic_events",jserrors:"jserrors",logging:"logging",metrics:"metrics",pageAction:"page_action",pageViewEvent:"page_view_event",pageViewTiming:"page_view_timing",sessionReplay:"session_replay",sessionTrace:"session_trace",softNav:"soft_navigations",spa:"spa"},i={[n.pageViewEvent]:1,[n.pageViewTiming]:2,[n.metrics]:3,[n.jserrors]:4,[n.spa]:5,[n.ajax]:6,[n.sessionTrace]:7,[n.softNav]:8,[n.sessionReplay]:9,[n.logging]:10,[n.genericEvents]:11}}},n={};function i(e){var t=n[e];if(void 0!==t)return t.exports;var o=n[e]={exports:{}};return r[e](o,o.exports,i),o.exports}i.m=r,i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,r)=>(i.f[r](e,t),t)),[])),i.u=e=>({212:"nr-spa-compressor",249:"nr-spa-recorder",478:"nr-spa"}[e]+"-1.264.0.min.js"),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="NRBA-1.264.0.PROD:",i.l=(r,n,o,a)=>{if(e[r])e[r].push(n);else{var s,c;if(void 0!==o)for(var u=document.getElementsByTagName("script"),d=0;d<u.length;d++){var l=u[d];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==t+o){s=l;break}}if(!s){c=!0;var f={478:"sha512-McVw1bGHjjUf5GGS4WenO1eJQ8s7UloN07RDcN8bH9X1iGHTAJZ38fRFPC9DW3pFKJ2uKysBuvqehJYvHcIthg==",249:"sha512-QYiFK3L0u5EMr5V3YITSZcfvK9upxp9dvxRVLY9qis5pUIvOkKb5SKvPYPNw7sEKXP8TzyY2DLpLmqHxWCZ2cg==",212:"sha512-pdn6WS9R03kXhRA2vQoZgApGomYEaTBtHJfyGcBu9pt7MUR6schZTqs6BcrSDNoPhpJO6N5kUTMqB2WknZMDIA=="};(s=document.createElement("script")).charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.setAttribute("data-webpack",t+o),s.src=r,0!==s.src.indexOf(window.location.origin+"/")&&(s.crossOrigin="anonymous"),f[a]&&(s.integrity=f[a])}e[r]=[n];var h=(t,n)=>{s.onerror=s.onload=null,clearTimeout(g);var i=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((e=>e(n))),t)return t(n)},g=setTimeout(h.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=h.bind(null,s.onerror),s.onload=h.bind(null,s.onload),c&&document.head.appendChild(s)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="https://js-agent.newrelic.com/",(()=>{var e={38:0,788:0};i.f.j=(t,r)=>{var n=i.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var o=new Promise(((r,i)=>n=e[t]=[r,i]));r.push(n[2]=o);var a=i.p+i.u(t),s=new Error;i.l(a,(r=>{if(i.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+a+")",s.name="ChunkLoadError",s.type=o,s.request=a,n[1](s)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,o,[a,s,c]=r,u=0;if(a.some((t=>0!==e[t]))){for(n in s)i.o(s,n)&&(i.m[n]=s[n]);if(c)c(i)}for(t&&t(r);u<a.length;u++)o=a[u],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0},r=self["webpackChunk:NRBA-1.264.0.PROD"]=self["webpackChunk:NRBA-1.264.0.PROD"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),(()=>{"use strict";i(8374);var e=i(944),t=i(6344),r=i(9566);class n{agentIdentifier;constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.LA)(16);this.agentIdentifier=e}#e(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];if("function"==typeof this.api?.[t])return this.api[t](...n);(0,e.R)(35,t)}addPageAction(e,t){return this.#e("addPageAction",e,t)}setPageViewName(e,t){return this.#e("setPageViewName",e,t)}setCustomAttribute(e,t,r){return this.#e("setCustomAttribute",e,t,r)}noticeError(e,t){return this.#e("noticeError",e,t)}setUserId(e){return this.#e("setUserId",e)}setApplicationVersion(e){return this.#e("setApplicationVersion",e)}setErrorHandler(e){return this.#e("setErrorHandler",e)}finished(e){return this.#e("finished",e)}addRelease(e,t){return this.#e("addRelease",e,t)}start(e){return this.#e("start",e)}recordReplay(){return this.#e(t.G4.RECORD)}pauseReplay(){return this.#e(t.G4.PAUSE)}addToTrace(e){return this.#e("addToTrace",e)}setCurrentRouteName(e){return this.#e("setCurrentRouteName",e)}interaction(){return this.#e("interaction")}log(e,t){return this.#e("logInfo",e,t)}wrapLogger(e,t,r){return this.#e("wrapLogger",e,t,r)}}var o=i(860),a=i(2983);const s=Object.values(o.K);function c(e){const t={};return s.forEach((r=>{t[r]=function(e,t){return!0===(0,a.gD)(t,"".concat(e,".enabled"))}(r,e)})),t}var u=i(425);var d=i(1687),l=i(4234),f=i(5289),h=i(6154),g=i(5270),p=i(7767),m=i(6389);class v extends l.W{constructor(e,t,r){let n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];super(e,t,r),this.auto=n,this.abortHandler=void 0,this.featAggregate=void 0,this.onAggregateImported=void 0,!1===(0,a.gD)(this.agentIdentifier,"".concat(this.featureName,".autoStart"))&&(this.auto=!1),this.auto?(0,d.Ak)(e,r):this.ee.on("manual-start-all",(0,m.J)((()=>{(0,d.Ak)(this.agentIdentifier,this.featureName),this.auto=!0,this.importAggregator()})))}importAggregator(){let t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(this.featAggregate||!this.auto)return;this.onAggregateImported=new Promise((e=>{t=e}));const n=async()=>{let n;try{if((0,p.V)(this.agentIdentifier)){const{setupAgentSession:e}=await i.e(478).then(i.bind(i,6526));n=e(this.agentIdentifier)}}catch(t){(0,e.R)(20,t),this.ee.emit("internal-error",[t]),this.featureName===o.K.sessionReplay&&this.abortHandler?.()}try{if(!this.#t(this.featureName,n))return(0,d.Ze)(this.agentIdentifier,this.featureName),void t(!1);const{lazyFeatureLoader:e}=await i.e(478).then(i.bind(i,6103)),{Aggregate:o}=await e(this.featureName,"aggregate");this.featAggregate=new o(this.agentIdentifier,this.aggregator,r),t(!0)}catch(r){(0,e.R)(34,r),this.abortHandler?.(),(0,d.Ze)(this.agentIdentifier,this.featureName,!0),t(!1),this.ee&&this.ee.abort()}};h.RI?(0,f.GG)((()=>n()),!0):n()}#t(e,t){switch(e){case o.K.sessionReplay:return(0,g.SR)(this.agentIdentifier)&&!!t;case o.K.sessionTrace:return!!t;default:return!0}}}var b=i(6630);class y extends v{static featureName=(()=>b.T)();constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,b.T,r),this.importAggregator()}}var w=i(4777);class R extends w.J{constructor(e){super(e),this.aggregatedData={}}store(e,t,r,n,i){var o=this.getBucket(e,t,r,i);return o.metrics=function(e,t){t||(t={count:0});return t.count+=1,Object.entries(e||{}).forEach((e=>{let[r,n]=e;t[r]=x(n,t[r])})),t}(n,o.metrics),o}merge(e,t,r,n,i){var o=this.getBucket(e,t,n,i);if(o.metrics){var a=o.metrics;a.count+=r.count,Object.keys(r||{}).forEach((e=>{if("count"!==e){var t=a[e],n=r[e];n&&!n.c?a[e]=x(n.t,t):a[e]=function(e,t){if(!t)return e;t.c||(t=T(t.t));return t.min=Math.min(e.min,t.min),t.max=Math.max(e.max,t.max),t.t+=e.t,t.sos+=e.sos,t.c+=e.c,t}(n,a[e])}}))}else o.metrics=r}storeMetric(e,t,r,n){var i=this.getBucket(e,t,r);return i.stats=x(n,i.stats),i}getBucket(e,t,r,n){this.aggregatedData[e]||(this.aggregatedData[e]={});var i=this.aggregatedData[e][t];return i||(i=this.aggregatedData[e][t]={params:r||{}},n&&(i.custom=n)),i}get(e,t){return t?this.aggregatedData[e]&&this.aggregatedData[e][t]:this.aggregatedData[e]}take(e){for(var t={},r="",n=!1,i=0;i<e.length;i++)t[r=e[i]]=Object.values(this.aggregatedData[r]||{}),t[r].length&&(n=!0),delete this.aggregatedData[r];return n?t:null}}function x(e,t){return null==e?function(e){e?e.c++:e={c:1};return e}(t):t?(t.c||(t=T(t.t)),t.c+=1,t.t+=e,t.sos+=e*e,e>t.max&&(t.max=e),e<t.min&&(t.min=e),t):{t:e}}function T(e){return{t:e,min:e,max:e,sos:e*e,c:1}}var A=i(384);var E=i(9908),N=i(2843),S=i(3878),O=i(782),I=i(1863);class _ extends v{static featureName=(()=>O.T)();constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,O.T,r),h.RI&&((0,N.u)((()=>(0,E.p)("docHidden",[(0,I.t)()],void 0,O.T,this.ee)),!0),(0,S.sp)("pagehide",(()=>(0,E.p)("winPagehide",[(0,I.t)()],void 0,O.T,this.ee))),this.importAggregator())}}var j=i(3969);class P extends v{static featureName=(()=>j.TZ)();constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,j.TZ,r),this.importAggregator()}}var C=i(6774),k=i(3304);class L{constructor(e,t,r,n,i){this.name="UncaughtError",this.message="string"==typeof e?e:(0,k.A)(e),this.sourceURL=t,this.line=r,this.column=n,this.__newrelic=i}}function D(e){return K(e)?e:new L(void 0!==e?.message?e.message:e,e?.filename||e?.sourceURL,e?.lineno||e?.line,e?.colno||e?.col,e?.__newrelic)}function H(e){let t="Unhandled Promise Rejection";if(K(e?.reason))try{return e.reason.message=t+": "+e.reason.message,D(e.reason)}catch(t){return D(e.reason)}if(void 0===e.reason)return D(t);const r=D(e.reason);return r.message=t+": "+r?.message,r}function M(e){if(e.error instanceof SyntaxError&&!/:\d+$/.test(e.error.stack?.trim())){const t=new L(e.message,e.filename,e.lineno,e.colno,e.error.__newrelic);return t.name=SyntaxError.name,t}return K(e.error)?e.error:D(e)}function K(e){return e instanceof Error&&!!e.stack}class U extends v{static featureName=(()=>C.T)();#r=!1;constructor(e,r){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,r,C.T,n);try{this.removeOnAbort=new AbortController}catch(e){}this.ee.on("internal-error",(e=>{this.abortHandler&&(0,E.p)("ierr",[D(e),(0,I.t)(),!0,{},this.#r],void 0,this.featureName,this.ee)})),this.ee.on(t.G4.REPLAY_RUNNING,(e=>{this.#r=e})),h.gm.addEventListener("unhandledrejection",(e=>{this.abortHandler&&(0,E.p)("err",[H(e),(0,I.t)(),!1,{unhandledPromiseRejection:1},this.#r],void 0,this.featureName,this.ee)}),(0,S.jT)(!1,this.removeOnAbort?.signal)),h.gm.addEventListener("error",(e=>{this.abortHandler&&(0,E.p)("err",[M(e),(0,I.t)(),!1,{},this.#r],void 0,this.featureName,this.ee)}),(0,S.jT)(!1,this.removeOnAbort?.signal)),this.abortHandler=this.#n,this.importAggregator()}#n(){this.removeOnAbort?.abort(),this.abortHandler=void 0}}var G=i(8990);let B=1;const V="nr@id";function F(e){const t=typeof e;return!e||"object"!==t&&"function"!==t?-1:e===h.gm?0:(0,G.I)(e,V,(function(){return B++}))}function W(e){if("string"==typeof e&&e.length)return e.length;if("object"==typeof e){if("undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer&&e.byteLength)return e.byteLength;if("undefined"!=typeof Blob&&e instanceof Blob&&e.size)return e.size;if(!("undefined"!=typeof FormData&&e instanceof FormData))try{return(0,k.A)(e).length}catch(e){return}}}var z=i(8941),Z=i(7485);class q{constructor(e){this.agentIdentifier=e}generateTracePayload(e){if(!this.shouldGenerateTrace(e))return null;var t=(0,a.oC)(this.agentIdentifier);if(!t)return null;var n=(t.accountID||"").toString()||null,i=(t.agentID||"").toString()||null,o=(t.trustKey||"").toString()||null;if(!n||!i)return null;var s=(0,r.ZF)(),c=(0,r.el)(),u=Date.now(),d={spanId:s,traceId:c,timestamp:u};return(e.sameOrigin||this.isAllowedOrigin(e)&&this.useTraceContextHeadersForCors())&&(d.traceContextParentHeader=this.generateTraceContextParentHeader(s,c),d.traceContextStateHeader=this.generateTraceContextStateHeader(s,u,n,i,o)),(e.sameOrigin&&!this.excludeNewrelicHeader()||!e.sameOrigin&&this.isAllowedOrigin(e)&&this.useNewrelicHeaderForCors())&&(d.newrelicHeader=this.generateTraceHeader(s,c,u,n,i,o)),d}generateTraceContextParentHeader(e,t){return"00-"+t+"-"+e+"-01"}generateTraceContextStateHeader(e,t,r,n,i){return i+"@nr=0-1-"+r+"-"+n+"-"+e+"----"+t}generateTraceHeader(e,t,r,n,i,o){if(!("function"==typeof h.gm?.btoa))return null;var a={v:[0,1],d:{ty:"Browser",ac:n,ap:i,id:e,tr:t,ti:r}};return o&&n!==o&&(a.d.tk=o),btoa((0,k.A)(a))}shouldGenerateTrace(e){return this.isDtEnabled()&&this.isAllowedOrigin(e)}isAllowedOrigin(e){var t=!1,r={};if((0,a.gD)(this.agentIdentifier,"distributed_tracing")&&(r=(0,a.D0)(this.agentIdentifier).distributed_tracing),e.sameOrigin)t=!0;else if(r.allowed_origins instanceof Array)for(var n=0;n<r.allowed_origins.length;n++){var i=(0,Z.D)(r.allowed_origins[n]);if(e.hostname===i.hostname&&e.protocol===i.protocol&&e.port===i.port){t=!0;break}}return t}isDtEnabled(){var e=(0,a.gD)(this.agentIdentifier,"distributed_tracing");return!!e&&!!e.enabled}excludeNewrelicHeader(){var e=(0,a.gD)(this.agentIdentifier,"distributed_tracing");return!!e&&!!e.exclude_newrelic_header}useNewrelicHeaderForCors(){var e=(0,a.gD)(this.agentIdentifier,"distributed_tracing");return!!e&&!1!==e.cors_use_newrelic_header}useTraceContextHeadersForCors(){var e=(0,a.gD)(this.agentIdentifier,"distributed_tracing");return!!e&&!!e.cors_use_tracecontext_headers}}var Y=i(9300),X=i(7295),J=["load","error","abort","timeout"],Q=J.length,ee=a.hR.REQ,te=a.hR.XHR;class re extends v{static featureName=(()=>Y.T)();constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,Y.T,r),this.dt=new q(e),this.handler=(e,t,r,n)=>(0,E.p)(e,t,r,n,this.ee);try{const e={xmlhttprequest:"xhr",fetch:"fetch",beacon:"beacon"};h.gm?.performance?.getEntriesByType("resource").forEach((t=>{if(t.initiatorType in e&&0!==t.responseStatus){const r={status:t.responseStatus},n={rxSize:t.transferSize,duration:Math.floor(t.duration),cbTime:0};ne(r,t.name),this.handler("xhr",[r,n,t.startTime,t.responseEnd,e[t.initiatorType]],void 0,o.K.ajax)}}))}catch(e){}(0,z.NZ)(this.ee),(0,z.bX)(this.ee),function(e,t,r,n){function i(e){var t=this;t.totalCbs=0,t.called=0,t.cbTime=0,t.end=x,t.ended=!1,t.xhrGuids={},t.lastSize=null,t.loadCaptureCalled=!1,t.params=this.params||{},t.metrics=this.metrics||{},e.addEventListener("load",(function(r){T(t,e)}),(0,S.jT)(!1)),h.lR||e.addEventListener("progress",(function(e){t.lastSize=e.loaded}),(0,S.jT)(!1))}function s(e){this.params={method:e[0]},ne(this,e[1]),this.metrics={}}function c(t,r){var i=(0,a.oC)(e);i.xpid&&this.sameOrigin&&r.setRequestHeader("X-NewRelic-ID",i.xpid);var o=n.generateTracePayload(this.parsedOrigin);if(o){var s=!1;o.newrelicHeader&&(r.setRequestHeader("newrelic",o.newrelicHeader),s=!0),o.traceContextParentHeader&&(r.setRequestHeader("traceparent",o.traceContextParentHeader),o.traceContextStateHeader&&r.setRequestHeader("tracestate",o.traceContextStateHeader),s=!0),s&&(this.dt=o)}}function u(e,r){var n=this.metrics,i=e[0],o=this;if(n&&i){var a=W(i);a&&(n.txSize=a)}this.startTime=(0,I.t)(),this.body=i,this.listener=function(e){try{"abort"!==e.type||o.loadCaptureCalled||(o.params.aborted=!0),("load"!==e.type||o.called===o.totalCbs&&(o.onloadCalled||"function"!=typeof r.onload)&&"function"==typeof o.end)&&o.end(r)}catch(e){try{t.emit("internal-error",[e])}catch(e){}}};for(var s=0;s<Q;s++)r.addEventListener(J[s],this.listener,(0,S.jT)(!1))}function d(e,t,r){this.cbTime+=e,t?this.onloadCalled=!0:this.called+=1,this.called!==this.totalCbs||!this.onloadCalled&&"function"==typeof r.onload||"function"!=typeof this.end||this.end(r)}function l(e,t){var r=""+F(e)+!!t;this.xhrGuids&&!this.xhrGuids[r]&&(this.xhrGuids[r]=!0,this.totalCbs+=1)}function f(e,t){var r=""+F(e)+!!t;this.xhrGuids&&this.xhrGuids[r]&&(delete this.xhrGuids[r],this.totalCbs-=1)}function g(){this.endTime=(0,I.t)()}function p(e,r){r instanceof te&&"load"===e[0]&&t.emit("xhr-load-added",[e[1],e[2]],r)}function m(e,r){r instanceof te&&"load"===e[0]&&t.emit("xhr-load-removed",[e[1],e[2]],r)}function v(e,t,r){t instanceof te&&("onload"===r&&(this.onload=!0),("load"===(e[0]&&e[0].type)||this.onload)&&(this.xhrCbStart=(0,I.t)()))}function b(e,r){this.xhrCbStart&&t.emit("xhr-cb-time",[(0,I.t)()-this.xhrCbStart,this.onload,r],r)}function y(e){var t,r=e[1]||{};if("string"==typeof e[0]?0===(t=e[0]).length&&h.RI&&(t=""+h.gm.location.href):e[0]&&e[0].url?t=e[0].url:h.gm?.URL&&e[0]&&e[0]instanceof URL?t=e[0].href:"function"==typeof e[0].toString&&(t=e[0].toString()),"string"==typeof t&&0!==t.length){t&&(this.parsedOrigin=(0,Z.D)(t),this.sameOrigin=this.parsedOrigin.sameOrigin);var i=n.generateTracePayload(this.parsedOrigin);if(i&&(i.newrelicHeader||i.traceContextParentHeader))if(e[0]&&e[0].headers)s(e[0].headers,i)&&(this.dt=i);else{var o={};for(var a in r)o[a]=r[a];o.headers=new Headers(r.headers||{}),s(o.headers,i)&&(this.dt=i),e.length>1?e[1]=o:e.push(o)}}function s(e,t){var r=!1;return t.newrelicHeader&&(e.set("newrelic",t.newrelicHeader),r=!0),t.traceContextParentHeader&&(e.set("traceparent",t.traceContextParentHeader),t.traceContextStateHeader&&e.set("tracestate",t.traceContextStateHeader),r=!0),r}}function w(e,t){this.params={},this.metrics={},this.startTime=(0,I.t)(),this.dt=t,e.length>=1&&(this.target=e[0]),e.length>=2&&(this.opts=e[1]);var r,n=this.opts||{},i=this.target;"string"==typeof i?r=i:"object"==typeof i&&i instanceof ee?r=i.url:h.gm?.URL&&"object"==typeof i&&i instanceof URL&&(r=i.href),ne(this,r);var o=(""+(i&&i instanceof ee&&i.method||n.method||"GET")).toUpperCase();this.params.method=o,this.body=n.body,this.txSize=W(n.body)||0}function R(e,t){if(this.endTime=(0,I.t)(),this.params||(this.params={}),(0,X.iW)(this.params))return;let n;this.params.status=t?t.status:0,"string"==typeof this.rxSize&&this.rxSize.length>0&&(n=+this.rxSize);const i={txSize:this.txSize,rxSize:n,duration:(0,I.t)()-this.startTime};r("xhr",[this.params,i,this.startTime,this.endTime,"fetch"],this,o.K.ajax)}function x(e){const t=this.params,n=this.metrics;if(!this.ended){this.ended=!0;for(let t=0;t<Q;t++)e.removeEventListener(J[t],this.listener,!1);t.aborted||(0,X.iW)(t)||(n.duration=(0,I.t)()-this.startTime,this.loadCaptureCalled||4!==e.readyState?null==t.status&&(t.status=0):T(this,e),n.cbTime=this.cbTime,r("xhr",[t,n,this.startTime,this.endTime,"xhr"],this,o.K.ajax))}}function T(e,r){e.params.status=r.status;var n=function(e,t){var r=e.responseType;return"json"===r&&null!==t?t:"arraybuffer"===r||"blob"===r||"json"===r?W(e.response):"text"===r||""===r||void 0===r?W(e.responseText):void 0}(r,e.lastSize);if(n&&(e.metrics.rxSize=n),e.sameOrigin){var i=r.getResponseHeader("X-NewRelic-App-Data");i&&((0,E.p)(j.rs,["Ajax/CrossApplicationTracing/Header/Seen"],void 0,o.K.metrics,t),e.params.cat=i.split(", ").pop())}e.loadCaptureCalled=!0}t.on("new-xhr",i),t.on("open-xhr-start",s),t.on("open-xhr-end",c),t.on("send-xhr-start",u),t.on("xhr-cb-time",d),t.on("xhr-load-added",l),t.on("xhr-load-removed",f),t.on("xhr-resolved",g),t.on("addEventListener-end",p),t.on("removeEventListener-end",m),t.on("fn-end",b),t.on("fetch-before-start",y),t.on("fetch-start",w),t.on("fn-start",v),t.on("fetch-done",R)}(e,this.ee,this.handler,this.dt),this.importAggregator()}}function ne(e,t){var r=(0,Z.D)(t),n=e.params||e;n.hostname=r.hostname,n.port=r.port,n.protocol=r.protocol,n.host=r.hostname+":"+r.port,n.pathname=r.pathname,e.parsedOrigin=r,e.sameOrigin=r.sameOrigin}var ie=i(3738);const{He:oe,bD:ae,d3:se,Kp:ce,TZ:ue,Lc:de,uP:le,Rz:fe}=ie;class he extends v{static featureName=(()=>ue)();constructor(e,t){super(e,t,ue,!(arguments.length>2&&void 0!==arguments[2])||arguments[2]);if(!(0,p.V)(this.agentIdentifier))return void(0,d.x3)(this.agentIdentifier,this.featureName);const r=this.ee;let n;(0,z.vC)(r),this.eventsEE=(0,z.um)(r),this.eventsEE.on(le,(function(e,t){this.bstStart=(0,I.t)()})),this.eventsEE.on(de,(function(e,t){(0,E.p)("bst",[e[0],t,this.bstStart,(0,I.t)()],void 0,o.K.sessionTrace,r)})),r.on(fe+se,(function(e){this.time=(0,I.t)(),this.startPath=location.pathname+location.hash})),r.on(fe+ce,(function(e){(0,E.p)("bstHist",[location.pathname+location.hash,this.startPath,this.time],void 0,o.K.sessionTrace,r)}));try{n=new PerformanceObserver((e=>{const t=e.getEntries();(0,E.p)(oe,[t],void 0,o.K.sessionTrace,r)})),n.observe({type:ae,buffered:!0})}catch(e){}this.importAggregator({resourceObserver:n})}}var ge=i(2614);class pe extends v{static featureName=(()=>t.TZ)();#i;constructor(e,r){let n,i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,r,t.TZ,i),this.replayRunning=!1;try{n=JSON.parse(localStorage.getItem("".concat(ge.H3,"_").concat(ge.uh)))}catch(e){}(0,g.SR)(e)&&this.ee.on(t.G4.RECORD,(()=>this.#o())),this.#a(n)?(this.#i=n?.sessionReplayMode,this.#s()):this.importAggregator(),this.ee.on("err",(e=>{this.replayRunning&&(this.errorNoticed=!0,(0,E.p)(t.G4.ERROR_DURING_REPLAY,[e],void 0,this.featureName,this.ee))})),this.ee.on(t.G4.REPLAY_RUNNING,(e=>{this.replayRunning=e}))}#a(e){return e&&(e.sessionReplayMode===ge.g.FULL||e.sessionReplayMode===ge.g.ERROR)||(0,g.Aw)(this.agentIdentifier)}#c=!1;async#s(e){if(!this.#c){this.#c=!0;try{const{Recorder:t}=await Promise.all([i.e(478),i.e(249)]).then(i.bind(i,2496));this.recorder??=new t({mode:this.#i,agentIdentifier:this.agentIdentifier,trigger:e,ee:this.ee}),this.recorder.startRecording(),this.abortHandler=this.recorder.stopRecording}catch(e){}this.importAggregator({recorder:this.recorder,errorNoticed:this.errorNoticed})}}#o(){this.featAggregate?this.featAggregate.mode!==ge.g.FULL&&this.featAggregate.initializeRecording(ge.g.FULL,!0):(this.#i=ge.g.FULL,this.#s(t.Qb.API),this.recorder&&this.recorder.parent.mode!==ge.g.FULL&&(this.recorder.parent.mode=ge.g.FULL,this.recorder.stopRecording(),this.recorder.startRecording(),this.abortHandler=this.recorder.stopRecording))}}var me=i(3962);class ve extends v{static featureName=(()=>me.TZ)();constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(super(e,t,me.TZ,r),!h.RI||!a.hR.MO)return;const n=(0,z.vC)(this.ee),i=(0,z.um)(this.ee),o=()=>(0,E.p)("newURL",[(0,I.t)(),""+window.location],void 0,this.featureName,this.ee);n.on("pushState-end",o),n.on("replaceState-end",o);try{this.removeOnAbort=new AbortController}catch(e){}(0,S.sp)("popstate",(e=>(0,E.p)("newURL",[e.timeStamp,""+window.location],void 0,this.featureName,this.ee)),!0,this.removeOnAbort?.signal);let s=!1;const c=new a.hR.MO(((e,t)=>{s||(s=!0,requestAnimationFrame((()=>{(0,E.p)("newDom",[(0,I.t)()],void 0,this.featureName,this.ee),s=!1})))})),u=(0,m.s)((e=>{(0,E.p)("newUIEvent",[e],void 0,this.featureName,this.ee),c.observe(document.body,{attributes:!0,childList:!0,subtree:!0,characterData:!0})}),100,{leading:!0});i.on("fn-start",(e=>{let[t]=e;me.tC.includes(t?.type)&&u(t)}));for(let e of me.tC)document.addEventListener(e,(()=>{}));this.abortHandler=function(){this.removeOnAbort?.abort(),c.disconnect(),this.abortHandler=void 0},this.importAggregator({domObserver:c})}}var be=i(7378);const{TZ:ye,d3:we,Kp:Re,$p:xe,wW:Te,e5:Ae,tH:Ee,uP:Ne,rw:Se,Lc:Oe}=be;class Ie extends v{static featureName=(()=>ye)();constructor(e,t){var r;if(super(e,t,ye,!(arguments.length>2&&void 0!==arguments[2])||arguments[2]),r=this,!h.RI)return;try{this.removeOnAbort=new AbortController}catch(e){}let n,i=0;const o=this.ee.get("tracer"),a=(0,z.Ri)(this.ee),s=(0,z.o8)(this.ee),c=(0,z.MO)(this.ee),u=(0,z.bX)(this.ee),d=this.ee.get("events"),l=(0,z.NZ)(this.ee),f=(0,z.vC)(this.ee),g=(0,z.Ak)(this.ee);function p(e,t){f.emit("newURL",[""+window.location,t])}function m(){i++,n=window.location.hash,this[Ne]=(0,I.t)()}function v(){i--,window.location.hash!==n&&p(0,!0);var e=(0,I.t)();this[Ae]=~~this[Ae]+e-this[Ne],this[Oe]=e}function b(e,t){e.on(t,(function(){this[t]=(0,I.t)()}))}this.ee.on(Ne,m),s.on(Se,m),a.on(Se,m),this.ee.on(Oe,v),s.on(Te,v),a.on(Te,v),this.ee.on("fn-err",(function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];n[2]?.__newrelic?.[e]||(0,E.p)("function-err",[...n],void 0,r.featureName,r.ee)})),this.ee.buffer([Ne,Oe,"xhr-resolved"],this.featureName),d.buffer([Ne],this.featureName),c.buffer(["setTimeout"+Re,"clearTimeout"+we,Ne],this.featureName),u.buffer([Ne,"new-xhr","send-xhr"+we],this.featureName),l.buffer([Ee+we,Ee+"-done",Ee+xe+we,Ee+xe+Re],this.featureName),f.buffer(["newURL"],this.featureName),g.buffer([Ne],this.featureName),s.buffer(["propagate",Se,Te,"executor-err","resolve"+we],this.featureName),o.buffer([Ne,"no-"+Ne],this.featureName),a.buffer(["new-jsonp","cb-start","jsonp-error","jsonp-end"],this.featureName),b(l,Ee+we),b(l,Ee+"-done"),b(a,"new-jsonp"),b(a,"jsonp-end"),b(a,"cb-start"),f.on("pushState-end",p),f.on("replaceState-end",p),window.addEventListener("hashchange",p,(0,S.jT)(!0,this.removeOnAbort?.signal)),window.addEventListener("load",p,(0,S.jT)(!0,this.removeOnAbort?.signal)),window.addEventListener("popstate",(function(){p(0,i>1)}),(0,S.jT)(!0,this.removeOnAbort?.signal)),this.abortHandler=this.#n,this.importAggregator()}#n(){this.removeOnAbort?.abort(),this.abortHandler=void 0}}var _e=i(3333);class je extends v{static featureName=(()=>_e.T)();constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,_e.T,r);[(0,a.gD)(this.agentIdentifier,"page_action.enabled")].some((e=>e))?this.importAggregator():(0,d.x3)(this.agentIdentifier,this.featureName)}}var Pe=i(993),Ce=i(3785);class ke extends v{static featureName=(()=>Pe.TZ)();constructor(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(e,t,Pe.TZ,r);const n=this.ee;this.ee.on("wrap-logger-end",(function(e){let[t]=e;const{level:r,customAttributes:i}=this;(0,Ce.R)(n,t,i,r)})),this.importAggregator()}}new class extends n{constructor(t,r){super(r),h.gm?(this.sharedAggregator=new R({agentIdentifier:this.agentIdentifier}),this.features={},(0,A.bQ)(this.agentIdentifier,this),this.desiredFeatures=new Set(t.features||[]),this.desiredFeatures.add(y),this.runSoftNavOverSpa=[...this.desiredFeatures].some((e=>e.featureName===o.K.softNav)),(0,u.j)(this,t,t.loaderType||"agent"),this.run()):(0,e.R)(21)}get config(){return{info:this.info,init:this.init,loader_config:this.loader_config,runtime:this.runtime}}run(){try{const t=c(this.agentIdentifier),r=[...this.desiredFeatures];r.sort(((e,t)=>o.P[e.featureName]-o.P[t.featureName])),r.forEach((r=>{if(!t[r.featureName]&&r.featureName!==o.K.pageViewEvent)return;if(this.runSoftNavOverSpa&&r.featureName===o.K.spa)return;if(!this.runSoftNavOverSpa&&r.featureName===o.K.softNav)return;(function(e){switch(e){case o.K.ajax:return[o.K.jserrors];case o.K.sessionTrace:return[o.K.ajax,o.K.pageViewEvent];case o.K.sessionReplay:return[o.K.sessionTrace];case o.K.pageViewTiming:return[o.K.pageViewEvent];default:return[]}})(r.featureName).every((e=>e in this.features))||(0,e.R)(36,r.featureName),this.features[r.featureName]=new r(this.agentIdentifier,this.sharedAggregator)}))}catch(t){(0,e.R)(22,t);for(const e in this.features)this.features[e].abortHandler?.();const r=(0,A.Zm)();delete r.initializedAgents[this.agentIdentifier]?.api,delete r.initializedAgents[this.agentIdentifier]?.features,delete this.sharedAggregator;return r.ee.get(this.agentIdentifier).abort(),!1}}}({features:[re,y,_,he,pe,P,U,je,ke,ve,Ie],loaderType:"spa"})})()})();
        `}
        </script>


        <meta
            name='keywords'
            content='cards, game, CrudeCards, party game, card game' />
        <meta
            name='author'
            content='https://github.com/dandonahoe' />
        <meta
            name='description'
            content='CrudeCards: A Good Game for Bad People.' />

        {/* Open Graph tags */}
        <meta
            property='og:title'
            content='CrudeCards' />
        <meta
            property='og:description'
            content='CrudeCards: A Good Game for Bad People.' />
        <meta
            property='og:type'
            content='website' />
        <meta
            property='og:url'
            content='https://dev.construct.works' />
        <meta
            property='og:site_name'
            content='CrudeCards' />

        {/* Twitter Card tags */}
        <meta
            name='twitter:card'
            content='summary_large_image' />
        <meta
            name='twitter:title'
            content='CrudeCards' />
        <meta
            name='twitter:description'
            content='CrudeCards: A Good Game for Bad People.' />
        {/* <meta
            name='twitter:image'
            content='/twitter-image.png' /> */}
        <meta
            name='twitter:site'
            content='@dandonahoe' />
        <link
            rel='apple-touch-icon'
            sizes='57x57'
            href='/apple-icon-57x57.png' />
        <link
            rel='apple-touch-icon'
            sizes='60x60'
            href='/apple-icon-60x60.png' />
        <link
            rel='apple-touch-icon'
            sizes='72x72'
            href='/apple-icon-72x72.png' />
        <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='/apple-icon-76x76.png' />
        <link
            rel='apple-touch-icon'
            sizes='114x114'
            href='/apple-icon-114x114.png' />
        <link
            rel='apple-touch-icon'
            sizes='120x120'
            href='/apple-icon-120x120.png' />
        <link
            rel='apple-touch-icon'
            sizes='144x144'
            href='/apple-icon-144x144.png' />
        <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/apple-icon-152x152.png' />
        <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-icon-180x180.png' />
        <link
            rel='apple-touch-icon'
            sizes='57x57'
            href='/apple-icon-precomposed.png' />
        <link
            rel='apple-touch-icon'
            href='/apple-icon.png' />
        <link
            rel='icon'
            type='image/png'
            sizes='192x192'
            href='/android-icon-192x192.png' />
        <link
            rel='icon'
            type='image/png'
            sizes='36x36'
            href='/android-icon-36x36.png' />
        <link
            rel='icon'
            type='image/png'
            sizes='48x48'
            href='/android-icon-48x48.png' />
        <link
            rel='icon'
            type='image/png'
            sizes='72x72'
            href='/android-icon-72x72.png' />
        <link
            rel='icon'
            type='image/png'
            sizes='96x96'
            href='/android-icon-96x96.png' />
        <link
            rel='icon'
            type='image/png'
            sizes='144x144'
            href='/android-icon-144x144.png' />
        <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png' />
        <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png' />
        <link
            rel='icon'
            type='image/png'
            sizes='96x96'
            href='/favicon-96x96.png' />
        <link
            rel='icon'
            type='image/x-icon'
            href='/favicon.ico' />
        <link
            rel='manifest'
            href='/manifest.json' />
        <meta
            name='msapplication-TileColor'
            content='#ffffff' />
        <meta
            name='msapplication-TileImage'
            content='/ms-icon-70x70.png' />
        <meta
            name='msapplication-TileImage'
            content='/ms-icon-144x144.png' />
        <meta
            name='msapplication-TileImage'
            content='/ms-icon-150x150.png' />
        <meta
            name='msapplication-TileImage'
            content='/ms-icon-310x310.png' />
        <meta
            name='theme-color'
            content='#ffffff'></meta>
    </>

/* eslint-enable max-len */
/* eslint-enable no-useless-escape */

// eslint-disable-next-line import/no-default-export
export default AppHeadGame;

```

## /Users/bort/code/crude-cards/src/pages/AppContent/AppScript.tsx

```typescript
import { RFC } from '@app/ui/type';
import Script from 'next/script';
import { Env } from '@app/Env';


const googleAnalyticsId = Env.getValue<string>('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID');


export const AppScript : RFC = () =>
    <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}/>
        <Script
            strategy='afterInteractive'
            id='google-analytics'
            dangerouslySetInnerHTML={{
                __html : `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${googleAnalyticsId}');
                `.trim(),
            }} />
    </>


// eslint-disable-next-line import/no-default-export
export default AppScript;

```

## /Users/bort/code/crude-cards/src/pages/_app.tsx

```typescript
import { CustomPageProps } from '../type/framework/template/CustomPageProps';
import { Notifications } from '@mantine/notifications';
import { AppProvider } from '@app/client/AppProvider';
import { AppScript } from './AppContent/AppScript';
import { MantineProvider } from '@mantine/core';
import { AppTheme } from '@app/client/AppTheme';
import '@mantine/code-highlight/styles.css';
import { useEffect, useState } from 'react';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import { RFC } from '@app/ui/type';
import '@mantine/core/styles.css';
import Cookies from 'js-cookie';
import { GameTemplate } from '../ui/game/GameTemplate/index';


const App : RFC<CustomPageProps> = ({
    Component, pageProps,
}) => {

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        if (isInitialLoad) {
            // Perform actions on initial load
            Cookies.remove('AuthToken');

            // Set the state to false after performing the initial load actions
            setIsInitialLoad(false);
        }
    }, [isInitialLoad]);

    return (
        <AppProvider>
            <AppScript />
            <MantineProvider theme={AppTheme} >
                <Notifications />
                <GameTemplate appId='app-alpha'>
                    <Component {...pageProps} />
                </GameTemplate>
            </MantineProvider>
        </AppProvider>
    );
}


// eslint-disable-next-line import/no-default-export
export default App;

```

## /Users/bort/code/crude-cards/src/pages/_document.tsx

```typescript
import { NextScript, Html, Main, Head } from 'next/document';
import { AppHeadGame } from './AppContent/AppHeadGame';
import { ColorSchemeScript } from '@mantine/core';


// eslint-disable-next-line import/no-default-export
export default function Document() : React.JSX.Element {
    return (
        <Html lang='en'>
            <Head>
                <AppHeadGame />
                <ColorSchemeScript defaultColorScheme='dark' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

```

## /Users/bort/code/crude-cards/src/pages/game.tsx

```typescript
import { PageGame } from '@app/ui/page/site/PageGame';

// eslint-disable-next-line import/no-default-export
export default PageGame;

```

## /Users/bort/code/crude-cards/src/pages/index.tsx

```typescript
import { PageGame } from '@app/ui/page/site/PageGame';

// eslint-disable-next-line import/no-default-export
export default PageGame;

```

## /Users/bort/code/crude-cards/src/test/MockData.ts

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */

import { InvalidDatabaseIdList, ValidDatabaseIdList, ValidNumbersList } from './constant/Number';
import { BooleanValidList, BooleanInvalidList } from './constant/Boolean';
import { JSONValidList, JSONInvalidList } from './constant/JSON';
import { UnserializableList } from './constant/Unserializable';
import { InvalidList } from './constant/Invalid';
import { MockDataHierarchy } from './type';
import {
    DatesInvalidStringList, DatesEdgeCasesList, DatesInFutureList,
    DatesInvalidList,       DatesInPastList,    DatesValidList,
} from './constant/Date';
import {
    SpecialCharactersList, StringsInvalidList, StringsList,
    UnconvertableToStringList, ValidNotObjectStringList,
} from './constant/String';


// Structured MockData using the base variables
export const MockData : MockDataHierarchy = {

    Undefined : undefined,
    Null      : null,

    Service : {
        TestHash : 'test-hash-beep-boop-123',
    },

    Date : {
        Valid : {
            EdgeCasesList : DatesEdgeCasesList,
            InFutureList  : DatesInFutureList,
            InPastList    : DatesInPastList,
            Value         : DatesValidList[0],
            List          : DatesValidList,
        },

        Invalid : {
            StringList : DatesInvalidStringList,
            Value      : DatesInvalidList[0],
            List       : DatesInvalidList,
        },
    },
    Boolean : {
        Valid : {
            Value : BooleanValidList[0],
            List  : BooleanValidList,
        },
        Invalid : {
            Value : BooleanInvalidList[0],
            List  : BooleanInvalidList,
        },
    },
    JSON : {
        Valid : {
            Value : JSONValidList[0],
            List  : JSONValidList,
        },

        Invalid : {
            Value : JSONInvalidList[0],
            List  : JSONInvalidList,
        },
    },

    Number : {
        Valid : {
            Value : ValidNumbersList[0],
            List  : ValidNumbersList,

            IntegerList : [
                '1e5',
                5,
                3,
            ],

            DatabaseId : 123,

            UncommonList : [
                -Infinity,
                Infinity,
            ],

            BoundaryValueList : [
                Number.POSITIVE_INFINITY,
                Number.NEGATIVE_INFINITY,
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
                -Infinity,
                Infinity,
            ],

            DatabaseIdList : ValidDatabaseIdList,
        },

        Invalid : {
            BoundaryValueList : [],
            DatabaseIdList    : InvalidDatabaseIdList,
            Value             : InvalidList[0],
            List              : InvalidList,
        },
    },
    String : {
        Valid : {
            NotObjectStringList : ValidNotObjectStringList,
            Value               : JSONValidList[0],
            List                : StringsList,
            Empty               : '',
        },

        Invalid : {
            Value : StringsInvalidList[0] as unknown as string,
            List  : StringsInvalidList,

            UnconvertableToStringList,

            ThatAreNotObjectStringList : [
                ...ValidNumbersList.map(num => num.toString()),
                '"string"',
                '"null"',
            ],

            NumberStringList : [
                '1,234',
                '1.2.3',
            ],
        },
    },
    SpecialCharacterList : SpecialCharactersList,

    Misc : {
        Value : JSONValidList[0],

        CircularReference : {
            Name : 'Bozo the Clown',
            Self : null,  // Placeholder, will be set later
        },
    },

    UnserializableList,
} as const;

MockData.Misc.CircularReference.Self = MockData.Misc.CircularReference;

/* eslint-enable @typescript-eslint/no-explicit-any */


```

## /Users/bort/code/crude-cards/src/test/constant/Boolean.ts

```typescript
export const BooleanValidList = [
    true,
    false,
];

export const BooleanInvalidList = [
    // Functions
    () => {},
    function namedFunc() {},

    // Numbers
    0,
    1,
    NaN,
    Infinity,
    -Infinity,
    2.5,
    -2.5,

    // Strings
    '',
    'true',
    'false',
    '1',
    '0',
    'boolean',

    // Objects
    {},
    { key : 'value' },
    new Date(),
    new Error(),

    // Arrays
    [],
    [true],
    [false],
    [1, 2, 3],

    // Null and Undefined
    null,
    undefined,

    // Symbols
    Symbol('symbol'),

    // BigInt
    BigInt(0),
    BigInt(1234),

    // Other
    /regex/,
];

```

## /Users/bort/code/crude-cards/src/test/constant/Date.ts

```typescript
// Base variable definitions
export const DatesValidList = [
    new Date('Thu Oct 06 2023 00:00:00 GMT+0000'),
    new Date('2023-10-06T12:34:56.789+00:00'),
    new Date(0),                                  // Unix Epoch
    new Date(1640995200000),                      // Start of 2022 in milliseconds since Unix Epoch
    new Date(Date.UTC(2022, 0)),                  // Using Date.UTC
    new Date('2022'),                            // Just the year
    new Date('2022-01'),                         // Year and month
    new Date('2000-02-29'),                      // Valid leap year
    new Date('2022-11-30T23:59:59.999Z'),        // Milliseconds before next day
    new Date('2023-02-28T12:34:56.789Z'),        // Not a leap year
];

export const DatesInvalidStringList =[
    '01-01-2022 25:00:00',                        // Invalid hour
    '01-01-2022 00:60:00',                        // Invalid minute
    '2022-02-30',                                // Invalid day for February
    '2022-13-01',                                // Invalid month
    'Not a Date',                                // Random string
    '2022-00-00',                                // Invalid day and month
    '2020-02-30',                                // Invalid leap year day
    '30-02-2022',                                // Invalid day before month format
];

export const DatesInvalidList = DatesInvalidStringList.map(date => new Date(date));

// Additional array types:

export const DatesEdgeCasesList = [
    new Date(Number.MAX_SAFE_INTEGER),           // Maximum safe integer time
    new Date(Number.MIN_SAFE_INTEGER),           // Minimum safe integer time
    new Date(8640000000000000),                  // Max date range in JS
    new Date(-8640000000000000),                 // Min date range in JS
    new Date('0000-01-01T00:00:00Z'),            // Start of the Common Era
    new Date('-0001-12-31T23:59:59.999Z'),       // Milliseconds before the Common Era
];

export const DatesInFutureList = [
    new Date('9999-12-31'),                      // Distant future date
    new Date('2100-01-01'),                      // Start of 22nd century
    new Date('2500-05-05'),                      // Arbitrary future date
    new Date('5000-12-25'),                      // Far future Christmas
];

export const DatesInPastList = [
    new Date('0001-01-01'),                      // Distant past date
    new Date('1900-01-01'),                      // Start of 20th century
    new Date('1776-07-04'),                      // Independence Day for the USA
    new Date('1492-10-12'),                      // Columbus reached the New World
];


```

## /Users/bort/code/crude-cards/src/test/constant/Invalid.ts

```typescript
export const InvalidList = [
    function() {},      // Empty function (truthy but may be considered invalid in specific type-checking scenarios)
    new Set(),          // Empty Set (truthy but might be considered invalid if expecting content)
    new Map(),          // Empty Map (truthy but might be considered invalid if expecting content)
    null,               // Represents an intentional absence of any value
    undefined,          // The default value of uninitialized variables
    NaN,                // Represents a value that is "Not a Number"
    Symbol(),           // Unique and immutable data type
    (function*() {})(), // Empty generator function
    new WeakMap(),      // Empty WeakMap
    new WeakSet(),      // Empty WeakSet
    // eslint-disable-next-line promise/avoid-new
    new Promise(() => {}),
    new WeakMap(),
];

```

## /Users/bort/code/crude-cards/src/test/constant/JSON.ts

```typescript
/* eslint-disable max-len */

export const JSONValidList = [
    // Simple JSON strings
    '{}',
    '[]',

    // Disabling the insane parts of the json spec


    // Nested structures
    '{"description": "A JSON string with various data types", "data": {"boolean": true, "integer": 42, "float": 3.14159265359, "nullValue": null, "array": [1, 2, 3], "nestedObject": {"key1": "value1", "key2": "value2"}}}',
    '{"employees": [{"firstName": "Alice", "lastName": "Smith"}, {"firstName": "Bob", "lastName": "Johnson"}]}',

    // Arrays
    '[1,2,3]',
    '["a", "b", "c"]',
    '[null, false, {"key": "value"}]',

    // Special characters
    '{"specialChars": "!@#$%^&*()_-+={}[]|\':;<>,.?~"}',

    // Escaped characters
    '{"text": "This is a string with an escaped \\"double quote\\"."}',
];

export const JSONInvalidList = [
    // Incomplete or malformed structures
    '{"key": "value"',
    '{key: "value"}',
    '{"key": value}',
    '{"key": "value", }',

    // Using JavaScript-specific data structures and functions
    '{"key": new Map([["a", 1], ["b", 2]])}',
    '[new Map([["a", 1], ["b", 2]])]',
    '{"key": function() { return "value"; }}',
    '{"key": undefined}',

    // Other invalid JSON patterns
    'true, false',
    '{"key": "value" "key2": "value2"}',
    '42.42.42',

    // Edge cases
    '',
    'undefined',
    'NaN',
    'Infinity',
    '-Infinity',

    '"hello"',
    '42',
    'null',
    'true',
    'false',
];

/* eslint-enable max-len */

```

## /Users/bort/code/crude-cards/src/test/constant/Number.ts

```typescript
export const InvalidDatabaseIdList = [
    Infinity,
    -Infinity,
    null,
    -1,
    3.14,                // Floating point number
    NaN,
    'string',            // String data type
    {},                  // Empty object
    [],                  // Empty array
    true,                // Boolean data type
    new Date(),          // Date object
    () => {},            // Function
    Number.MAX_SAFE_INTEGER + 1, // A number beyond safe integer limits
    -Number.MAX_SAFE_INTEGER - 1, // Negative beyond safe integer limits
    '',                  // Empty string
    '   ',               // String with just spaces
    '1a',                // String with letters and numbers
    '-5',                // Negative string number
    '3.14',              // String representation of a float
    'Infinity',          // String of infinity
    '-Infinity',         // String of negative infinity
    'NaN',               // String of NaN
];

export const ValidDatabaseIdList = [
    1,
    2,
    3,
    4,
    100,
    500,
    1000,
    99999,
    1234567890,
    Number.MAX_SAFE_INTEGER - 10, // A number close to the max safe integer
    0,                            // Zero could be considered valid in some systems
    '1',                          // String representation
    '2',
    '3',
    '1000',
    '1234567890',
    '10',                          // Leading zeros might be valid but could be a potential mistake
    '0010',
    '00000000000123',
];

export const ValidNumbersList = [
    123.456,
    1000,
    Math.PI,
    0,
    -123.456,
    1e+308,              // Maximum float
    -1e+308,             // Minimum float
    Number.MAX_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    0.0000000001,        // Very small number
    -0.0000000001,       // Negative very small number
    1e-308,              // Minimum positive floatz
    -1e-308,             // Minimum negative float
    Math.sqrt(2),        // Square root of 2
    Math.sqrt(3),        // Square root of 3
    Math.E,              // Euler's number
    -Math.E,             // Negative Euler's number
];


```

## /Users/bort/code/crude-cards/src/test/constant/String.ts

```typescript
export const StringsList = [
    'Escaped characters: \\' + '"\\n\\r\\t\\b\\f\\u2028\\u2029\\' + '\'',
    'String with special characters: $%^&*()_+-=[]{}|;:,.<>?/~',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    '日本語の文字列', // Japanese characters
    'Español es un idioma hermoso', // Spanish string
    'Plain String',
    'AnotherStringWithoutSpaces',
    'This is a very very very long string just to test the boundaries of what might be considered a normal string in this context.',
];

export const StringsInvalidList = [
    new WeakMap(),
    new WeakSet(),
    { object : 'This is not a string.' },
    ['This', 'is', 'an', 'array', 'not', 'a', 'string'],
    12345,
    null,
    undefined,
    Symbol('not a string'),
];

export const SpecialCharactersList = [
    '😀',
    '🙏',
    '🚀',  // Rocket emoji
    '🎉',  // Tada emoji
    '💻',  // Computer emoji
    '✨',  // Sparkles emoji
];

export const ValidNotObjectStringList = [
    'imma string',
    'hello',
    'null',
    '123',
    'I am not an object',
    'Neither am I',
    'Just another string',
    'True, False, Undefined',
];

export const UnconvertableToStringList = [
    () => {},
    function namedFunc() {},
    new Map([['a', 1], ['b', 2]]),
    new Set([1, 2, 3]),
    Symbol('unconvertable'),
];

```

## /Users/bort/code/crude-cards/src/test/constant/Unserializable.ts

```typescript
export const UnserializableList = [
    () => {},
    function namedFunc() {},
];

```

## /Users/bort/code/crude-cards/src/test/type.ts

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */


export interface ValidInvalid<T> {
    Valid   : {
        Value : T;
        List : T[];
    }
    Invalid : {
        Value : any;
        List : any[];
    }
}

export interface ValidInvalidDate extends ValidInvalid<Date> {
    Valid : {
        Value : Date,
        List  : Date[],

        EdgeCasesList : any[],
        InFutureList  : any[],
        InPastList    : any[],
    },
    Invalid : {
        StringList : any[];
        Value      : any;
        List       : any[],
    },
}


export interface ValidInvalidBoolean extends ValidInvalid<boolean> {
    Valid : {
        Value : boolean,
        List  : boolean[],
    },
    Invalid : {
        Value : any;
        List  : any[],
    },
}

export interface ValidInvalidJson extends ValidInvalid<string> {
    Valid : {
        Value : string,
        List  : string[],
    },
    Invalid : {
        Value      : any;
        List       : any[],
    },
}

export interface ValidInvalidString extends ValidInvalid<string> {
    Valid : {
        NotObjectStringList : string[];
        Value : string;
        Empty : string;
        List  : string[];
    }

    Invalid : {
        ThatAreNotObjectStringList : any[];
        UnconvertableToStringList  : any[];
        NumberStringList           : any[];
        Value                      : any;
        List                       : any[];
    };
}
export interface ValidInvalidNumber extends ValidInvalid<number> {
    Valid : {
        Value : number;
        List  : number[],

        BoundaryValueList : any[];
        DatabaseIdList    : any[];
        UncommonList      : any[];
        IntegerList       : any[];
        DatabaseId        : any;
    },
    Invalid : {
        BoundaryValueList : any[];
        DatabaseIdList    : any[];
        Value             : any;
        List              : any[],
    },
}
export interface MockDataHierarchy {
    Undefined  : undefined;
    Null       : null;

    SpecialCharacterList : string[];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    UnserializableList   : Function[];
    Boolean              : ValidInvalidBoolean;
    Number               : ValidInvalidNumber;
    String               : ValidInvalidString;
    Date                 : ValidInvalidDate;
    JSON                 : ValidInvalidJson;

    Service : {
        TestHash : string;
    },

    Misc : {
        Value : string;

        CircularReference : {
            Name : string;
            Self : any; // This is a circular reference
        };
    };
}

/* eslint-enable @typescript-eslint/no-explicit-any */

```

## /Users/bort/code/crude-cards/src/type/CoreHash.tsx

```typescript
export type CoreHash = string | null;

```

## /Users/bort/code/crude-cards/src/type/CoreId.ts

```typescript
export type CoreId = number | null;

```

## /Users/bort/code/crude-cards/src/type/framework/core/AppContextModel.tsx

```typescript
import { ColorTheme } from '@app/constant/framework/ColorTheme';
import { ScreenSize } from '@app/constant/framework/ScreenSize';
import { NetworkStatus } from './NetworkStatus';
import { OS } from '@mantine/hooks';


export interface AppContextModel {
    isDebugging : boolean;

    screenSize       : ScreenSize;
    colorTheme       : ColorTheme;

    isDesktop : boolean;
    isMobile  : boolean;
    isTablet  : boolean;
    isPhone   : boolean;

    tabVisibility   : DocumentVisibilityState;
    isReducedMotion : boolean;
    isIdle          : boolean;

    networkStatus : NetworkStatus;
    os            : OS;
}

```

## /Users/bort/code/crude-cards/src/type/framework/core/CoreAppRoot.tsx

```typescript
import { GamePopupType } from '../../../api/src/constant/game-popup-type.enum';
import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { TimerType } from '../../../api/src/type';


export interface CoreAppRoot {
    game : {
        previousHandDealerCardId : string | null;
        previousHandWinnerCardId : string | null;

        popupType : GamePopupType | null;
        gameState : Omit<GameStateDTO, 'player_list' | 'current_player'>;

        playerLookup : { [key : string] : PlayerDTO }
        cardDeck     : { [key : string] : CardDTO   };

        timer : {
            timerType : TimerType | null;
            timeLeft  : number;
        };
    }
}

```

## /Users/bort/code/crude-cards/src/type/framework/core/CoreSaga.tsx

```typescript
export type CoreSaga<T = unknown | void> = Generator<unknown, T>;
export type Saga<T = void> = CoreSaga<T>;

```

## /Users/bort/code/crude-cards/src/type/framework/core/NetworkStatus.tsx

```typescript
export interface NetworkStatus {
    effectiveType ?: 'slow-2g' | '2g' | '3g' | '4g';
    downlinkMax   ?: number;
    downlink      ?: number;
    saveData      ?: boolean;
    online         : boolean;
    type          ?: 'bluetooth' | 'cellular' | 'ethernet' | 'wifi' | 'wimax' | 'none' | 'other' | 'unknown';
    rtt           ?: number;
}

```

## /Users/bort/code/crude-cards/src/type/framework/data/Optional.tsx

```typescript
export type Optional<T> = {
    [P in keyof T] ?: T[P]
};

export  type O<T> = Optional<T>;

```

## /Users/bort/code/crude-cards/src/type/framework/data/P.ts

```typescript
export type P<T = void> = Promise<T>;

```

## /Users/bort/code/crude-cards/src/type/framework/template/CustomPageProps.tsx

```typescript
import { AppProps } from 'next/app';


export interface CustomPageProps extends AppProps {
    // eslint-disable-next-line deprecation/deprecation
    pageProps : JSX.Element;
}

```

## /Users/bort/code/crude-cards/src/ui/AppContext.tsx

```typescript
import { AppContextModel } from '../type/framework/core/AppContextModel';
import { ColorTheme } from '@app/constant/framework/ColorTheme';
import { ScreenSize } from '../constant/framework/ScreenSize';
import { createContext } from 'react';


export const DefaultAppContext : AppContextModel = Object.freeze({

    isDebugging : false,

    screenSize : ScreenSize.Desktop,
    colorTheme : ColorTheme.Dark,

    isDesktop : true,
    isMobile  : false,
    isTablet  : false,
    isPhone   : false,

    isReducedMotion : false,
    tabVisibility   : 'visible',
    networkStatus   : { online : true },
    isIdle          : false,
    os              : 'undetermined',
} as const);

export const AppContext = createContext<AppContextModel>(DefaultAppContext);

// Shorthand
export const App = AppContext;

```

## /Users/bort/code/crude-cards/src/ui/UtilityUI.tsx

```typescript

import { ScreenSize } from '@app/constant/framework/ScreenSize';


const toDotDotDot = (
    possiblyLongString : string,
    maxLen             : number = 30,
) : string => {
    if (possiblyLongString.length > maxLen)
        return possiblyLongString.substring(0, maxLen) + '...';

    return possiblyLongString;
};


const toFormattedDate = (
    date : string | null | undefined,
) : string => {

    if(date === null || date === undefined)
        return 'Invalid Date';

    const dateObj = new Date(date);

    const formattedDate =  dateObj.toLocaleString('en-US', {
        day    : 'numeric',
        year   : 'numeric',
        month  : 'short',
        hour12 : true,
    });

    const formattedTime =  dateObj.toLocaleString('en-US', {
        minute : 'numeric',
        hour   : 'numeric',
        hour12 : true,
    })

    return `${formattedDate} at ${formattedTime}`;
}

const screenSizeCol = (
    screenSize : ScreenSize,
    phone      : number,
    tablet     : number,
    desktop    : number,
) : number => {
    switch (screenSize) {
        case ScreenSize.Desktop : return desktop;
        case ScreenSize.Tablet  : return tablet;
        case ScreenSize.Phone   : return phone;
    }
};

export const UtilityUI = {
    toFormattedDate,
    screenSizeCol,
    toDotDotDot,
};

```

## /Users/bort/code/crude-cards/src/ui/__tests__/toFormattedDate.spec.tsx

```typescript
import { UtilityUI } from '@app/ui/UtilityUI';


describe('toFormattedDate', () => {
    it('should return formatted date when valid ISO date string is passed', () => {
        const date = '2024-03-05T23:41:24.902Z';

        const result = UtilityUI.toFormattedDate(date);

        expect(result).toBe('Mar 5, 2024 at 11:41 PM');
    });

    it('should return formatted date for a different valid ISO date string', () => {
        const date = '2022-12-31T12:59:59.999Z';

        const result = UtilityUI.toFormattedDate(date);

        expect(result).toBe('Dec 31, 2022 at 12:59 PM');
    });
});

```

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

## /Users/bort/code/crude-cards/src/ui/page/site/PageGame/PageGame.stories.tsx

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PageGame } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title      : 'Game/PageGame',
    component  : PageGame,
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
} satisfies Meta<typeof PageGame>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args : {
    },
};

```

## /Users/bort/code/crude-cards/src/ui/page/site/PageGame/index.tsx

```typescript
import { GameBoard } from '@app/ui/game/GameBoard';
import { RFC } from '@app/ui/type';

export const PageGame : RFC = () =>
    <GameBoard id='board-id-alpha' />


```

## /Users/bort/code/crude-cards/src/ui/type.tsx

```typescript
import { GetServerSideProps, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react';


export type CorePropsWithChildren<T = unknown> = T & React.PropsWithChildren;
export type CoreProps<T = unknown> = Omit<CorePropsWithChildren<T>, 'children'>;
export type RFC<T = unknown> = React.FC<T>;
export type SSR<
    PR  extends {
        [key : string] : unknown;
    },
    PQ  extends ParsedUrlQuery = ParsedUrlQuery,
    PRE extends PreviewData    = PreviewData> =
    GetServerSideProps<PR, PQ, PRE>;

export type RE = ReactElement;

```

