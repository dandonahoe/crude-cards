import { Grid } from '@mantine/core';
import { GameBoard } from '../../../game/component/GameBoard';
import { RFC } from '@app/ui/type';

export const PageGame : RFC = () => {
    return (
        <Grid>
            <Grid.Col span={4}>
                <GameBoard id='board-id-alpha' />
            </Grid.Col>
            <Grid.Col span={4}>
                <GameBoard id='board-id-beta' />
            </Grid.Col>
            <Grid.Col span={4}>
                <GameBoard id='board-id-charlie' />
            </Grid.Col>
        </Grid>
    );
}


