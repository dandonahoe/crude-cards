import { TextInput, Button, Group, FocusTrap } from '@mantine/core';
import { RFC } from '@app/ui/type';

export const GameCodeForm: RFC<{ gameCode: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onSubmit: () => void }> = ({ gameCode, onChange, onSubmit }) => (
    <form>
        <FocusTrap active={true}>
            <TextInput
                tabIndex={0}
                styles={{ input: { textAlign: 'center' } }}
                mb="md"
                aria-label="Game Code"
                onChange={onChange}
                value={gameCode}
                w={300}
                size="md"
            />
        </FocusTrap>
        <Group justify="center" align="end">
            <Button
                mb="xl"
                tabIndex={0}
                onClick={onSubmit}
                style={{ border: '1px solid #fff' }}
                variant="outline"
                c="#fff"
                size="md"
            >
                {'Join by Code'}
            </Button>
        </Group>
    </form>
);
