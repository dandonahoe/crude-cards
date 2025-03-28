import { Env } from '../../../../Env';
import {
    WhatsappShareButton, TwitterShareButton, EmailIcon,
    EmailShareButton, WhatsappIcon, TwitterIcon,
} from 'react-share';


const webServerHost = Env.getValue<string>('NEXT_PUBLIC_WEB_SERVER_HOST');
const webServerPort = Env.getValue<string>('NEXT_PUBLIC_WEB_SERVER_PORT');

const url = `${webServerHost}${webServerPort === '80' ? '' : `:${webServerPort}`}`;

export const GameShareButton = () =>
    <>
        <EmailShareButton
            url={url}
            subject='Game Invite'>
            <EmailIcon />
        </EmailShareButton>
        <TwitterShareButton
            url={url}
            title='Game Invite'>
            <TwitterIcon />
        </TwitterShareButton>
        <WhatsappShareButton
            url={url}
            title='Game Invite'>
            <WhatsappIcon />
        </WhatsappShareButton>
    </>;
