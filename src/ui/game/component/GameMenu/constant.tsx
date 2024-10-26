import { GamePopupType } from '../../../../api/src/constant/game-popup-type.enum';
import { IconDoorExit, IconMail, IconScoreboard } from '@tabler/icons-react';
import { rem } from '@mantine/core';


const GameMenuIconStyle = {
    height : rem(28),
    width  : rem(28),
};

export const MenuItems = [{
    icon : <IconScoreboard style={GameMenuIconStyle} />,
    text : 'Scoreboard',
    id   : GamePopupType.Scoreboard,
}, {
    icon : <IconMail style={GameMenuIconStyle} />,
    text : 'Feedback',
    id   : GamePopupType.Feedback,
}, {
    icon : <IconMail style={GameMenuIconStyle} />,
    text : 'Developers',
    id   : GamePopupType.Settings,
}, {
    icon : <IconDoorExit style={GameMenuIconStyle} />,
    text : 'Leave',
    id   : GamePopupType.Leave,
}];
