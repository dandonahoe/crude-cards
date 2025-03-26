import { IconPaperclip } from '@tabler/icons-react';
import classes from './GameShare.module.css';
import { Flex, Stack } from '@mantine/core';


export const GameShareIcon = () =>
    <Flex className={classes.iconContainer}>
        <Stack className={classes.paperclipIcon}>
            <IconPaperclip
                stroke={2}
                size={30} />
        </Stack>
    </Flex>

