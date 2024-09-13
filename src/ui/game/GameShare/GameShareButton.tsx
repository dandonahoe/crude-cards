import { Env } from '../../../Env';
import {
    WhatsappShareButton, TwitterShareButton,
    EmailShareButton, WhatsappIcon,
    TwitterIcon, EmailIcon,
} from 'react-share';


const shareUrl = Env.getValue<string>('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');


export const GameShareButton = () =>
    <>
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
    </>;
