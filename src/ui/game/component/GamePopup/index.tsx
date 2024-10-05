import { GameAction } from '../../../../client/action/game.action';
import { useDispatch } from '@app/client/hook';
import { GameContext } from '../../GameContext';
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
