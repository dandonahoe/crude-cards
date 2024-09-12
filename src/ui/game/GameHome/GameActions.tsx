import { GameButton } from '../GameButton';
import { RFC } from '@app/ui/type';

export const GameActions: RFC<{ onStartGame: () => void }> = ({ onStartGame }) => (
    <div>
        <GameButton onClick={onStartGame} text="Go" />
    </div>
);
