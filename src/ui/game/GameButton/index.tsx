import classes from './GameButton.module.css';
import { Button, Text } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameButton : RFC<Props> = ({
    text, onClick,
}) => {
    const buttonSize = 180;
    const fontSize   = 'xl';

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
