import { GameTextType, Props } from './type';
import classes from './GameText.module.css';
import { PropsWithChildren } from 'react';
import { Text } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameText : RFC<Props> = ({
    children, type,
}) => {
    if(!children) return null;

    switch(type) {
        case GameTextType.Subtitle:
            return (
                <Text
                    className={classes.gameSubtitle}
                    fz='lg'>
                    {children}
                </Text>
            );

        case GameTextType.Title:
            return (
                <Text
                    className={classes.gameTitle}
                    fz='xl'>
                    {children}
                </Text>
            );

        case GameTextType.Small:
            return (
                <Text
                    className={classes.gameSmall}
                    fz='sm'>
                    {children}
                </Text>
            );

        case GameTextType.Banner:
            return (
                <Text className={classes.bannerText}>
                    {children}
                </Text>
            );

        default:
            throw new Error(`Unknown GameTextType: ${type}`);
    }
}

export const GameTextSubtitle : RFC<PropsWithChildren> = ({ children }) =>
    <GameText type={GameTextType.Subtitle}>
        {children}
    </GameText>

export const GameTextTitle : RFC<PropsWithChildren> = ({ children }) =>
    <GameText type={GameTextType.Title}>
        {children}
    </GameText>

export const GameTextSmall : RFC<PropsWithChildren> = ({ children }) =>
    <GameText type={GameTextType.Small}>
        {children}
    </GameText>

export const GameTextBanner : RFC<PropsWithChildren> = ({ children }) =>
    <GameText type={GameTextType.Banner}>
        {children}
    </GameText>

export const GameTextNeon : RFC<PropsWithChildren> = ({ children }) =>
    <GameText type={GameTextType.Neon}>
        {children}
    </GameText>
