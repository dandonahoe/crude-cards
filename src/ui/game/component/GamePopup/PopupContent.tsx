import { GamePopupType } from '../../../../api/src/constant/game-popup-type.enum';
import { GameScoreboard } from '../GameScoreboard';
import { GameFeedback } from '../GameFeedback';
import { PopupContentProps } from './type';
import { GameError } from '../GameError';
import { GameQuit } from '../GameQuit';
import { RFC } from '@app/ui/type';


export const PopupContent: RFC<PopupContentProps> = ({
    popupType,
}) => {

    switch (popupType) {

        case GamePopupType.Scoreboard : return <GameScoreboard />;
        case GamePopupType.Feedback   : return <GameFeedback   />;
        case GamePopupType.Leave      : return <GameQuit       />;

        default: return <GameError />;
    }
};
