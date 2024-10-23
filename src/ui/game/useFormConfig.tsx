import { zodResolver } from 'mantine-form-zod-resolver';
import { useDispatch } from '@app/client/hook';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { ZodType } from 'zod';

export const useFormConfig = (
    schema        : ZodType,
    initialValues : Record<string, unknown>,
    action        : any) => {
    const form = useForm({
        validate : zodResolver(schema),
        mode     : 'uncontrolled',
        initialValues,
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (values: any): void => {
        dispatch(action(values));
        setIsSubmitted(true);
    };

    return {
        form,
        isSubmitted,
        handleSubmit,
        setIsSubmitted,
    };
};
