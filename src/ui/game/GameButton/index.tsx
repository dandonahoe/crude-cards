import classes from './GameButton.module.css';
import { GameTextTitle } from '../GameText';
import { GameButtonProps } from './type';
import { Button } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameButton: RFC<GameButtonProps> = ({
    text, onClick = null, buttonType = 'primary',
}) =>
    <Button
        className={classes[buttonType]}
        onClick={onClick ?? (() => {})}
        aria-label={text}
        role='button'
        tabIndex={0}>
        <GameTextTitle>
            {text}
        </GameTextTitle>
    </Button>
