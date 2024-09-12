import { GameTextType, Props } from './type';
import classes from './GameText.module.css';
import { Text } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { PropsWithChildren } from 'react';


export const GameText : RFC<Props> = ({
    children, type, ...remainingProps
}) => {
    if(!children) return null;

    switch(type) {
        case GameTextType.Subtitle:
            return (
                <Text
                    className={classes.gameSubtitle}
                    {...remainingProps}
                    fz='lg'>
                    {children}
                </Text>
            );

        case GameTextType.Title:
            return (
                <Text
                    className={classes.gameTitle}
                    {...remainingProps}
                    fz='xl'>
                    {children}
                </Text>
            );

        default:
            throw new Error(`Unknown GameTextType: ${type}`);
    }
}

export const GameTextSubtitle : RFC<PropsWithChildren> = ({
    children,
}) =>
    <GameText type={GameTextType.Subtitle}>
        {children}
    </GameText>

export const GameTextTitle : RFC<PropsWithChildren> = ({
    children,
}) =>
    <GameText type={GameTextType.Title}>
        {children}
    </GameText>
