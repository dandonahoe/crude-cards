import { CardColor } from '../../../api/src/constant/card-color.enum';
import { Box, Text, Title } from '@mantine/core';
import classes from './GameText.module.css';
import { PropsWithChildren, useContext } from 'react';
import { RFC } from '@app/ui/type';
import {
    GameTextSubtitleProps, Props, GameTextType,
    GameTextBannerProps, GameTextCardProps,
    GameTextSmallProps,  GameTextTitleProps,
} from './type';
// import seedrandom from 'seedrandom';
import { AppContext } from '../../AppContext';
// Consistent random number
// const rand = seedrandom(`${index}`);


export const GameText : RFC<Props> = ({
    color = CardColor.White,
    type  = GameTextType.Default,
    size  = 'md',
    children,
    ...propsMysterioso
}) => {

    let { isDebugging } = useContext(AppContext);

    isDebugging = false;

    if(!children)
        return null;

    const overrideColor = isDebugging
        ? '#FFA500'
        : undefined;

    const overrideBackgroundColor = undefined;

    switch(type) {

        case GameTextType.Default:
        case GameTextType.Medium:
            return (
                <Text
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
                    className={classes.bannerText}
                    {...propsMysterioso}>
                    {'THIS ONE3!'}
                    {children}
                </Text>
            );

        default:
            throw new Error(`Unknown GameTextType: ${type}`);
    }
}

export const GameTextSubtitle : RFC<GameTextSubtitleProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Subtitle}
        ta='center'
        color={color}
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextCentered : RFC<PropsWithChildren> = ({
    children, ...propsMysterioso
}) =>
    <Box ta='center'>
        <GameText
            {...propsMysterioso}>
            {children}
        </GameText>
    </Box>

export const GameTextCard : RFC<GameTextCardProps> = ({
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

export const GameTextTitle : RFC<GameTextTitleProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Title}
        color={color}
        ta='center'
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextSmall : RFC<GameTextSmallProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Small}
        color={color}
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextBanner : RFC<GameTextBannerProps> = ({
    children, color, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Banner}
        color={color}
        {...propsMysterioso}>
        {children}
    </GameText>

export const GameTextNeon : RFC<PropsWithChildren> = ({
    children, ...propsMysterioso
}) =>
    <GameText
        type={GameTextType.Neon}
        {...propsMysterioso}>
        {children}
    </GameText>

