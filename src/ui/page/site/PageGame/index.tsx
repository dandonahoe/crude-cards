import { GameTemplate } from '@app/ui/game/GameTemplate';
import { GameBoard } from '@app/ui/game/GameBoard';
import { RFC } from '@app/ui/type';

export const PageGame : RFC = () =>
    <GameTemplate appId='app-alpha'>
        <GameBoard />
    </GameTemplate>
