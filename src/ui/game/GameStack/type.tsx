import { ReactNode } from "react";

export interface Props {
    type     ?: GameStackType; // Use GameStackType for predefined layouts
    children  : ReactNode;
}


export enum GameStackType {
    FullHeightCentered = 'FullHeightCentered',
    Centered           = 'Centered',
    Default            = 'Default',
    Roomy              = 'Roomy',
}
