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
