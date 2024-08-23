import { Box, Text } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameBanner : RFC<Props> = ({
    text, subtitle, color,
}) =>
    <Box
        ta='center'
        mb='sm'
        mt='xs'
        c={color}>
        <Text
            fz='lg'
            fw={600}>
            {text}
        </Text>
        {subtitle &&
            <Text
                fw={600}
                p='sm'
                fz='md'>
                {subtitle}
            </Text>
        }
    </Box>
