import { P } from '@app/type/framework/data/P';


const signOut = async () : P<unknown> =>
    await window.Clerk.signOut();

const redirect = async (targetUrl : string) : P<void> => {
    window.location.href = targetUrl;
};

export const Browser = {
    redirect,
    signOut,
};
