import { GameTextType } from '../GameText/type';
import { GameStack } from '../GameStack';
import { GameText } from '../GameText';


export const GameDev = () =>
    <GameStack>
        <GameText size='sm'>
            <GameText
                type={GameTextType.Title}
                size='lg'>
                {'CrudeCards is Open Source'}
            </GameText>
            <a
                href='https://github.com/dandonahoe/crude-cards'
                style={{
                    textDecoration : 'underline',
                    color          : 'white',

                }}>
                {'Browse the GitHub Repo.'}
            </a>
            <GameText size='sm'>
                {'Or.'}
            </GameText>
            <a
                href='https://ui.crude.cards'
                style={{
                    textDecoration : 'underline',
                    color          : 'white',

                }}>
                {'Browse the UI Components.'}
            </a>
        </GameText>
    </GameStack>
