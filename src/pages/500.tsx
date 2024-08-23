import ErrorImage from '@app/asset/image/500.png'
import { Card, Center } from '@mantine/core';
import Image from 'next/image';

// eslint-disable-next-line import/no-default-export
export default function Page500() : React.JSX.Element {
    return (
        <>
            <title>{'500 Internal Server Error'}</title>
            <Center h='100dvh'>
                <Card>
                    <Image
                        src={ErrorImage.src}
                        alt='Minor Catastrophe'
                        height={300}
                        width={300} />

                    <h1 style={{textAlign : 'center'}}>{'500 Internal Server Error'}</h1>
                    {'Oops! Something went wrong on our end. We are working to fix this issue. Please try again later.'}
                </Card>
            </Center>
        </>
    );
}
