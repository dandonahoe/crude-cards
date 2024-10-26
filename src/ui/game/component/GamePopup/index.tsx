import { GamePopupType } from '../../../../api/src/constant/game-popup-type.enum';
import { GameAction } from '../../../../client/action/game.action';
import { GameContext } from '../../GameContext';
import { useDispatch } from '@app/client/hook';
import { PopupModal } from './PopupModal';
import { useContext } from 'react';

export const GamePopup = () => {

    const { popupType } = useContext(GameContext);
    const dispatch = useDispatch();

    if ([GamePopupType.Closed, GamePopupType.Unknown].includes(popupType!))
        return null;

    const handleClosePopup = () => dispatch(GameAction.closePopup());

    return (
        <PopupModal
            handleClosePopup={handleClosePopup}
            popupType={popupType} />
    );
};
