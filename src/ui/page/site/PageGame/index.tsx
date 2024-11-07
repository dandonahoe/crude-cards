import { selectGameBoardList } from '../../../../client/selector/game';
import { GameBoard } from '../../../game/component/GameBoard';
import { useSelector } from '@app/client/hook';
import { Grid } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const PageGame : RFC = () =>
    <Grid>
        {useSelector(selectGameBoardList)
            .map((gameBoard, index) =>
                <Grid.Col
                    key={`${gameBoard.gameId}_${index}`}
                    span={4}>
                    <GameBoard id={gameBoard.gameId} />
                </Grid.Col>,
            )}
    </Grid>
