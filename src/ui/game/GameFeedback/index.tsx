import { GameAction } from '../../../client/action/game.action';
import { FeedbackFormInitialValues } from './constant';
import { ThankYouMessage } from './ThankYouMessage';
import { useFormConfig } from '../useFormConfig';
import { useFocusTrap } from '@mantine/hooks';
import { MessageInput } from './MessageInput';
import { SubmitButton } from './SubmitButton';
import { EmailInput } from './EmailInput';
import { NameInput } from './NameInput';
import { schema } from './validation';
import { FeedbackForm } from './type';


export const GameFeedback = () => {

    const focusTrapRef = useFocusTrap(true);

    const { form, isSubmitted, handleSubmit } =
        useFormConfig(
            schema, FeedbackFormInitialValues,
            (values: FeedbackForm) =>
                GameAction.submitFeedback(values));

    if (isSubmitted) return <ThankYouMessage />;

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <NameInput
                focusTrapRef={focusTrapRef}
                form={form} />
            <EmailInput form={form} />
            <MessageInput form={form} />
            <SubmitButton />
        </form>
    );
};
