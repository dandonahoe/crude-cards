import { CustomPageProps } from '../type/framework/template/CustomPageProps';
import { GameTemplate } from '../ui/game/GameTemplate/index';

import { AppProvider } from '@app/client/AppProvider';
import { AppScript } from './AppContent/AppScript';
import '@mantine/code-highlight/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import { RFC } from '@app/ui/type';
import '@mantine/core/styles.css';


const App : RFC<CustomPageProps> = ({
    Component, pageProps,
}) =>
    <AppProvider>
        <AppScript />
        <GameTemplate appId='game'>
            <Component {...pageProps} />
        </GameTemplate>
    </AppProvider>


// eslint-disable-next-line import/no-default-export
export default App;
