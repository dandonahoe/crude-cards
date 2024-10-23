import { IconInfoCircle } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';
import { Alert } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameError : RFC<PropsWithChildren> = ({
    children,
}) =>
    <Alert
        icon={<IconInfoCircle />}
        title='Minor Catasrophe'
        variant='light'
        color='red'
        radius='md'>
        {children}
    </Alert>
