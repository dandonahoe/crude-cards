import { GameBoxCenteredProps, GameBoxDefaultProps, GameBoxType, Props } from './type';
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { App } from '../../../AppContext';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameBox : RFC<Props> = ({
    type = GameBoxType.Default,
    color = CardColor.Black,
    size = 'md',
    children,
}) => {

    const { isDebugging } = useContext(App);

    if(!children) return null;

    const commonProps = {
        mb     : size,
        mt     : size,
        border : isDebugging ? '1px solid #f90' : undefined,
    }

    switch(type) {
        case GameBoxType.Default:
            return (
                <Box
                    c={color}
                    {...commonProps}>
                    {children}
                </Box>
            );

        case GameBoxType.Centered:
            return (
                <Box
                    {...commonProps}
                    c={color}
                    ta='center'>
                    {children}
                </Box>
            );

        default: throw new Error(`Unknown GameBoxType: ${type}`);
    }
}

export const GameBoxDefault : RFC<GameBoxDefaultProps> = ({ children, size }) =>
    <GameBox
        type={GameBoxType.Default}
        size={size}>
        {children}
    </GameBox>

export const GameBoxCentered : RFC<GameBoxCenteredProps> = ({ children, size }) =>
    <GameBox
        type={GameBoxType.Centered}
        size={size}>
        {children}
    </GameBox>

