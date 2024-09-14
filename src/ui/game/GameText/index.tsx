import { CardColor } from '../../../api/src/constant/card-color.enum';
import classes from './GameText.module.css';
import { PropsWithChildren } from 'react';
import { Box, rem, Text } from '@mantine/core';
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
    ...propsMysterioso
}) => {
    if(!children) return null;

    const commonStyles = {
        backgroundColor : '1px solid #f00',
        opacity         : 0.5,
        color           : 'green',
        fontSize        : rem(100),
    };

    // TODO: When this settles down, refactor and reduce

    switch(type) {

        case GameTextType.Default:
        case GameTextType.Medium:
            return (
                <Text
                    className={classes.gameDefault}
                    style={commonStyles}
                    c={color}
                    fz={size}
                    {...propsMysterioso}>
                    {children}
                </Text>
            );

        case GameTextType.Subtitle:
            return (
                <Text
                    className={classes.gameSubtitle}
                    style={commonStyles}
                    c={color}
                    fz='lg'
                    {...propsMysterioso}>
                    {children}
                </Text>
            );

        case GameTextType.Title:
            return (
                <Text
                    className={classes.gameTitle}
                    style={commonStyles}
                    c={color}
                    fz='xl'
                    {...propsMysterioso}>
                    {children}
                </Text>
            );

        case GameTextType.Small:
            return (
                <Text
                    className={classes.gameSmall}
                    style={commonStyles}
                    c={color}
                    fz='sm'
                    {...propsMysterioso}>
                    {children}
                </Text>
            );

        case GameTextType.Banner:
            return (
                <Text
                    style={commonStyles}
                    className={classes.bannerText}
                    {...propsMysterioso}>
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

