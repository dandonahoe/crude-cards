// src/ui/game/GameButton/type.tsx

export interface GameButtonProps {
    buttonType ?: 'primary' | 'secondary' | 'tertiary';
    onClick     : () => void;
    text        : string;
}
