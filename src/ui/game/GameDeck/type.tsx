import { PropsWithChildren } from 'react';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';


export interface Props {
    onCardClicked ?: (card : CardDTO) => void;
    cards : CardDTO[];

}


export type WiggleBoxProps = PropsWithChildren<{
    index : number;
}>;
