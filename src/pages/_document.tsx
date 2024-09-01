import { NextScript, Html, Main, Head } from 'next/document';
import { ColorSchemeScript } from '@mantine/core';
import { AppHeadGame } from './AppContent/AppHeadGame';


// eslint-disable-next-line import/no-default-export
export default function Document() : React.JSX.Element {
    return (
        <Html lang='en'>
            <Head>
                <AppHeadGame />
                <ColorSchemeScript defaultColorScheme='dark' />
            </Head>
            <body
                style={{
                    backgroundColor : '#000',
                }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
