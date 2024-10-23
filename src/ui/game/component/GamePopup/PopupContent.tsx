import { GamePopupType } from '../../../../api/src/constant/game-popup-type.enum';
import { GameScoreboard } from '../GameScoreboard';
import { GameFeedback } from '../GameFeedback';
import { PopupContentProps } from './type';
import { GameError } from '../GameError';
import { GameQuit } from '../GameQuit';
import { GameDev } from '../GameDev';
import { RFC } from '@app/ui/type';


export const PopupContent: RFC<PopupContentProps> = ({
    popupType,
}) => {

    switch (popupType) {

        case GamePopupType.Scoreboard : return <GameScoreboard />;
        case GamePopupType.Feedback   : return <GameFeedback   />;
        case GamePopupType.Leave      : return <GameQuit       />;
        case GamePopupType.Settings   : return <GameDev   />;


        default: return <GameError />;
    }
};
