import classes from './GameButton.module.css';
import { Button, Text } from '@mantine/core';
import { App } from '../../AppContext';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';
import { GameTextTitle } from '../GameText';


export const GameButton : RFC<Props> = ({
    text, onClick,
}) => {
    const { isPhone  } = useContext(App);


    return (
        <Button
            style={{
                width  : 180,
                height : 180,
            }}
            aria-label={`Button ${text}`}
            className={classes.gameButton}
            onClick={onClick}>
            <GameTextTitle>
                {text}
            </GameTextTitle>
        </Button>
    );
}

