import { GameStatusTableTitleProps } from './type'
import { GameText } from '../GameText'
import { RFC } from '@app/ui/type'


export const GameStatusTableTitle: RFC<GameStatusTableTitleProps> = ({ title }) =>
    <GameText size='lg'>
        {title}
    </GameText>
