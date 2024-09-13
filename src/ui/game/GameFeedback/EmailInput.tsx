import { TextInput } from '@mantine/core';

export const EmailInput = ({ form }: { form: any }) =>
    <TextInput
        {...form.getInputProps('email')}
        key={form.key('email')}
        withAsterisk={true}
        aria-label='Email'
        variant='filled'
        tabIndex={0}
        label='Email'
        fw={600} />
