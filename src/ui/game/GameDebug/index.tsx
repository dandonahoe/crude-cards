import { useContext, ReactNode, useEffect, useState } from 'react';
import { Box, List, rem, Table, Tabs, Text } from '@mantine/core';
import { selectIsHost } from '../../../client/selector/game';
import { CookieType } from '../../../api/src/type';
import { useSelector } from '@app/client/hook';
import classes from './GameDebug.module.css';
import { GameContext } from '../GameContext';
import { RFC } from '@app/ui/type';
import Cookies from 'js-cookie';

export const GameDebug: RFC = () => {

    const handleOpenAdmin = (): void => { };

    const {
        gameState, isDealer, currentPlayer,
        dealerDealtCard, playerDealtCard,
    } = useContext(GameContext);

    const isHost = useSelector(selectIsHost);

    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const token = Cookies.get(CookieType.AuthToken);
        setAuthToken(token ?? null);
    }, []);

    const renderRow = (key: string, value: ReactNode, fontSize: string = 'sm') => (
        <Table.Tr>
            <Table.Td
                p={0}
                pl='sm'>
                <strong>
                    {key}
                </strong>
            </Table.Td>
            <Table.Td
                p={0}
                fz={fontSize}>
                {value}
            </Table.Td>
        </Table.Tr>
    );

    return (
        <Box
            className={classes.pi}
            w={rem(220)}
            h={rem(220 * 2)}
            onClick={handleOpenAdmin}>
            <Tabs defaultValue='one'>
                <Tabs.List>
                    <Tabs.Tab value='one'>
                        <Text
                            fz='sm'
                            fw={600}>
                            {'ONE'}
                        </Text>

                    </Tabs.Tab>
                    <Tabs.Tab value='two'>
                        {'TWO'}
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value='one'>
                    <Table
                        cellSpacing={0}
                        cellPadding={0}
                        fz='xs'
                        style={{
                            maxWidth : rem(220),
                        }}>
                        <Table.Tbody>
                            {gameState.error_message && renderRow('Error', gameState.error_message)}
                            {renderRow('IsDealer', isDealer ? 'Yes' : 'No')}
                            {renderRow('AuthToken', authToken)}
                            {renderRow('IsHost', isHost ? 'Yes' : 'No')}
                            {renderRow('Game Code', gameState.game_code)}
                            {renderRow('Stage', gameState.game_stage)}
                            {renderRow('PlayerId', currentPlayer?.id, 'xs')}
                            {renderRow('Username', currentPlayer?.username, 'xs')}
                            {renderRow('Score', currentPlayer?.score)}
                            {renderRow("Dealer's", dealerDealtCard?.text)}
                            {renderRow("Player's", playerDealtCard?.text)}
                        </Table.Tbody>
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value='two'>
                    <List>
                        <List.Item>
                            {'ONE'}
                        </List.Item>
                        <List.Item>
                            {'ONE'}
                        </List.Item>
                        <List.Item>
                            {'ONE'}
                        </List.Item>
                        <List.Item>
                            {'ONE'}
                        </List.Item>

                    </List>
                </Tabs.Panel>
            </Tabs>
        </Box>
    )
};
