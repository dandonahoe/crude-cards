import { CardColor } from '../../../api/src/constant/card-color.enum';
import classes from './GameText.module.css';
import { PropsWithChildren } from 'react';
import { Box, Text } from '@mantine/core';
import { RFC } from '@app/ui/type';
import {
    GameTextSubtitleProps, Props, GameTextType,
    GameTextBannerProps, GameTextCardProps,
    GameTextSmallProps,  GameTextTitleProps,
} from './type';


export const GameText : RFC<Props> = ({
    color = CardColor.White,
    type  = GameTextType.Default,
    size  = 'md',
    children,
}) => {
    if(!children) return null;

    switch(type) {

        case GameTextType.Default:
        case GameTextType.Medium:
            return (
                <Text
                    className={classes.gameDefault}
                    c={color}
                    fz={size}>
                    {children}
                </Text>
            );

        case GameTextType.Subtitle:
            return (
                <Text
                    className={classes.gameSubtitle}
                    c={color}
                    fz='lg'>
                    {children}
                </Text>
            );

        case GameTextType.Title:
            return (
                <Text
                    className={classes.gameTitle}
                    c={color}
                    fz='xl'>
                    {children}
                </Text>
            );

        case GameTextType.Small:
            return (
                <Text
                    className={classes.gameSmall}
                    c={color}
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

export const GameTextCentered : RFC<PropsWithChildren> = ({ children }) =>
    <Box ta='center'>
        <GameText>
            {children}
        </GameText>
    </Box>

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

