import { Button, rem, Text } from '@mantine/core';
import classes from './GameButton.module.css';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameButton: RFC<Props> = ({
    text, onClick,
}) =>
    <Button
        className={classes.gameButton}
        aria-label={`Button ${text}`}
        onClick={onClick}
        w={rem(180)}
        h={rem(180)}>
        <Text
            fw={600}
            lh={0.5}
            fz='xl'>
            {text}
        </Text>
    </Button>
