import { AppProps } from 'next/app';


export interface CustomPageProps extends AppProps {
    // eslint-disable-next-line deprecation/deprecation
    pageProps : JSX.Element;
}
