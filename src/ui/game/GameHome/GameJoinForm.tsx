import { Button, FocusTrap, Group, rem, TextInput } from "@mantine/core";
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { sanitizeGameCode } from '../GameView/sharedLogic';
import { GameTextCentered } from '../GameText/index';
import { GameCardStack } from '../GameCard/index';
import { GameJoinFormProps } from "./type";


export const GameJoinForm = ({
    gameCode, setGameCode, onJoinGame,
}: GameJoinFormProps) => {

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
        if (evt.key !== 'Enter') return;

        evt.preventDefault();
        onJoinGame();
    };

    const handleGameCodeChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const sanitizedInput = sanitizeGameCode(evt.target.value);

        setGameCode(sanitizedInput);

        if (sanitizedInput.length === 6)
            onJoinGame();
    };

    return (
        (<GameCardStack color={CardColor.White}>
            <GameTextCentered color={CardColor.Black}>
                {'~ or ~'}
            </GameTextCentered>
            <Group
                justify='center'
                align='end'>
                <form onSubmit={onJoinGame}>
                    <FocusTrap active={true}>
                        <TextInput
                            styles={{ input : { textAlign : 'center' } }}
                            onChange={handleGameCodeChange}
                            onKeyDown={handleKeyDown}
                            aria-label='Game Code'
                            value={gameCode}
                            tabIndex={0}
                            w={rem(300)}
                            size='md'
                            mb='md'
                            pt='xs'/>
                    </FocusTrap>
                    <Button
                        style={{ border : `1px solid ${CardColor.Black}` }}
                        aria-label='Join Game Button'
                        variant='outline'
                        type='submit'
                        tabIndex={0}
                        size='md'
                        c={CardColor.Black}
                        mb='xl'>
                        {'Join by Code'}
                    </Button>
                </form>
            </Group>
        </GameCardStack>)
    );
};
