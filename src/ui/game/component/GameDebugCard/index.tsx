import { Box, rem, Text } from '@mantine/core';
import classes from './GameDebug.module.css';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDebugCard: RFC<Props> = ({
    wiggleBoxId, wiggleSeed,
 }) => {

    return (
        <Box
            className={classes.pi}
            w={rem(220)}
            h={rem(440)}>
            <Text>
                {`wiggleBoxId(${wiggleBoxId})`}
            </Text>
            <br />
            <Text>
                {`wiggleSeed(${wiggleSeed})`}
            </Text>
        </Box>
    );
};
