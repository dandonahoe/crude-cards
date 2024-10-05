import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { PropsWithChildren, useContext } from 'react';
import { Box, Text, Title } from '@mantine/core';
import { AppContext } from '../../../AppContext';
import classes from './GameText.module.css';
import { RFC } from '@app/ui/type';
import {
    GameTextSubtitleProps, GameTextCenteredProps,
    GameTextBannerProps,   GameTextSmallProps,
    GameTextTitleProps,    GameTextCardProps,
    GameTextType,          Props,
} from './type';


export const GameText: RFC<Props> = ({
    color = CardColor.White,
    type = GameTextType.Default,
    size = 'md',
    children,
    ...propsMysterioso
}) => {

    let { isDebugging } = useContext(AppContext);

    isDebugging = false;

    if (!children)
        return null;

    const overrideColor = isDebugging
        ? '#FFA500'
        : undefined;

    const overrideBackgroundColor = undefined;

    switch (type) {

        case GameTextType.Default:
        case GameTextType.Medium:
            return (
                <Text
                    fw={600}
                    className={classes.gameDefault}
                    c={overrideColor ?? color}
                    fz={size}
                    bg={overrideBackgroundColor}
                    {...propsMysterioso}>
                    {children}
                </Text>
            );

        case GameTextType.Subtitle:
            return (
                <Title
                    fw={600}
                    order={2}
                    className={classes.gameSubtitle}
                    c={overrideColor ?? color}
                    fz='md'
                    {...propsMysterioso}>
                    {children}
                </Title>
            );

        case GameTextType.Title:
            return (
                <Title
                    fw={600}
                    className={classes.gameTitle}
                    c={overrideColor ?? color}
                    fz='xl'
                    {...propsMysterioso}>
                    {children}
                </Title>
            );

        case GameTextType.Small:
            return (
                <Text
                    fw={600}
                    className={classes.gameSmall}
                    c={overrideColor ?? color}
                    fz='sm'
                    {...propsMysterioso}>
                    {children}
                </Text>
            );

        case GameTextType.Banner:
            return (
                <Text
                    fw={600}
                    className={classes.bannerText}
                    {...propsMysterioso}>
                    {children}
                </Text>
            );

        case GameTextType.Neon:
            return (
                <Text
                    fw={600}
                    className={classes.neonText}
                    {...propsMysterioso}>
                    {children}
                </Text>
            );

        default:
            throw new Error(`Unknown GameTextType: ${type}`);
    }
}

export const GameTextSubtitle: RFC<GameTextSubtitleProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Subtitle}
        ta='center'
        color={color}
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextCentered: RFC<GameTextCenteredProps> = ({
    children, color, ...propsMysterioso
}) =>
    <Box ta='center'>
        <GameText
            color={color}
            {...propsMysterioso}>
            {children}
        </GameText>
    </Box>

export const GameTextCard: RFC<GameTextCardProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Card}
        color={color}
        {...propsMysterioso}>
        <div
            dangerouslySetInnerHTML={{
                __html : children ?? '[MISSING TEXT]',
            }}
            style={{
                color : CardColor.White,
            }} />
    </GameText>

export const GameTextTitle: RFC<GameTextTitleProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Title}
        color={color}
        ta='center'
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextSmall: RFC<GameTextSmallProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Small}
        color={color}
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextBanner: RFC<GameTextBannerProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Banner}
        color={color}
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextNeon: RFC<PropsWithChildren> = ({
    children, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Neon}
        color={CardColor.White}
        {...propsMysterioso}>
        {children}
    </GameText>

