import { Table, Tabs, Text, List, rem } from '@mantine/core';
import { DebugTableRow } from './DebugTableRow';
import { GameDebugTabsProps } from './type';
import { RFC } from '@app/ui/type';


export const GameDebugTabs: RFC<GameDebugTabsProps> = ({
    dealerDealtCard, playerDealtCard, currentPlayer,
    gameState, authToken, isDealer, isHost,
}) => {
    return (
        <Tabs defaultValue='one'>
            <Tabs.List>
                <Tabs.Tab value='one'>
                    <Text
                        fz='sm'
                        fw={600}>{"ONE"}</Text>
                </Tabs.Tab>
                <Tabs.Tab value='two'>{"TWO"}</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='one'>
                <Table
                    cellSpacing={0}
                    cellPadding={0}
                    fz='xs'
                    style={{ maxWidth : rem(220) }}>
                    <Table.Tbody>
                        {gameState.error_message && <DebugTableRow
                            label='Error'
                            value={gameState.error_message} />}
                        <DebugTableRow
                            label='IsDealer'
                            value={isDealer ? 'Yes' : 'No'} />
                        <DebugTableRow
                            label='AuthToken'
                            value={authToken} />
                        <DebugTableRow
                            label='IsHost'
                            value={isHost ? 'Yes' : 'No'} />
                        <DebugTableRow
                            label='Game Code'
                            value={gameState.game_code} />
                        <DebugTableRow
                            label='Stage'
                            value={gameState.game_stage} />
                        <DebugTableRow
                            label='PlayerId'
                            value={currentPlayer?.id}
                            fontSize='xs' />
                        <DebugTableRow
                            label='Username'
                            value={currentPlayer?.username}
                            fontSize='xs' />
                        <DebugTableRow
                            label='Score'
                            value={currentPlayer?.score} />
                        <DebugTableRow
                            label="Dealer's Card"
                            value={dealerDealtCard?.text} />
                        <DebugTableRow
                            label="Player's Card"
                            value={playerDealtCard?.text} />
                    </Table.Tbody>
                </Table>
            </Tabs.Panel>
            <Tabs.Panel value='two'>
                <List>
                    <List.Item>{"ONE"}</List.Item>
                    <List.Item>{"ONE"}</List.Item>
                    <List.Item>{"ONE"}</List.Item>
                    <List.Item>{"ONE"}</List.Item>
                </List>
            </Tabs.Panel>
        </Tabs>
    );
};
