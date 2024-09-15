import { CardColor } from '../../../api/src/constant/card-color.enum';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState, useContext } from 'react';
import { TextInput } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';
import { App } from '../../AppContext';


export const TextInputDebounced: RFC<Props> = ({
    onChange, onBlur, value, label, name,
    milliseconds = 3000,
    size = 'md',
}) => {

    const [text, setText] = useState(value);
    const [debounced] = useDebouncedValue(text, milliseconds);

    const { isDebugging } = useContext(App);

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
                border : isDebugging
                    ? '1px dotted #f9d'
                    : undefined,
                input : {
                    borderRadius : '10px',
                    textAlign    : 'center',
                    border       : `1px solid ${CardColor.Black}`,
                },
            }} />
    );
};
