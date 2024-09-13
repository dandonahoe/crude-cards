import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

const schema = z.object({
    name    : z.string({ message : "Name is required" }),
    email   : z.string().email({ message : "Invalid email address" }),
    message : z.string({ message : "Message is required" }),
});

export const formConfig = {
    validate : zodResolver(schema),
    mode     : 'uncontrolled',

    initialValues : {
        name    : '',
        email   : '',
        message : '',
    },
};
