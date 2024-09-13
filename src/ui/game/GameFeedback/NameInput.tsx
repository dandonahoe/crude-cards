import { TextInput } from '@mantine/core';

export const NameInput = ({ form, focusTrapRef }: { form: any, focusTrapRef: any }) => (
    <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        withAsterisk={true}
        ref={focusTrapRef}
        aria-label='Name'
        label='Name'
        fw={600}
        tabIndex={0} />
);
