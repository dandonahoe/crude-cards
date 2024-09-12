import { Button, Group, TextInput, Textarea, Text } from '@mantine/core';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameAction } from '../../../client/action/game.action';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useFocusTrap } from '@mantine/hooks';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/form';
import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';
import { useState } from 'react';
import { z } from 'zod';


interface FeedbackForm {
    name    : string;
    email   : string;
    message : string;
}

const schema = z.object({
    name : z.string().min(1, {
        message : 'Name should have at least 2 letters',
    }),

    email : z.string().email({
        message : 'Invalid email',
    }),

    message : z.string().min(1, {
        message : 'Name should have at least 2 letters',
    }),
});

export const GameFeedback : RFC = () => {
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
            <Text fw={600}>
                {'Thank you for your feedback!'}
            </Text>
        );

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                fw={600}
                ref={focusTrapRef}
                {...form.getInputProps('name')}
                key={form.key('name')}
                withAsterisk={true}
                aria-label='Name'
                label='Name'
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
                fw={600}
                withAsterisk={true}
                aria-label='Message'
                label='Message'
                tabIndex={0}
                rows={4} />
            <Group
                justify='center'
                align='center'
                tabIndex={0}
                mt='md'>
                <Button
                    variant='outline'
                    color={CardColor.Black}
                    size='sm'
                    m='lg'
                    type='submit'>
                    <GameText>
                        {'Submit'}
                    </GameText>
                </Button>
            </Group>
        </form>
    );
}

