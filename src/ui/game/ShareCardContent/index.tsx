import { Stack, Text, Tooltip, rem } from '@mantine/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import { GameContext } from '../GameContext';
import { useContext, useState } from 'react';
import { useTimeout } from '@mantine/hooks';
import { GameShare } from '../GameShare';
import { RFC } from '@app/ui/type';


export const ShareCardContent: RFC = () => {

    const { gameState } = useContext(GameContext);

    const [isCopied, setCopied] = useState(false);

    const { start } = useTimeout(() => setCopied(false), 3000);

    const handleCopy = () => {
        setCopied(true);
        start();
    };

    return (
        <>
            <Text
                ta='center'
                fw={600}
                mt='xl'>
                {'Share Game Code'}
            </Text>
            <Stack
                justify='center'
                align='center'>
                <CopyToClipboard
                    text={gameState.game_code!}
                    onCopy={handleCopy}>
                    <Tooltip
                        label='Copied'
                        opened={isCopied}
                        position='bottom'
                        offset={0}>
                        <Text
                            ta='center'
                            fw={600}
                            fz={rem(80)}>
                            {gameState.game_code}
                        </Text>
                    </Tooltip>
                </CopyToClipboard>
                <Text fz='xs'>
                    {'Share With Friends to Join Game'}
                </Text>

                <GameShare />
            </Stack>
        </>
    );
}

