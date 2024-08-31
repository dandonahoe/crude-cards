import { GamePopupType } from '../../../api/src/constant/game-popup-type.enum';
import { CA } from '../../../constant/framework/CoreAction';
import { GameAction } from '../../../client/action/game';
import { GameScoreboard } from '../GameScoreboard';
import { Flex, Modal, rem } from '@mantine/core';
import { useDispatch } from '@app/client/hook';
import { GameFeedback } from '../GameFeedback';
import { ReactNode, useContext } from 'react';
import { GameContext } from '../GameContext';
import { GameError } from '../GameError';
import { GameQuit } from '../GameQuit';
import { RFC } from '@app/ui/type';


export const GamePopup : RFC= () => {

    const { popupTypeId } = useContext(GameContext);
    const dispatch = useDispatch();

    if(!popupTypeId) return null;

    const handleClosePopup = () : CA =>
        dispatch(GameAction.closePopup());

    let popup : ReactNode | null = null;

    switch(popupTypeId) {

        case GamePopupType.Scoreboard: popup = <GameScoreboard />; break;
        case GamePopupType.Feedback:   popup = <GameFeedback   />; break;
        case GamePopupType.Leave:      popup = <GameQuit       />; break;

        default: popup = <GameError />; break;
    }

    return (
        <Modal
            onClose={handleClosePopup}
            withCloseButton={true}
            radius={rem(40)}
            centered={true}

            opened={true}
            size='sm'
            overlayProps={{
                backgroundOpacity : 0.12,
                blur              : 5,
            }}>
            <Flex
                p='xl'
                justify='center'>
                {popup}
            </Flex >
        </Modal>
    );
}

