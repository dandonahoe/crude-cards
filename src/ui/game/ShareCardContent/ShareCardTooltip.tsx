import { ShareCardTooltipProps } from './type';
import { GameTextTitle } from "../GameText"
import { Tooltip } from "@mantine/core"
import { RFC } from '../../type';

export const ShareCardTooltip : RFC<ShareCardTooltipProps> = ({
    gameState, isCopied,
}) =>
    <Tooltip
        label={`Copied "${gameState.game_code}"`}
        opened={isCopied}
        position='bottom'
        offset={0}>
        <GameTextTitle>
            {gameState.game_code}
        </GameTextTitle>
    </Tooltip>
