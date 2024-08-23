

const get = <T = string,>(_name : string) : T => {

    return 'gpt-4-0125-preview' as T;

    // return 'gpt-4' as T;
    // return 'gpt-4-1106-preview' as T;
};


export const Setting = {
    get,
};
