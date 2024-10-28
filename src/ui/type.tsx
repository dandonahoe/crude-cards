import { GamePopupType } from '../api/src/constant/game-popup-type.enum';
import { GameStateFrontEndDTO } from '../type/framework/core/GameState';
import { PlayerDTO } from '../api/src/game/dtos/player.dto';
import { CardDTO } from '../api/src/game/dtos/card.dto';
import { GetServerSideProps, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react';


export interface GameBoardContextType {
    dealerDealtCard : CardDTO   | null;
    playerDealtCard : CardDTO   | null;
    currentPlayer   : PlayerDTO | null;
    headerHeight    : number;
    gameStateDTO    : GameStateFrontEndDTO;
    playerCards     : CardDTO[];
    dealerCards     : CardDTO[];
    isDealer        : boolean;
}

export interface TemplateContextType {
    popupType : GamePopupType;
}

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
