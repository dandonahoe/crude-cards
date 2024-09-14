import { GameBoxCenteredProps, GameBoxDefaultProps, GameBoxType, Props } from './type';
import { Box, Center} from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameBox : RFC<Props> = ({
    type = GameBoxType.Default,
    size = 'md',
    children,
}) => {

    if(!children) return null;

    const commonProps = {
        mb     : size,
        mt     : size,
        border : '1px solid #f90',
    }

    switch(type) {
        case GameBoxType.Default:
            return (
                <Box {...commonProps}>
                    {children}
                </Box>
            );

        case GameBoxType.Centered:
            return (
                <Center {...commonProps}>
                    {children}
                </Center>
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

