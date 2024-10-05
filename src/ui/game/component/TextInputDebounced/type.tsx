import { MantineSize } from '@mantine/core';


export interface Props {
    milliseconds ?: number;
    onChange      : (value : string, name : string) => unknown;
    onBlur        : (value : string, name : string) => unknown;
    label        ?: string | null;
    value         : string;
    name          : string;
    size          : MantineSize;
}
