import { CA } from '../../../constant/framework/CoreAction';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const TextInputDebounced : RFC<Props> = ({
    onChange, onBlur, value, label, name,
    milliseconds = 3000,
    size ='md',
}) => {
    const [text, setText] = useState(value);
    const [debounced] = useDebouncedValue(text, milliseconds);

    useEffect(() => {
        if (debounced !== value)
            onChange(debounced, name);

    }, [debounced, name, onChange, value]);

    const handleChange = (evt : React.ChangeEvent<HTMLInputElement>) : void => {
        setText(evt.currentTarget.value);
    };

    const handleBlur = () : CA => onBlur(text, name)

    const handleKeyDownTextBox = (
        event : React.KeyboardEvent<HTMLInputElement>,
    ) : CA | void => {
        if (event.key === 'Enter')
            return handleBlur();
    };

    return (
        <TextInput
            onKeyDown={handleKeyDownTextBox}
            onChange={handleChange}
            onBlur={handleBlur}
            spellCheck={false}
            label={label}
            value={text}
            size={size}
            styles={{
                input : {
                    borderRadius : '10px',
                    border       : '1px solid #000',
                    textAlign    : 'center',
                },
            }} />
    );
};
