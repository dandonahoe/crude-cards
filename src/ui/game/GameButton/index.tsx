import classes from './GameButton.module.css';
import { Button, Text } from '@mantine/core';
import { App } from '../../AppContext';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';


export const GameButton : RFC<Props> = ({
    text, onClick,
}) => {
    const { isPhone  } = useContext(App);

    const buttonSize = isPhone ? 90 : 180;
    const fontSize   = isPhone ? 'sm' : 'xl';

    return (
        <Button
            style={{
                width  : buttonSize,
                height : buttonSize,
            }}
            aria-label={`Button ${text}`}
            className={classes.gameButton}
            onClick={onClick}>
            <Text
                fz={fontSize}
                fw={800}
                lh={0.5}>
                {text}
            </Text>
        </Button>
    );
}

