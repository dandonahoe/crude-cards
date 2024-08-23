import { CA } from '../../../constant/framework/CoreAction';
import { MantineSize } from '@mantine/core';


export interface Props {
    milliseconds ?: number;
    onChange      : (value : string, name : string) => CA;
    onBlur        : (value : string, name : string) => CA;
    label        ?: string | null;
    value         : string;
    name          : string;
    size          : MantineSize;
}
