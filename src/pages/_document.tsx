import { NextScript, Html, Main, Head } from 'next/document';
import { AppHeadGame } from './AppContent/AppHeadGame';
import { ColorSchemeScript } from '@mantine/core';


// eslint-disable-next-line import/no-default-export
export default function Document() : React.JSX.Element {
    return (
        <Html lang='en'>
            <Head>
                <AppHeadGame />
                <ColorSchemeScript defaultColorScheme='dark' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
