import classes from './GameButton.module.css';
import { GameTextTitle } from '../GameText';
import { Button } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameButton : RFC<Props> = ({
    text, onClick,
}) =>
    <Button
        aria-label={`Button ${text}`}
        className={classes.gameButton}
        onClick={onClick}>
        <GameTextTitle>
            {text}
        </GameTextTitle>
    </Button>

