import { z } from "zod";

export const schema = z.object({
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
