if(!process.env.NODE_ENV)
    throw new Error('NODE_ENV not set, bailing. Thanks, bye.');


const toStringOrExplode = (value : unknown, context : string = '') : string => {

    if (typeof value === 'string')
        return value.trim();

    throw new Error(`Invalid string value: ${value} context (${context})`);
}

// create dedicated function to get value from environment variables


const getValue = <T = string,>(name : string) : T => {

    let value : T | null = null;

    // build injected variables (NEXT_PUBLIC_*) must be looked
    // up via dot notation because of webpack things, don't try to make it look normal,
    // it won't work. Since they're all stored the same way and treated equally as regular build time variables,
    // we push this logic down here to keep it from having to repeat logic outside of this function.

    /* eslint-disable max-len */

    switch (name) {

        //  string Values
        case 'NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN' : return toStringOrExplode(process.env.NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN, 'NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN')as unknown as T;
        case 'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'            : return toStringOrExplode(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,            'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'           )as unknown as T;
        case 'NEXT_PUBLIC_APP_ID'                         : return toStringOrExplode(process.env.NEXT_PUBLIC_APP_ID,                         'NEXT_PUBLIC_APP_ID'                        )as unknown as T;


        case 'NEXT_PUBLIC_NEXT_COUNTDOWN_TIMER_DURATION_SECONDS' : return toStringOrExplode(process.env.NEXT_PUBLIC_NEXT_COUNTDOWN_TIMER_DURATION_SECONDS, 'NEXT_PUBLIC_NEXT_COUNTDOWN_TIMER_DURATION_SECONDS')as unknown as T;

        case 'NEXT_GOOGLE_GEMINI_API_KEY' : return toStringOrExplode(process.env.NEXT_GOOGLE_GEMINI_API_KEY, 'NEXT_GOOGLE_GEMINI_API_KEY') as unknown as T;
        case 'NEXT_PUBLIC_PUSHER_CLUSTER' : return toStringOrExplode(process.env.NEXT_PUBLIC_PUSHER_CLUSTER, 'NEXT_PUBLIC_PUSHER_CLUSTER') as unknown as T;
        case 'NEXT_PUBLIC_PUSHER_KEY'     : return toStringOrExplode(process.env.NEXT_PUBLIC_PUSHER_KEY,     'NEXT_PUBLIC_PUSHER_KEY'    ) as unknown as T;
        case 'NEXT_PUSHER_APP_ID'         : return toStringOrExplode(process.env.NEXT_PUSHER_APP_ID,         'NEXT_PUSHER_APP_ID'        ) as unknown as T;
        case 'NEXT_PUSHER_SECRET'         : return toStringOrExplode(process.env.NEXT_PUSHER_SECRET,         'NEXT_PUSHER_SECRET'        ) as unknown as T;

        case 'NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE' : return toStringOrExplode(process.env.NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE, 'NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE')as unknown as T;
        case 'NEXT_PUBLIC_WEB_SOCKET_HOST_ORIGIN'   : return toStringOrExplode(process.env.NEXT_PUBLIC_WEB_SOCKET_HOST_ORIGIN,   'NEXT_PUBLIC_WEB_SOCKET_HOST_ORIGIN' ) as T;


        default: value = process.env[name] as T;
    }

    /* eslint-enable max-len */

    if (!value)
        console.log('Unable to find value for', name);

    return value as T;
};

const getNumber = (name : string) : number =>
    parseInt(getValue(name));

const getBoolean = (name : string) : boolean =>
    getValue(name) === 'true';

const getArray = (name : string) : string[] =>
    getValue(name).split(',');

const getObject = (name : string) : Record<string, unknown> =>
    JSON.parse(getValue(name));

export const getSubdomain = () : string | null => {
    const parts = window.location.hostname.split('.');

    if (parts.length > 2)
        return parts[0].toLowerCase().trim();
    else
        return null;
}


const getHttpProtocol =  () : 'http' | 'https' =>
    process.env.NODE_ENV === 'production' ? 'https' : 'http';

const isDevelopment = () : boolean => process.env.NODE_ENV === 'development';
const isProduction  = () : boolean => process.env.NODE_ENV === 'production';
const isClient      = () : boolean => typeof window !== 'undefined';
const isServer      = () : boolean => !isClient();
const isTest        = () : boolean => process.env.NODE_ENV === 'test';
const isBuilding    = () : boolean => process.env.IS_BUILDING ? true : false;


export const Env = {
    getHttpProtocol,
    isDevelopment,
    isProduction,
    getSubdomain,
    isBuilding,
    getBoolean,
    getNumber,
    getObject,
    getValue,
    isClient,
    isServer,
    getArray,
    isTest,
};
