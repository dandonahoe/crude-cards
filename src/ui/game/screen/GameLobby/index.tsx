import { GameDeckLayout } from '../../component/GameDeckLayout';
import { GameBoxCentered } from '../../component/GameBox';
import { selectFoes } from '@app/client/selector/game';
import { PlayerWarning } from './PlayerWarning';
import { GameContext } from '../../GameContext';
import { useSelector } from '@app/client/hook';
import { ShareCard } from './ShareCard';
import { FoeList } from './FoeList';
import { useContext } from 'react';


export const GameLobby = () => {

    const { gameState } = useContext(GameContext);

    if(!gameState.game_code)
        throw new Error('Game Code is not defined');

    const foes = useSelector(selectFoes);

    return (
        <GameBoxCentered>
            <GameDeckLayout
                id='game-lobby'
                verticleWiggleFactor={100}
                cardOverlapFactor={400}
                wiggleFactor={40}
                tiltFactor={10}
                cards={[
                    <ShareCard
                        gameStage={gameState.game_stage}
                        key='share-card' />,
                    <PlayerWarning
                        foeCount={foes.length}
                        key='player-warning' />,
                    <FoeList
                        foes={foes}
                        gameCode={gameState.game_code}
                        key='foe-list' />,
                ]}/>
        </GameBoxCentered>
    );
};
