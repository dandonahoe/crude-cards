import { ReactNode } from "react";
import { GameStackType } from '../GameStack/type';

export interface Props {
    type     ?: GameStackType; // Use GameStackType for predefined layouts
    children  : ReactNode;
}
