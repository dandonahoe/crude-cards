import { CustomPageProps } from '../type/framework/template/CustomPageProps';
import { Notifications } from '@mantine/notifications';
import { AppProvider } from '@app/client/AppProvider';
import { useReportWebVitals } from 'next/web-vitals';
import { AppScript } from './AppContent/AppScript';
import { MantineProvider } from '@mantine/core';
import { AppTheme } from '@app/client/AppTheme';
import '@mantine/code-highlight/styles.css';
import { useEffect, useState } from 'react';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import { RFC } from '@app/ui/type';
import '@mantine/core/styles.css';
import Cookies from 'js-cookie';
import { GameTemplate } from '../ui/game/GameTemplate/index';


const App : RFC<CustomPageProps> = ({
    Component, pageProps,
}) => {

    useReportWebVitals(metric => {
        console.log(`Web Vitals - ${metric}`, {
            metric,
        })
    })

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        if (isInitialLoad) {
            // Perform actions on initial load
            Cookies.remove('AuthToken');

            // Set the state to false after performing the initial load actions
            setIsInitialLoad(false);
        }
    }, [isInitialLoad]);

    return (
        <AppProvider>
            <AppScript />
            <MantineProvider theme={AppTheme} >
                <Notifications />
                <GameTemplate appId='app-alpha'>
                    <Component {...pageProps} />
                </GameTemplate>
            </MantineProvider>
        </AppProvider>
    );
}


// eslint-disable-next-line import/no-default-export
export default App;
