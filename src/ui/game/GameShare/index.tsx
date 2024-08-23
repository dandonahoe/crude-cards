import { Flex, Group, rem, Stack } from '@mantine/core';
import { IconPaperclip } from '@tabler/icons-react';
import { RFC } from '@app/ui/type';
import { Env } from '../../../Env';
import {
    WhatsappShareButton, TwitterShareButton,
    EmailShareButton, WhatsappIcon,
    TwitterIcon, EmailIcon,
} from "react-share";


const shareUrl = Env.getValue<string>('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');

export const GameShare: RFC = () =>
    <Group
        fz='xs'
        style={{}}>
        <Flex
            justify='center'
            align='center'
            ta='center'
            style={{
                borderRadius    : '4px',
                backgroundColor : '#9b1717',
                color           : '#fff',
                width           : rem(64),
                height          : rem(64),
            }}>
            <Stack align='center'>
                <IconPaperclip
                    size={30}
                    stroke={2} />
            </Stack>
        </Flex>
        <EmailShareButton
            url={shareUrl}
            subject='Game Invite'>
            <EmailIcon />
        </EmailShareButton>
        <TwitterShareButton
            url={shareUrl}
            title='Game Invite'>
            <TwitterIcon />
        </TwitterShareButton>
        <WhatsappShareButton
            url={shareUrl}
            title='Game Invite'>
            <WhatsappIcon />
        </WhatsappShareButton>
    </Group>
