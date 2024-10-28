import { GamePopupType } from '../api/src/constant/game-popup-type.enum';
import { TemplateContextType } from './type';
import { createContext } from 'react';


export const TemplateContext = createContext<TemplateContextType>({
    popupType : GamePopupType.Closed,
});
