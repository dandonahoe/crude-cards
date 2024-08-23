import { CardColor } from '../../../api/src/constant/card-color.enum';
import classes from './GameStatusTable.module.css';
import { Group, Table, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameStatusTable : RFC<Props> = ({
    playerStatusList, title, shouldShowScore,
    shouldShowDone, textColor = CardColor.White,
}) => {
    return (
        <>
            {title &&
                <Text
                    ta='center'
                    fw={600}
                    mb='xl'
                    fz='md'>
                    {title}
                </Text>
            }
            <Table
                verticalSpacing='xs'
                p={0}
                m={0}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            <Text
                                fw={600}
                                fz='xs'>
                                {'Player'}
                            </Text>
                        </Table.Th>
                        {shouldShowDone &&
                            <Table.Th>
                                <Text
                                    fw={600}
                                    ta='center'
                                    fz='xs'>
                                    {'Done?'}
                                </Text>
                            </Table.Th>
                        }
                        {shouldShowScore &&
                            <Table.Th>
                                <Text
                                    fw={600}
                                    ta='center'
                                    fz='xs'>
                                    {'Score'}
                                </Text>
                            </Table.Th>
                        }
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {playerStatusList.map(({
                        isDone, isWinner, player, score,
                    }, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>
                                <Text
                                    c={textColor}
                                    fz={isWinner ? 'sm' : 'xs'}
                                    fw={isWinner ? 600 : 400}
                                    className={isWinner ? classes.neonText : ''}>
                                    {player.username}
                                </Text>
                            </Table.Td>
                            {shouldShowDone &&
                                <Table.Td>
                                    <Text ta='center'>
                                        {isDone &&
                                            <IconCheck
                                                size={40}
                                                stroke={4} />
                                        }
                                    </Text>
                                </Table.Td>
                            }
                            {shouldShowScore &&
                                <Table.Td>
                                    <Group
                                        align='center'
                                        justify='center'>
                                        {isWinner &&
                                            <Text
                                                fz='xs'
                                                fw={600}
                                                className={classes.neonText}>
                                                {'+1 point'}
                                            </Text>
                                        }
                                        <Text
                                            fw={isWinner ? 600 : 400}
                                            className={isWinner ? classes.neonText : ''}
                                            ta='center'>
                                            {score}
                                        </Text>
                                    </Group>
                                </Table.Td>
                            }
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </>
    );
}

