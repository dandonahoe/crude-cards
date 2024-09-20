import { GameStatusTableHeader } from './GameStatusTableHeader'
import { GameStatusTableTitle } from './GameStatusTableTitle'
import { GameStatusTableRow } from './GameStatusTableRow'
import classes from './GameStatusTable.module.css'
import { Table } from '@mantine/core'
import { RFC } from '@app/ui/type'
import { Props } from './type'


export const GameStatusTable: RFC<Props> = ({
  playerStatusList, title, shouldShowScore, shouldShowDone, textColor,
}) =>
    <>
        {title &&
            <GameStatusTableTitle title={title} />
        }
        <Table
            className={classes.tableContainer}
            verticalSpacing='xs'>
            <GameStatusTableHeader
                shouldShowScore={shouldShowScore}
                shouldShowDone={shouldShowDone} />
            <Table.Tbody>
                {playerStatusList.map((playerStatus, index) =>
                    <GameStatusTableRow
                        shouldShowScore={shouldShowScore}
                        shouldShowDone={shouldShowDone}
                        playerStatus={playerStatus}
                        textColor={textColor}
                        key={index} />,
        )}
            </Table.Tbody>
        </Table>
    </>

