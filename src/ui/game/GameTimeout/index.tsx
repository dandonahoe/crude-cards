import { Box, Text, Title } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameTimeout : RFC = () =>
    <Box
        mb='md'
        mt='lg'
        ta='center'>
        <Title>
            {'Too Slow'}
        </Title>
        <Text>
            {'You didn\'t pick a card and are banished from this round.'}
        </Text>
    </Box>
