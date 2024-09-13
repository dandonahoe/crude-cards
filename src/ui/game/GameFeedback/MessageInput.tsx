import { Textarea } from '@mantine/core';

export const MessageInput = ({ form }: { form: any }) =>
    <Textarea
        {...form.getInputProps('message')}
        key={form.key('message')}
        aria-label='Message'
        withAsterisk={true}
        label='Message'
        tabIndex={0}
        fw={600}
        rows={4} />
