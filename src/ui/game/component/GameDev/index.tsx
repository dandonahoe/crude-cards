
import { GameStack } from '../GameStack';
import { GameText } from '../GameText';
import { GameTextType } from '../GameText/type';


export const GameDev = () => {

    return (
        <GameStack>
            <GameText size='sm'>
                <GameText
                    size='lg'
                    type={GameTextType.Title}>
                    {'CrudeCards is Open Source'}
                </GameText>
                <a
                    href='https://github.com/dandonahoe/crude-cards'
                    style={{
                        color          : 'white',
                        textDecoration : 'underline',
                    }}>
                    {'Browse the GitHub Repo.'}
                </a>
                <GameText size='sm'>
                    {'Or don\'t, nerd.'}
                </GameText>
            </GameText>

        </GameStack>
    );
}

