import classes from './GameStatusTable.module.css';
import { GameStackType } from '../GameStack/type';
import { GameStatusTableRowProps } from './type';
import { IconCheck } from '@tabler/icons-react';
import { GameText } from '../GameText/index';
import { Table, Text } from '@mantine/core';
import { GameTextNeon } from '../GameText';
import { GameStack } from '../GameStack';
import { RFC } from '@app/ui/type';


export const GameStatusTableRow: RFC<GameStatusTableRowProps> = ({
  playerStatus, shouldShowDone, shouldShowScore, textColor,
}) =>
    <Table.Tr>
        <Table.Td>
            <Text
                className={playerStatus.isWinner ? classes.neonText : ''}
                fz={playerStatus.isWinner ? 'sm' : 'xs'}
                fw={playerStatus.isWinner ? 600 : 400}
                c={textColor}>
                {playerStatus.player.username}
            </Text>
        </Table.Td>
        {shouldShowDone &&
            <Table.Td>

                {playerStatus.isDone &&
                    <GameText>
                        <IconCheck className={classes.doneIcon} />
                    </GameText>
                    }

            </Table.Td>
        }
        {shouldShowScore &&
            <Table.Td>
                <GameStack type={GameStackType.Centered}>
                    {playerStatus.isWinner &&
                        <GameTextNeon>
                            {"+1 point"}
                        </GameTextNeon>
                    }
                    <Text
                        fw={playerStatus.isWinner ? 600 : 400}
                        c={textColor}
                        className={playerStatus.isWinner ? classes.neonText : ''}
                        ta='center'>
                        {playerStatus.score}
                    </Text>
                </GameStack>
            </Table.Td>
    }
    </Table.Tr>

