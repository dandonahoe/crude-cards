import { GameAction } from '../../../client/action/game';
import { CA } from '../../../constant/framework/CoreAction';
import { Flex, Modal, Text, rem } from '@mantine/core';
import { GameScoreboard } from '../GameScoreboard';
import { useDispatch } from '@app/client/hook';
import { GameSettings } from '../GameSettings';
import { GameFeedback } from '../GameFeedback';
import { ReactNode, useContext } from 'react';
import { GameContext } from '../GameContext';
import { GameError } from '../GameError';
import { GameQuit } from '../GameQuit';
import { RFC } from '@app/ui/type';
import { GamePopupType } from '../../../api/src/constant/game-popup-type.enum';


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
        case GamePopupType.Settings:   popup = <GameSettings   />; break;
        case GamePopupType.Quit:       popup = <GameQuit       />; break;

        default: popup = <GameError />; break;
    }

    return (
        <Modal
            onClose={handleClosePopup}
            withCloseButton={true}
            radius={rem(40)}
            centered={true}
            opened={true}
            size='lg'
            overlayProps={{
                backgroundOpacity : 0.10,
                blur              : 5,
            }}
            title={
                <Text
                    fw={600}
                    fz='md'
                    p='md'>
                    {popupTypeId}
                </Text>
            }>
            <Flex
                p='xl'
                justify='center'>
                {popup}
            </Flex >
        </Modal>
    );
}

