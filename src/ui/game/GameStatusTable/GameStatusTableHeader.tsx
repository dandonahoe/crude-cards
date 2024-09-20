import { GameStatusTableHeaderProps } from './type';
import { GameText } from '../GameText';
import { Table } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameStatusTableHeader: RFC<GameStatusTableHeaderProps> = ({
  shouldShowDone, shouldShowScore,
}) =>
    <Table.Thead>
        <Table.Tr>
            <Table.Th>
                <GameText>
                    {'Player'}
                </GameText>
            </Table.Th>
            {shouldShowDone &&
                <Table.Th>
                    <GameText>
                        {'Done?'}
                    </GameText>
                </Table.Th>}
            {shouldShowScore &&
                <Table.Th>
                    <GameText>
                        {'Score'}
                    </GameText>
                </Table.Th>}
        </Table.Tr>
    </Table.Thead>;
