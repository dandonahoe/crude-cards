import { GameAction } from '../../../../client/action/game.action';
import { Group, TextInput, Textarea } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useFocusTrap } from '@mantine/hooks';
import { GameButton } from '../GameButton';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/form';
import { GameText } from '../GameText';
import { schema } from './validation';
import { FeedbackForm } from './type';
import { useState } from 'react';


export const GameFeedback = () => {

    const form = useForm({
        validate : zodResolver(schema),

        mode : 'uncontrolled',

        initialValues : {
            name    : '',
            email   : '',
            message : '',
        },
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (values : FeedbackForm) : void => {

        dispatch(GameAction.submitFeedback({
            message : values.message,
            email   : values.email,
            name    : values.name,
        }));

        setIsSubmitted(true);
    }

    const focusTrapRef = useFocusTrap(true);

    if(isSubmitted)
        return (
            <GameText>
                {'Thank you for your feedback!'}
            </GameText>
        );

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                {...form.getInputProps('name')}
                key={form.key('name')}
                withAsterisk={true}
                ref={focusTrapRef}
                aria-label='Name'
                label='Name'
                fw={600}
                tabIndex={0} />
            <TextInput
                {...form.getInputProps('email')}
                fw={600}
                key={form.key('email')}
                withAsterisk={true}
                aria-label='Email'
                variant='filled'
                label='Email'
                tabIndex={0} />
            <Textarea
                {...form.getInputProps('message')}
                key={form.key('message')}
                aria-label='Message'
                withAsterisk={true}
                label='Message'
                tabIndex={0}
                fw={600}
                rows={4} />
            <Group
                justify='center'
                align='center'
                tabIndex={0}
                mt='md'>
                <GameButton text='Submit' />
            </Group>
        </form>
    );
}

