import { GameStackType } from "./type";

const getLayoutProps = (stackType: GameStackType) => {
    switch (stackType) {

        case GameStackType.FullHeightCentered:
            return { justify : 'center',     align : 'center',  spacing : 'lg', h : '100vh' };

        case GameStackType.Centered          : return { justify : 'center',     align : 'center',  spacing : 'md' };
        case GameStackType.Default           : return { justify : 'flex-start', align : 'stretch', spacing : 'md' };
        case GameStackType.Roomy             : return { justify : 'flex-start', align : 'stretch', spacing : 'xl' };

        default: throw new Error(`Invalid GameStackType: ${stackType}`);
    }
};

export const GameStackLogic = {
    getLayoutProps,
};
