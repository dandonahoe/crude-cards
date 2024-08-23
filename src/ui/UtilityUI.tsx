
import { ScreenSize } from '@app/constant/framework/ScreenSize';


const toDotDotDot = (
    possiblyLongString : string,
    maxLen             : number = 30,
) : string => {
    if (possiblyLongString.length > maxLen)
        return possiblyLongString.substring(0, maxLen) + '...';

    return possiblyLongString;
};


const toFormattedDate = (
    date : string | null | undefined,
) : string => {

    if(date === null || date === undefined)
        return 'Invalid Date';

    const dateObj = new Date(date);

    const formattedDate =  dateObj.toLocaleString('en-US', {
        day    : 'numeric',
        year   : 'numeric',
        month  : 'short',
        hour12 : true,
    });

    const formattedTime =  dateObj.toLocaleString('en-US', {
        minute : 'numeric',
        hour   : 'numeric',
        hour12 : true,
    })

    return `${formattedDate} at ${formattedTime}`;
}

const screenSizeCol = (
    screenSize : ScreenSize,
    phone      : number,
    tablet     : number,
    desktop    : number,
) : number => {
    switch (screenSize) {
        case ScreenSize.Desktop : return desktop;
        case ScreenSize.Tablet  : return tablet;
        case ScreenSize.Phone   : return phone;
    }
};

export const UtilityUI = {
    toFormattedDate,
    screenSizeCol,
    toDotDotDot,
};
