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
