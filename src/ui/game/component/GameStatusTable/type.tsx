import { PlayerStatus } from '../../type'

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
    title ?: string
}
