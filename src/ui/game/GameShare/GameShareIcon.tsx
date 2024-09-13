import { IconPaperclip } from '@tabler/icons-react';
import styles from './GameShareIcon.module.css';
import { Flex, Stack } from '@mantine/core';


export const GameShareIcon = () =>
    <Flex className={styles.iconContainer}>
        <Stack className={styles.paperclipIcon}>
            <IconPaperclip
                size={30}
                stroke={2} />
        </Stack>
    </Flex>

