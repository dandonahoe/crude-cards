import { SpecialId } from '../../../../constant/framework/SpecialId';
import { GameDeckLayout } from '../../component/GameDeckLayout';
import { selectFoesByGameId } from '@app/client/selector/game';
import { GameBoardContext } from '../../../GameBoardContext';
import { GameBoxCentered } from '../../component/GameBox';
import { PlayerWarning } from './PlayerWarning';
import { useSelector } from '@app/client/hook';
import { ShareCard } from './ShareCard';
import { FoeList } from './FoeList';
import { useContext } from 'react';


export const GameLobby = () => {

    const { gameStateDTO } = useContext(GameBoardContext);

    if(!gameStateDTO.game_code)
        throw new Error('Game Code is not defined');

    const foeList = useSelector(state => selectFoesByGameId(state, SpecialId.DefaultGameId));

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
                        gameStage={gameStateDTO.game_stage}
                        key='share-card' />,
                    <PlayerWarning
                        foeCount={foeList.length}
                        key='player-warning' />,
                    <FoeList
                        foes={foeList}
                        gameCode={gameStateDTO.game_code}
                        key='foe-list' />,
                ]}/>
        </GameBoxCentered>
    );
};
