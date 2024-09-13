// src/ui/game/GameCardContainer/useHoverEffect.tsx

import { useHover } from '@mantine/hooks';

export const useHoverEffect = () => {

    const { hovered: isHovered, ref: refHover } = useHover();

    return {
        isHovered,
        refHover,
    };
};
