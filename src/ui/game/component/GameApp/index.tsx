import { GameTemplate } from '../../template/GameTemplate/index';
import { AppProvider } from '../../../../client/AppProvider';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameApp : RFC<Props> = ({
    id, children,
}) =>
    <AppProvider>
        <GameTemplate appId={id}>
            {children}
        </GameTemplate>
    </AppProvider>
