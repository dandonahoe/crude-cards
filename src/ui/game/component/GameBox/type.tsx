import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { MantineSize } from "@mantine/core";


export type GameBoxSize = Extract<MantineSize, 'sm' | 'md' | 'lg'>;

export type Props = React.PropsWithChildren<{
    color ?: CardColor;
    type  ?: GameBoxType;
    size  ?: GameBoxSize;
}>;

type GameBoxCustom =  Omit<Props, 'type'>;

export type GameBoxCenteredProps = GameBoxCustom;
export type GameBoxDefaultProps  = GameBoxCustom;


export enum GameBoxType {
    Centered,
    Default,
}
