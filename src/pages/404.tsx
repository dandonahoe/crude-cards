import { Card, Center } from '@mantine/core';

// eslint-disable-next-line import/no-default-export
export default function Page500() : React.JSX.Element {
    return (
        <>
            <title>{'404 Not Found'}</title>
            <Center h='100dvh'>
                <Card>
                    <h1 style={{textAlign : 'center'}}>{'404 Not Found'}</h1>
                    {'Oops! I cant find that.'}
                </Card>
            </Center>
        </>
    );
}
