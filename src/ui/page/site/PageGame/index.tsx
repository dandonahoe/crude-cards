import { SpecialId } from '../../../../constant/framework/SpecialId';
import { GameBoard } from '../../../game/component/GameBoard';
import { Grid } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const PageGame : RFC = () => {
    return (
        <Grid>
            <Grid.Col span={4}>
                <GameBoard id={SpecialId.DefaultGameId} />
            </Grid.Col>
            {/* <Grid.Col span={4}>
                <GameBoard id='board-id-beta' />
            </Grid.Col>
            <Grid.Col span={4}>
                <GameBoard id='board-id-charlie' />
            </Grid.Col> */}
        </Grid>
    );
}


