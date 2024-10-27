
import { TemplateContextType } from './type';
import { createContext } from 'react';
// import { GamePopupType } from '../../api/src/constant/game-popup-type.enum';
import { GamePopupType } from '../../../api/src/constant/game-popup-type.enum';


export const TemlateContext = createContext<TemplateContextType>({
    popupType : GamePopupType.Closed,
});
