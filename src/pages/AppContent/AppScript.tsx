import { RFC } from '@app/ui/type';
import Script from 'next/script';
import { Env } from '@app/Env';


const googleAnalyticsId = Env.getValue<string>('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID');


export const AppScript : RFC = () =>
    <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}/>
        <Script
            strategy='afterInteractive'
            id='google-analytics'
            dangerouslySetInnerHTML={{
                __html : `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${googleAnalyticsId}');
                `.trim(),
            }} />
    </>


// eslint-disable-next-line import/no-default-export
export default AppScript;
