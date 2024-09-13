import classes from './GameButton.module.css';
import { GameTextTitle } from '../GameText';
import { GameButtonProps } from './type';
import { Button } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameButton: RFC<GameButtonProps> = ({
    text, onClick, buttonType = 'primary',
}) =>
    <Button
        className={classes[buttonType]}
        aria-label={text}
        onClick={onClick}
        role='button'
        tabIndex={0}>
        <GameTextTitle>
            {text}
        </GameTextTitle>
    </Button>
