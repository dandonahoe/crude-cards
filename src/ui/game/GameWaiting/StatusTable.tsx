import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardContainer } from '../GameCardContainer';
import { GameStatusTable } from '../GameStatusTable';
import { StatusTableProps } from './type';
import { RFC } from '@app/ui/type';


export const StatusTable: RFC<StatusTableProps> = ({
    playerStatusList,
}) => (
    <GameCardContainer color={CardColor.Black}>
        <GameStatusTable
            playerStatusList={playerStatusList}
            shouldShowScore={false}
            shouldShowDone={true}
            title='Waiting on Players'/>
    </GameCardContainer>
);
