import { CardColor } from '../../../api/src/constant/card-color.enum';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const TextInputDebounced: RFC<Props> = ({
    onChange, onBlur, value, label, name,
    milliseconds = 3000,
    size = 'md',
}) => {

    const [text, setText] = useState(value);
    const [debounced] = useDebouncedValue(text, milliseconds);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
        setText(evt.currentTarget.value);

    const handleBlur = () => onBlur(text, name);

    useEffect(() => {

        if (debounced !== value)
            onChange(debounced, name);

    }, [debounced, value, onChange, name]);

    const handleKeyDownTextBox = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter')
            handleBlur();
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
            style={{
                border : '1px solid #f90',
                input  : {
                    borderRadius : '10px',
                    textAlign    : 'center',
                    border       : `1px solid ${CardColor.Black}`,
                },
            }} />
    );
};
