import { Button } from '@mantine/core';
import { GameText } from '../GameText';
import { RFC } from '@app/ui/type';
import { Props } from './type';

export const GameButton: RFC<Props> = ({ text, onClick }) => {

    // Should be in cssmodules. This is just a tribute.
    const gameButtonStyles = {
        outline    : 'none',
        color      : 'hsla(350, 0%, 100%, 1)',
        textShadow : `
            -1px -1px 1px hsla(350, 0%, 0%, 0.7),
            1px 1px 1px hsla(350, 0%, 100%, 0.3)
        `,
        cursor          : 'pointer',
        backgroundColor : 'hsla(350, 80%, 10%, 1)',
        backgroundImage : `
            linear-gradient(
                273deg,
                hsla(350, 80%, 60%, 1) 30%,
                hsla(350, 80%, 50%, 1) 40%
            )
        `,
        border       : 'none',
        borderRadius : '50%',
        width        : '160px',
        height       : '160px',
        boxShadow    : `
            inset 0px 0px 1px 1px hsla(350, 80%, 30%, 0.9),
            inset 0px 0px 2px 3px hsla(350, 80%, 50%, 0.9),
            inset 1px 1px 1px 4px hsla(350, 80%, 100%, 0.8),
            inset 0px 0px 2px 7px hsla(350, 80%, 60%, 0.8),
            inset 0px 0px 4px 10px hsla(350, 80%, 50%, 0.9),
                  8px 10px 2px 6px hsla(350, 80%, 20%, 0.55),
                  0px 0px 3px 2px hsla(350, 80%, 40%, 0.9),
                  0px 0px 2px 6px hsla(350, 80%, 50%, 0.9),
                 -1px -1px 1px 6px hsla(350, 80%, 100%, 0.9),
                  0px 0px 2px 11px hsla(350, 80%, 50%, 0.9),
                  0px 0px 1px 12px hsla(350, 80%, 40%, 0.9),
                  1px 3px 14px 14px hsla(350, 80%, 0%, 0.4)
        `,
    };

    return (
        <Button
            style={gameButtonStyles}
            aria-label={`Button ${text}`}
            onClick={onClick}>
            <GameText>{text}</GameText>
        </Button>
    );
};
