import { IconDoorExit, IconMail, IconScoreboard } from '@tabler/icons-react';
import { rem } from '@mantine/core';


export enum MenuItem {
    Scoreboard = 'Scoreboard',
    Settings   = 'Settings',
    Feedback   = 'Feedback',
    Unknown    = 'Unknown',
    Quit       = 'Quit',
}

const IconStyle = {
    height : rem(28),
    width  : rem(28),
};

export const MenuItems = [{
    icon : <IconScoreboard style={IconStyle} />,
    text : 'Scoreboard',
    id   : MenuItem.Scoreboard,
}, {
    icon : <IconMail style={IconStyle} />,
    text : 'Feedback',
    id   : MenuItem.Feedback,
}, {
    icon : <IconMail style={IconStyle} />,
    text : 'Developers',
    id   : MenuItem.Settings,
}, {
    icon : <IconDoorExit style={IconStyle} />,
    text : 'Quit',
    id   : MenuItem.Quit,
}];
