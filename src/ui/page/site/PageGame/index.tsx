import { SpecialId } from '../../../../constant/framework/SpecialId';
import { GameBoard } from '../../../game/component/GameBoard';
import { Grid } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const PageGame : RFC = () => {
    return (
        <Grid>
            <Grid.Col span={4}>
                <GameBoard id={SpecialId.DefaultGameCode} />
            </Grid.Col>
            <Grid.Col span={4}>
                <GameBoard id={SpecialId.DefaultGameCodeAlpha} />
            </Grid.Col>
            <Grid.Col span={4}>
                <GameBoard id={SpecialId.DefaultGameCodeBeta} />
            </Grid.Col>
        </Grid>
    );
}


