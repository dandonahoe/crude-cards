import { GameTextSmall, GameTextTitle } from '../GameText';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ShareCardTooltip } from './ShareCardTooltip';
import { GameStackType } from '../GameStack/type';
import { GameContext } from '../../GameContext';
import { GameStack } from '../GameStack/index';
import { useContext, useState } from 'react';
import { useTimeout } from '@mantine/hooks';
import { GameShare } from '../GameShare';


export const ShareCardContent = () => {

    const { gameState } = useContext(GameContext);

    const [isCopied, setCopied] = useState(false);

    const { start } = useTimeout(() => setCopied(false), 3000);

    const handleCopy = () => {
        setCopied(true);
        start();
    };

    return (
        <GameStack>
            <GameTextTitle>
                {'Share Game Code'}
            </GameTextTitle>
            <GameStack type={GameStackType.Centered}>
                <CopyToClipboard
                    text={gameState.game_code!}
                    onCopy={handleCopy}>
                    <ShareCardTooltip
                        gameState={gameState}
                        isCopied={isCopied} />
                </CopyToClipboard>
                <GameTextSmall>
                    {'Share With Friends to Join Game'}
                </GameTextSmall>
                <GameShare />
            </GameStack>
        </GameStack>
    );
}

