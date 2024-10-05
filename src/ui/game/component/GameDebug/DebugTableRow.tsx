import { DebugTableRowProps } from './type';
import { Table } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const DebugTableRow: RFC<DebugTableRowProps> = ({
    label, value, fontSize = 'sm',
}) => (
    <Table.Tr>
        <Table.Td
            p={0}
            pl='sm'>
            <strong>{label}</strong>
        </Table.Td>
        <Table.Td
            p={0}
            fz={fontSize}>
            {value}
        </Table.Td>
    </Table.Tr>
);
