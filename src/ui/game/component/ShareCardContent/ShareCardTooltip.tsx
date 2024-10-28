import { ShareCardTooltipProps } from './type';
import { GameTextTitle } from "../GameText"
import { Tooltip } from "@mantine/core"
import { RFC } from '../../../type';

export const ShareCardTooltip : RFC<ShareCardTooltipProps> = ({
    gameStateDTO, isCopied,
}) =>
    <Tooltip
        label={`Copied "${gameStateDTO.game_code}"`}
        opened={isCopied}
        position='bottom'
        offset={0}>
        <GameTextTitle>
            {gameStateDTO.game_code}
        </GameTextTitle>
    </Tooltip>
