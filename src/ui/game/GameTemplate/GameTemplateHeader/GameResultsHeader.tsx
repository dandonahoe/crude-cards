import { selectIsPlayerWinner, selectWinner } from '@app/client/selector/game';
import { useDispatch, useSelector } from '../../../../client/hook';
import { GameAction } from '../../../../client/action/game.action';
import { CA } from '../../../../constant/framework/CoreAction';
import { Stack, Text, Center } from '@mantine/core';
import classes from '../GameTemplate.module.css';
import { GameContext } from '../../GameContext';
import { GameButton } from '../../GameButton';
import { RFC } from '../../../type';
import { useContext } from 'react';


export const GameResultsHeader : RFC = () => {

    const isWinner = useSelector(selectIsPlayerWinner);
    const winner = useSelector(selectWinner);

    const { isDealer } = useContext(GameContext);

    const dispatch = useDispatch();

    const handleNextHand = () : CA => dispatch(GameAction.nextHand({}));

    return (
        <Stack mb='md'>
            <Text
                fw={600}
                fz='lg'
                pt='xs'
                ta='center'>
                {'WINNER IS'}
            </Text>
            <Text
                className={classes.neonText}
                fw={200}
                ta='center'
                fz='lg'>
                {isWinner
                    ? 'YOU!'
                    : winner?.username
                }
            </Text>
            {!isDealer &&
                <Text
                    fz='xs'
                    mt='xl'
                    fw={600}
                    ta='center'>
                    {'Waiting on Dealer'}
                </Text>
            }
            {isDealer &&
                <Center
                    mt='xl'
                    mb='md'>
                    <GameButton
                        onClick={handleNextHand}
                        text='Next' />
                </Center>
            }
        </Stack>
    );
}
