import { CardColor } from '../../../api/src/constant/card-color.enum';
import classes from './GameText.module.css';
import { PropsWithChildren } from 'react';
import { Text } from '@mantine/core';
import { RFC } from '@app/ui/type';
import {
    GameTextSubtitleProps, Props, GameTextType,
    GameTextBannerProps, GameTextCardProps,
    GameTextSmallProps, GameTextTitleProps,
} from './type';


export const GameText : RFC<Props> = ({
    children, type, color = CardColor.White,
}) => {
    if(!children) return null;

    switch(type) {
        case GameTextType.Subtitle:
            return (
                <Text
                    c={color}
                    className={classes.gameSubtitle}
                    fz='lg'>
                    {children}
                </Text>
            );

        case GameTextType.Title:
            return (
                <Text
                    c={color}
                    className={classes.gameTitle}
                    fz='xl'>
                    {children}
                </Text>
            );

        case GameTextType.Small:
            return (
                <Text
                    c={color}
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

export const GameTextSubtitle : RFC<GameTextSubtitleProps> = ({ children, color }) =>
    <GameText
        type={GameTextType.Subtitle}
        color={color}>
        {children}
    </GameText>

export const GameTextCard : RFC<GameTextCardProps> = ({ children, color }) =>
    <GameText
        type={GameTextType.Card}
        color={color}>
        <div
            dangerouslySetInnerHTML={{
                __html : children ?? '[MISSING TEXT]',
            }}
            style={{
                color : CardColor.White,
            }} />
    </GameText>

export const GameTextTitle : RFC<GameTextTitleProps> = ({ children, color }) =>
    <GameText
        type={GameTextType.Title}
        color={color}>
        {children}
    </GameText>

export const GameTextSmall : RFC<GameTextSmallProps> = ({ children, color }) =>
    <GameText
        type={GameTextType.Small}
        color={color}>
        {children}
    </GameText>

export const GameTextBanner : RFC<GameTextBannerProps> = ({ children, color }) =>
    <GameText
        type={GameTextType.Banner}
        color={color}>
        {children}
    </GameText>

export const GameTextNeon : RFC<PropsWithChildren> = ({ children }) =>
    <GameText type={GameTextType.Neon}>
        {children}
    </GameText>

