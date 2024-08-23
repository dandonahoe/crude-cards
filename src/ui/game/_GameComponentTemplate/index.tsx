import { Box, Text } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameComponentTemplate : RFC<Props> = ({
    text,
}) =>
    <Box style= {{ outline : '3px dotted #f0f'}}>
        <Text fw={600}>
            {`GameComponentTemplate :${text}`}
        </Text>
    </Box>
